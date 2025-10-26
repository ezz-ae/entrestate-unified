import { NextResponse } from 'next/server';
export async function GET() { const items = [ { category: 'Launch', title: 'New project announced', summary: 'Example summary' }, { category: 'Pricing', title: 'Price drop detected', summary: 'Example summary' } ]; return NextResponse.json({ date: Date.now(), items }); }
