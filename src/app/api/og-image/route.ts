import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // 1. Fetch HTML
    const htmlRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!htmlRes.ok) {
       return NextResponse.json({ error: 'Failed to fetch the target URL' }, { status: 400 });
    }

    const html = await htmlRes.text();
    const $ = cheerio.load(html);
    
    // 2. Find OG image
    let imageUrl = $('meta[property="og:image"]').attr('content');
    if (!imageUrl) {
      imageUrl = $('meta[name="twitter:image"]').attr('content');
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'No OG image found on the provided URL' }, { status: 404 });
    }

    // Resolve relative URLs
    if (imageUrl.startsWith('/')) {
      const urlObj = new URL(targetUrl);
      imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
    }

    // 3. Fetch image
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
       return NextResponse.json({ error: 'Failed to fetch the image from the parsed URL' }, { status: 400 });
    }

    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    const buffer = await imageRes.arrayBuffer();

    // 4. Return image blob
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });

  } catch (error) {
    console.error('OG Image fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
