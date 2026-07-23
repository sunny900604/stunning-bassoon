import { anthropic } from '@/lib/anthropic';
import { SYSTEM_PROMPTS } from '@/lib/employee-prompts';
import type { ChatMessage, EmployeeRole } from '@/types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { role, messages }: { role: EmployeeRole; messages: ChatMessage[] } = await req.json();

  const systemPrompt = SYSTEM_PROMPTS[role];
  if (!systemPrompt) {
    return new Response('Unknown role', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await anthropic.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            const data = JSON.stringify({ text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.error('Chat error:', err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
