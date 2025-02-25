import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST method for translation' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, target } = body;
    
    console.log("Request body:", body); // Add logging to debug
    
    if (!text || !target) {
      return NextResponse.json(
        { error: 'Missing text or language' },
        { status: 400 }
      );
    }
    
    // Ensure target is a valid language code
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: target, // Ensure this is explicitly set
        format: 'text',
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in API call: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}