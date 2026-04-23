/** Segments from assistant messages using [Q: …] / [A: …] lines (same contract as JobAssistant / aiClient). */
export type ChatQATextSegment = { type: 'text'; content: string }
export type ChatQAChoicesSegment = { type: 'choices'; question: string; options: string[] }
export type ChatQASegment = ChatQATextSegment | ChatQAChoicesSegment

export function parseQASegments(content: string): ChatQASegment[] {
  const lines = content.split('\n')
  const segments: ChatQASegment[] = []
  let textLines: string[] = []
  let i = 0
  while (i < lines.length) {
    const qMatch = lines[i].match(/^\[Q:\s*(.*?)\]\s*$/)
    if (qMatch) {
      const text = textLines.join('\n').trim()
      if (text) segments.push({ type: 'text', content: text })
      textLines = []
      const options: string[] = []
      i++
      while (i < lines.length) {
        const aMatch = lines[i].match(/^\[A:\s*(.*?)\]\s*$/)
        if (aMatch) {
          options.push(aMatch[1])
          i++
        } else break
      }
      if (options.length) segments.push({ type: 'choices', question: qMatch[1], options })
    } else {
      textLines.push(lines[i])
      i++
    }
  }
  const rem = textLines.join('\n').trim()
  if (rem) segments.push({ type: 'text', content: rem })
  return segments
}
