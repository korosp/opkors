import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'gemini-2.0-flash-lite' } = await req.json();

    // Normalize messages to string (Gemini API hanya terima string)
    const normalized = messages.map((m: { role: string; content: unknown }) => {
      const content = Array.isArray(m.content)
        ? (m.content as Array<{ type: string; text?: string }>)
            .map(c => c.text ?? '[Gambar]').join(' ')
        : typeof m.content === 'string' ? m.content : '';
      return { role: m.role, content };
    });

    // Build prompt from conversation history
    const history = normalized.map((m: { role: string; content: string }) =>
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join('\n');

    const lastUser = normalized.filter((m: { role: string }) => m.role === 'user').pop();
    if (!lastUser) return NextResponse.json({ error: 'No user message' }, { status: 400 });

    const systemPrompt = `Kamu adalah KarlX AI, asisten kecerdasan buatan yang cerdas, ramah, dan membantu. Jawab dalam Bahasa Indonesia yang natural. Ketika menulis kode, gunakan markdown code blocks.`;

    const fullPrompt = `${systemPrompt}\n\nRiwayat percakapan:\n${history}`;

    const encodedPrompt = encodeURIComponent(fullPrompt);
    const url = `https://api.siputzx.my.id/api/ai/gemini-lite?prompt=${encodedPrompt}&model=${model}`;

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();

    // siputzx API returns { status: true, data: "..." } or similar
    const text = data?.data ?? data?.result ?? data?.response ?? data?.text ?? JSON.stringify(data);

    // Return in OpenAI-compatible format so frontend doesn't need changes
    return NextResponse.json({
      choices: [{
        message: {
          role: 'assistant',
          content: text,
        }
      }]
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
