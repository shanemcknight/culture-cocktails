import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'inquiries.json');

function getInquiries() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.inquiries || [];
  } catch {
    return [];
  }
}

// POST /api/contact — receive a form submission
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      company: company || '',
      message,
      date: new Date().toISOString(),
      read: false,
    };

    // Save to file
    let data;
    try {
      data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch {
      data = { inquiries: [] };
    }
    data.inquiries.unshift(inquiry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

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

  const inquiries = getInquiries();
  return NextResponse.json({ inquiries });
}
