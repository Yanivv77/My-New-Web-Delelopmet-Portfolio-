import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { urlMap } from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json(
        { error: 'Missing URL' },
        { status: 400 }
      );
    }
    
    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }
    
    // Generate a short code
    const shortCode = crypto.randomBytes(4).toString('hex');
    
    // Store in Redis with error handling
    const setResult = await urlMap.set(shortCode, url);
    if (!setResult) {
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }
    
    // Set expiration
    await urlMap.expire(shortCode, 60 * 60 * 24 * 30);
    
    // Create the short URL
    const shortUrl = `${request.headers.get('origin') || 'https://yourdomain.com'}/s/${shortCode}`;
    
    return NextResponse.json({ shortUrl });
    
  } catch (error) {
    console.error('Error in URL shortener API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// This would handle redirects for shortened URLs
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Extract the short code from the path
    const match = path.match(/\/s\/([a-zA-Z0-9]+)$/);
    
    if (!match) {
      return NextResponse.json(
        { error: 'Invalid short URL' },
        { status: 400 }
      );
    }
    
    const shortCode = match[1];
    const originalUrl = await urlMap.get(shortCode);
    
    if (!originalUrl) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      );
    }
    
    // Redirect to the original URL
    return NextResponse.redirect(originalUrl as string);
  } catch (error) {
    console.error('Error in URL redirect:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 