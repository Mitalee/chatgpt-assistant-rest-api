import { openai } from "@/app/openai";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { toolCallOutputs, runId } = await request.json();
  console.log("Submitting Tool Outputs to OpenAI via api/assistants/threads/[threadId]/actions/routes.ts:");
  console.log("Thread ID:", threadId);
  console.log("Run ID:", runId);
  console.log("Tool Call Outputs:", toolCallOutputs);

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
    { tool_outputs: toolCallOutputs }
  );

  const reader = stream.toReadableStream().getReader();
  const decoder = new TextDecoder();

  let log = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const decoded = decoder.decode(value, { stream: true });
    log += decoded;
    // console.log("Stream Chunk from OpenAI (submit tool outputs):", decoded);
  }
  console.log("Full Response from OpenAI (submit tool outputs):", log);

  return new Response(stream.toReadableStream());
}
