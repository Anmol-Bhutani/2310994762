import { NextRequest, NextResponse } from 'next/server';

const BASE_API = 'http://20.207.122.201/evaluation-service';

export async function GET(request: NextRequest) {
  const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  
  if (!TOKEN) {
    console.error('[API Route] NEXT_PUBLIC_API_TOKEN is missing');
    return NextResponse.json({ error: 'Server configuration error: Token missing' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  
  let url = `${BASE_API}/notifications`;
  const params = new URLSearchParams();
  if (searchParams.get('notification_type')) params.append('notification_type', searchParams.get('notification_type')!);
  if (searchParams.get('limit')) params.append('limit', searchParams.get('limit')!);
  if (searchParams.get('page')) params.append('page', searchParams.get('page')!);
  if (params.toString()) url += `?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error(`[API Route] Backend error ${res.status}:`, text);
      return NextResponse.json({ error: `Backend error: ${res.status}` }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[API Route] Fetch error:', err.message);
    return NextResponse.json({ error: `Failed to connect to backend: ${err.message}` }, { status: 500 });
  }
}
