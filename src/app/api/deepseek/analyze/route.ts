import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: NextRequest) {
  try {
    const { playlistText } = await req.json(); // Mendapatkan data dari body request
    console.log("Received playlistText:", playlistText); // Log data yang diterima

    // Gunakan Ollama untuk menganalisis playlist
    const stream = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [
        {
          role: "user",
          content: playlistText,
        },
      ],
      stream: true,
    });

    let fullResponse = "";
    for await (const part of stream) {
      fullResponse += part.message.content;
    }

    return NextResponse.json({ message: fullResponse });
  } catch (error) {
    console.error("Error analyzing with Ollama:", error);
    return NextResponse.json(
      { error: "Error analyzing with Ollama" },
      { status: 500 }
    );
  }
}
