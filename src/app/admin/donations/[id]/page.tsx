import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDonationById } from '@/lib/store';
import DonationActions from '@/components/donations/DonationActions';

export const dynamic = 'force-dynamic';

const statusLabel: Record<string, { label: string; color: string }> = {
  pending: { label: '대기 중', color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: '처리 중', color: 'bg-blue-100 text-blue-700' },
  completed: { label: '완료', color: 'bg-green-100 text-green-700' },
  rejected: { label: '거절', color: 'bg-red-100 text-red-700' },
};

const conditionLabel: Record<string, string> = {
  new: '새 상품',
  good: '양호',
  fair: '사용감 있음',
};

export default async function DonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const donation = getDonationById(id);
  if (!donation) notFound();

  const s = statusLabel[donation.status];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-blue-600">관리자</Link>
        <span>/</span>
        <span className="text-gray-900">{donation.companyName}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{donation.companyName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              신청일: {new Date(donation.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${s.color}`}>
            {s.label}
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">담당자 정보</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">담당자</span>
                <p className="text-gray-900 font-medium mt-0.5">{donation.contactName}</p>
              </div>
              <div>
                <span className="text-gray-500">연락처</span>
                <p className="text-gray-900 font-medium mt-0.5">{donation.phone}</p>
              </div>
              <div>
                <span className="text-gray-500">이메일</span>
                <p className="text-gray-900 font-medium mt-0.5">{donation.email}</p>
              </div>
              <div>
                <span className="text-gray-500">픽업 주소</span>
                <p className="text-gray-900 font-medium mt-0.5">{donation.pickupAddress}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">기증 품목</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs">
                  <tr>
                    <th className="px-4 py-2.5 text-left">품목명</th>
                    <th className="px-4 py-2.5 text-left">수량</th>
                    <th className="px-4 py-2.5 text-left">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donation.items.map((item, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2.5 font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-2.5 text-gray-600">{item.quantity}개</td>
                      <td className="px-4 py-2.5 text-gray-600">{conditionLabel[item.condition]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          {donation.notes && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">메모</h2>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{donation.notes}</p>
            </div>
          )}

          {/* Actions */}
          <DonationActions donation={donation} />
        </div>
      </div>
    </div>
  );
}
