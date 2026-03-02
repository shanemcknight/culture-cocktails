import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

export function getProjects() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.projects || [];
  } catch {
    return [];
  }
}

export function getProject(id) {
  const projects = getProjects();
  return projects.find((p) => p.id === id) || null;
}

export function addProject(project) {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const newProject = {
    ...project,
    id: project.id || `project-${Date.now()}`,
    date: project.date || new Date().toISOString().split('T')[0],
  };
  data.projects.unshift(newProject);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return newProject;
}

export function updateProject(id, updates) {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  data.projects[index] = { ...data.projects[index], ...updates };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return data.projects[index];
}

export function deleteProject(id) {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  data.projects = data.projects.filter((p) => p.id !== id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return true;
}

export function getFeaturedProjects() {
  return getProjects().filter((p) => p.featured);
}

export const CATEGORIES = [
  'RTD Cocktails',
  'Functional Beverages',
  'Sodas & Seltzers',
  'Spirits & Liqueurs',
  'CBD / THC Beverages',
  'Clean Label',
  'Draft Systems',
  'Other',
];
