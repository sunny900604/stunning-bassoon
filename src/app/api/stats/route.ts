import { getStats } from '@/lib/store';

export async function GET() {
  return Response.json(getStats());
}
