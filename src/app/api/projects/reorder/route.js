import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'culturecocktails2026';

function checkAuth(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_PASSWORD;
}

// PUT /api/projects/reorder — swap two projects' display_order
export async function PUT(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { projectId, direction } = await request.json();
    if (!projectId || !direction) {
      return NextResponse.json({ error: 'Missing projectId or direction' }, { status: 400 });
    }

    // Get all projects sorted by display_order
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, display_order')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    // Find the index of the project to move
    const currentIndex = projects.findIndex((p) => p.id === projectId);
    if (currentIndex === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= projects.length) {
      return NextResponse.json({ error: 'Cannot move further' }, { status: 400 });
    }

    const currentProject = projects[currentIndex];
    const swapProject = projects[swapIndex];

    // Swap their display_order values
    const orderA = currentProject.display_order ?? currentIndex;
    const orderB = swapProject.display_order ?? swapIndex;

    const { error: updateError1 } = await supabase
      .from('projects')
      .update({ display_order: orderB })
      .eq('id', currentProject.id);

    const { error: updateError2 } = await supabase
      .from('projects')
      .update({ display_order: orderA })
      .eq('id', swapProject.id);

    if (updateError1 || updateError2) {
      console.error('Reorder error:', updateError1, updateError2);
      return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to reorder projects' }, { status: 500 });
  }
}

// POST /api/projects/reorder — initialize display_order for all projects
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all projects sorted by current order
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, display_order')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    // Set display_order for any projects that don't have one yet
    let updated = 0;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].display_order === null || projects[i].display_order === undefined) {
        await supabase
          .from('projects')
          .update({ display_order: i })
          .eq('id', projects[i].id);
        updated++;
      }
    }

    return NextResponse.json({ success: true, message: `Initialized ${updated} projects` });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to initialize order' }, { status: 500 });
  }
}
