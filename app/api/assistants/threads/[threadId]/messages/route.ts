import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { content } = await request.json();

  // Send user message to OpenAI
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  // Stream assistant response from OpenAI
  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  // Log the full stream output
  const reader = stream.toReadableStream().getReader();
  const decoder = new TextDecoder();
  let log = "";

  // // Read from stream and log data
  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) break;
  //   const decoded = decoder.decode(value, { stream: true });
  //   // console.log("Stream Chunk from OpenAI:", decoded);
  //   log += decoded;
  // }

  // console.log("Full OpenAI Stream Response:", log);

  // Return the readable stream back to the frontend
  return new Response(stream.toReadableStream());
}
