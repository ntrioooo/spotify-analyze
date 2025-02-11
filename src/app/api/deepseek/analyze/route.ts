import { NextRequest, NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(req: NextRequest) {
  try {
    const { playlistText } = await req.json();
    console.log('Received playlistText:', playlistText); // Log data yang diterima
    // Gunakan Ollama untuk menganalisis playlist
    const stream = await ollama.chat({
      model: 'deepseek-r1:1.5b',
      messages: [
        {
          role: 'user',
          content: playlistText,
        },
      ],
      stream: true,
    });

    let fullResponse = '';

    let outputMode: 'think' | 'response' = 'think';

    for await (const part of stream) {
      if (outputMode === 'think') {
        if (
          !(
            part.message.content.includes('<think>') ||
            part.message.content.includes('</think>')
          )
        ) {
          fullResponse += part.message.content;

          if (part.message.content.includes('</think>')) {
            outputMode = 'response';
          }
        }
      } else {
        fullResponse += part.message.content;
      }
    }

    const cleanThought = fullResponse.replace(/<\/?think>/g, '');

    return NextResponse.json({ message: cleanThought });
  } catch (error) {
    console.error('Error analyzing with Ollama:', error);
    return NextResponse.json(
      { error: 'Error analyzing with Ollama' },
      { status: 500 }
    );
  }
}
