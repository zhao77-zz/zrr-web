import { NextRequest } from 'next/server';
import { chatWithKnowledgeBaseStream } from '@/app/practice/embed-demo/youdao-api';

export async function POST(req: NextRequest) {
  const params = await req.json();
  const stream = await chatWithKnowledgeBaseStream(params);
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
} 