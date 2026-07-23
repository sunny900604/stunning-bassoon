'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DonationItem } from '@/types';

const emptyItem = (): DonationItem => ({ name: '', quantity: 1, condition: 'good' });

export default function DonationForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    pickupAddress: '',
  });
  const [items, setItems] = useState<DonationItem[]>([emptyItem()]);

  const updateForm = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const updateItem = (i: number, key: keyof DonationItem, val: string | number) => {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [key]: val } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">기증 신청이 완료됐습니다!</h2>
        <p className="text-gray-500 mb-6">
          AI 직원 주안이 신청 내용을 검토하고 <strong>{form.email}</strong>으로
          픽업 일정을 안내해 드릴 예정입니다. 감사합니다 💙
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setSubmitted(false); setForm({ companyName: '', contactName: '', phone: '', email: '', pickupAddress: '' }); setItems([emptyItem()]); }}
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            추가 신청하기
          </button>
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            신청 현황 보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
      {/* Company Info */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">기업 정보</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회사명 *</label>
            <input
              required
              type="text"
              value={form.companyName}
              onChange={(e) => updateForm('companyName', e.target.value)}
              placeholder="예) 삼성전자"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">담당자명 *</label>
            <input
              required
              type="text"
              value={form.contactName}
              onChange={(e) => updateForm('contactName', e.target.value)}
              placeholder="예) 홍길동"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => updateForm('phone', e.target.value)}
              placeholder="예) 02-1234-5678"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => updateForm('email', e.target.value)}
              placeholder="예) contact@company.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">픽업 주소 *</label>
          <input
            required
            type="text"
            value={form.pickupAddress}
            onChange={(e) => updateForm('pickupAddress', e.target.value)}
            placeholder="예) 서울시 강남구 테헤란로 123"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Items */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">기증 품목</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                required
                type="text"
                value={item.name}
                onChange={(e) => updateItem(i, 'name', e.target.value)}
                placeholder="품목명"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))}
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={item.condition}
                onChange={(e) => updateItem(i, 'condition', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">새 상품</option>
                <option value="good">양호</option>
                <option value="fair">사용감 있음</option>
              </select>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-red-400 hover:text-red-600 text-lg leading-none px-1"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-3 text-sm text-blue-600 hover:underline"
        >
          + 품목 추가
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {submitting ? '제출 중...' : '기증 신청하기'}
      </button>
    </form>
  );
}
