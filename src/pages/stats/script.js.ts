import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const res = await fetch('https://cloud.umami.is/script.js');
    if (!res.ok) {
      throw new Error(`Failed to fetch Umami script: ${res.status}`);
    }
    const script = await res.text();
    return new Response(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error generating static Umami proxy script:', error);
    // Fallback: minimal stub to avoid breaking builds offline
    return new Response('/* Umami script build fallback */', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }
};
