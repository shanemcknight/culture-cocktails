import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'culturecocktails2026';

function checkAuth(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_PASSWORD;
}

// Normalize snake_case DB columns to camelCase for the frontend
function toFrontend(row) {
  if (!row) return row;
  return {
    ...row,
    testimonialAuthor: row.testimonial_author || '',
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    seoKeywords: row.seo_keywords || '',
  };
}

// GET /api/projects — list all projects
export async function GET() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
  return NextResponse.json({ projects: (data || []).map(toFrontend) });
}

// POST /api/projects — add a new project
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const project = await request.json();

    const newProject = {
      title: project.title || '',
      description: project.description || '',
      client: project.client || '',
      category: project.category || 'Beverage Development',
      location: project.location || '',
      image: project.images?.[0] || project.image || '',
      images: project.images || (project.image ? [project.image] : []),
      testimonial: project.testimonial || '',
      testimonial_author: project.testimonialAuthor || project.testimonial_author || '',
      seo_title: project.seoTitle || project.seo_title || '',
      seo_description: project.seoDescription || project.seo_description || '',
      seo_keywords: project.seoKeywords || project.seo_keywords || '',
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: toFrontend(data) });
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

    // Normalize camelCase (frontend) to snake_case (database)
    const dbUpdates = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.client !== undefined) dbUpdates.client = updates.client;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.images !== undefined) dbUpdates.images = updates.images;
    if (updates.testimonial !== undefined) dbUpdates.testimonial = updates.testimonial;
    if (updates.testimonialAuthor !== undefined) dbUpdates.testimonial_author = updates.testimonialAuthor;
    if (updates.testimonial_author !== undefined) dbUpdates.testimonial_author = updates.testimonial_author;
    if (updates.seoTitle !== undefined) dbUpdates.seo_title = updates.seoTitle;
    if (updates.seo_title !== undefined) dbUpdates.seo_title = updates.seo_title;
    if (updates.seoDescription !== undefined) dbUpdates.seo_description = updates.seoDescription;
    if (updates.seo_description !== undefined) dbUpdates.seo_description = updates.seo_description;
    if (updates.seoKeywords !== undefined) dbUpdates.seo_keywords = updates.seoKeywords;
    if (updates.seo_keywords !== undefined) dbUpdates.seo_keywords = updates.seo_keywords;

    const { data, error } = await supabase
      .from('projects')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: toFrontend(data) });
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

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
