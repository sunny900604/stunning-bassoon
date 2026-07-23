import { getDonations, addDonation, updateDonationStatus } from '@/lib/store';
import { NextRequest } from 'next/server';

export async function GET() {
  return Response.json(getDonations());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const donation = addDonation(body);
  return Response.json(donation, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, status, notes } = await req.json();
  const updated = updateDonationStatus(id, status, notes);
  if (!updated) return new Response('Not found', { status: 404 });
  return Response.json(updated);
}
