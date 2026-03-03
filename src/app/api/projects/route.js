import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'culturecocktails2026';
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'projects');

function getData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { projects: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function checkAuth(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_PASSWORD;
}

// GET /api/projects — list all projects
export async function GET() {
  const data = getData();
  return NextResponse.json({ projects: data.projects || [] });
}

// POST /api/projects — add a new project
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const project = await request.json();
    const data = getData();

    const newProject = {
      ...project,
      id: project.id || `project-${Date.now()}`,
      date: project.date || new Date().toISOString().split('T')[0],
      // Support images array — keep backward compat with single image
      images: project.images || (project.image ? [project.image] : []),
    };

    data.projects.unshift(newProject);
    saveData(data);

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

// PUT /api/projects — update a project
export async function PUT(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing project id' }, { status: 400 });

    const data = getData();
    const index = data.projects.findIndex((p) => p.id === id);
    if (index === -1) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    data.projects[index] = { ...data.projects[index], ...updates };
    saveData(data);

    return NextResponse.json({ success: true, project: data.projects[index] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects — delete a project
export async function DELETE(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing project id' }, { status: 400 });

    const data = getData();
    data.projects = data.projects.filter((p) => p.id !== id);
    saveData(data);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
