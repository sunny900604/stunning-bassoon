import Link from 'next/link';
import { getDonations, getStats } from '@/lib/store';

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
  fair: '사용감',
};

export default function AdminPage() {
  const stats = getStats();
  const donations = getDonations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">관리자 패널</h1>
          <p className="text-gray-500 text-sm mt-1">기증 신청을 검토하고 상태를 관리합니다.</p>
        </div>
        <Link
          href="/donate"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + 새 기증 신청
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: '전체', value: stats.total, color: 'text-gray-900' },
          { label: '대기 중', value: stats.pending, color: 'text-yellow-700' },
          { label: '처리 중', value: stats.processing, color: 'text-blue-700' },
          { label: '완료', value: stats.completed, color: 'text-green-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">기증 신청 목록</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">신청일</th>
                <th className="px-4 py-3 text-left">기업명</th>
                <th className="px-4 py-3 text-left">담당자</th>
                <th className="px-4 py-3 text-left">품목</th>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.map((d) => {
                const s = statusLabel[d.status];
                return (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{d.companyName}</td>
                    <td className="px-4 py-3 text-gray-600">{d.contactName}</td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        {d.items.map((item, i) => (
                          <div key={i} className="text-gray-700">
                            {item.name} {item.quantity}개{' '}
                            <span className="text-gray-400">({conditionLabel[item.condition]})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/donations/${d.id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        상세 보기
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
