import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/contact — receive a form submission
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('inquiries')
      .insert([{
        name,
        email,
        company: company || '',
        message,
        read: false,
      }]);

    if (error) {
      console.error('Contact form error:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET /api/contact — list submissions (for admin)
export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '');
  if (token !== (process.env.ADMIN_PASSWORD || 'culturecocktails2026')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }

  return NextResponse.json({ inquiries: data || [] });
}
