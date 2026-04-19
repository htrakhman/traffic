/** SSE lines shaped like Anthropic streaming deltas — parsed by `src/utils/aiClient.ts`. */

export function anthropicSseLine(text: string): string {
  return `data: ${JSON.stringify({ type: 'content_block_delta', delta: { text } })}\n\n`
}

/** Single-chunk SSE stream the client already understands. */
export function sseFromFullText(full: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  const chunk = anthropicSseLine(full)
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(chunk))
      controller.close()
    },
  })
}
