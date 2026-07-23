'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Donation, DonationStatus } from '@/types';

const transitions: Record<DonationStatus, { label: string; next: DonationStatus; color: string }[]> = {
  pending: [
    { label: '처리 시작', next: 'processing', color: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { label: '거절', next: 'rejected', color: 'bg-red-100 hover:bg-red-200 text-red-700' },
  ],
  processing: [
    { label: '완료 처리', next: 'completed', color: 'bg-green-600 hover:bg-green-700 text-white' },
    { label: '거절', next: 'rejected', color: 'bg-red-100 hover:bg-red-200 text-red-700' },
  ],
  completed: [],
  rejected: [
    { label: '재검토', next: 'pending', color: 'bg-gray-600 hover:bg-gray-700 text-white' },
  ],
};

export default function DonationActions({ donation }: { donation: Donation }) {
  const router = useRouter();
  const [notes, setNotes] = useState(donation.notes);
  const [saving, setSaving] = useState(false);
  const actions = transitions[donation.status];

  const updateStatus = async (next: DonationStatus) => {
    setSaving(true);
    await fetch('/api/donations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: donation.id, status: next, notes }),
    });
    setSaving(false);
    router.refresh();
  };

  const saveNotes = async () => {
    setSaving(true);
    await fetch('/api/donations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: donation.id, status: donation.status, notes }),
    });
    setSaving(false);
  };

  return (
    <div className="border-t border-gray-100 pt-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">관리자 메모</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="내부 메모를 입력하세요..."
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
      />
      <div className="flex items-center gap-2 flex-wrap">
        {actions.map((a) => (
          <button
            key={a.next}
            onClick={() => updateStatus(a.next)}
            disabled={saving}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${a.color}`}
          >
            {a.label}
          </button>
        ))}
        <button
          onClick={saveNotes}
          disabled={saving}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 ml-auto"
        >
          메모 저장
        </button>
      </div>
    </div>
  );
}
