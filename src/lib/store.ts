import { Donation } from '@/types';

// In-memory store with seed data for demonstration
const donations: Donation[] = [
  {
    id: 'don-001',
    companyName: '삼성전자',
    contactName: '김민준',
    phone: '02-1234-5678',
    email: 'minjun.kim@samsung.com',
    items: [
      { name: '노트북', quantity: 10, condition: 'good' },
      { name: '키보드', quantity: 15, condition: 'good' },
    ],
    pickupAddress: '서울시 서초구 서초대로 1000',
    status: 'completed',
    notes: '정기 기증 파트너사',
    createdAt: '2026-07-01T09:00:00Z',
  },
  {
    id: 'don-002',
    companyName: 'LG생활건강',
    contactName: '이서연',
    phone: '02-2345-6789',
    email: 'seoyeon.lee@lg.com',
    items: [
      { name: '생활용품 세트', quantity: 50, condition: 'new' },
      { name: '청소도구', quantity: 20, condition: 'new' },
    ],
    pickupAddress: '서울시 영등포구 여의대로 200',
    status: 'processing',
    notes: '',
    createdAt: '2026-07-10T11:00:00Z',
  },
  {
    id: 'don-003',
    companyName: '카카오',
    contactName: '박지호',
    phone: '02-3456-7890',
    email: 'jiho.park@kakao.com',
    items: [
      { name: '사무용 의자', quantity: 8, condition: 'good' },
      { name: '모니터', quantity: 5, condition: 'good' },
    ],
    pickupAddress: '경기도 성남시 분당구 판교역로 166',
    status: 'pending',
    notes: '',
    createdAt: '2026-07-20T14:00:00Z',
  },
  {
    id: 'don-004',
    companyName: '현대자동차',
    contactName: '최수아',
    phone: '02-4567-8901',
    email: 'sua.choi@hyundai.com',
    items: [
      { name: '어린이 도서', quantity: 200, condition: 'good' },
    ],
    pickupAddress: '서울시 서초구 헌릉로 12',
    status: 'pending',
    notes: '임직원 도서 기증 캠페인',
    createdAt: '2026-07-22T10:00:00Z',
  },
];

export function getDonations(): Donation[] {
  return [...donations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getDonationById(id: string): Donation | undefined {
  return donations.find((d) => d.id === id);
}

export function addDonation(donation: Omit<Donation, 'id' | 'status' | 'notes' | 'createdAt'>): Donation {
  const newDonation: Donation = {
    ...donation,
    id: `don-${Date.now()}`,
    status: 'pending',
    notes: '',
    createdAt: new Date().toISOString(),
  };
  donations.push(newDonation);
  return newDonation;
}

export function updateDonationStatus(
  id: string,
  status: Donation['status'],
  notes?: string
): Donation | null {
  const donation = donations.find((d) => d.id === id);
  if (!donation) return null;
  donation.status = status;
  if (notes !== undefined) donation.notes = notes;
  return donation;
}

export function getStats() {
  const total = donations.length;
  const pending = donations.filter((d) => d.status === 'pending').length;
  const processing = donations.filter((d) => d.status === 'processing').length;
  const completed = donations.filter((d) => d.status === 'completed').length;
  const totalItems = donations.reduce(
    (sum, d) => sum + d.items.reduce((s, i) => s + i.quantity, 0),
    0
  );
  return { total, pending, processing, completed, totalItems };
}
