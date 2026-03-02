import { NextResponse } from 'next/server';
import { getProjects, addProject, deleteProject } from '@/lib/projects';

// Simple auth check
function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === (process.env.ADMIN_PASSWORD || 'culturecocktails2026');
}

// GET /api/projects - List all projects
export async function GET() {
  const projects = getProjects();
  return NextResponse.json({ projects });
}

// POST /api/projects - Add a new project
export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const project = addProject({
      title: body.title,
      category: body.category,
      description: body.description,
      image: body.image || '/images/placeholder-project.jpg',
      client: body.client || '',
      featured: body.featured || false,
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/projects?id=xxx - Delete a project
export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  deleteProject(id);
  return NextResponse.json({ success: true });
}
