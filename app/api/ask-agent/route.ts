import { NextResponse } from 'next/server';
import { runGeminiAgent } from '@/app/lib/agent';

export async function POST(req: Request) {
  const { question } = await req.json();
  const answer = await runGeminiAgent(question);
  console.log(answer)
  return NextResponse.json({ answer });
}
