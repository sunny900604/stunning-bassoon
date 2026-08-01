import Link from 'next/link';
import { getStats } from '@/lib/store';
import { EMPLOYEES, EMPLOYEE_GROUPS } from '@/lib/employee-prompts';

const colorMap: Record<string, string> = {
  blue:   'bg-blue-100',
  green:  'bg-green-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
  pink:   'bg-pink-100',
  teal:   'bg-teal-100',
  red:    'bg-red-100',
  indigo: 'bg-indigo-100',
};

const statColors: Record<string, string> = {
  blue:   'bg-blue-50 border-blue-200 text-blue-700',
  green:  'bg-green-50 border-green-200 text-green-700',
  yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
};

const employeeMap = Object.fromEntries(EMPLOYEES.map((e) => [e.id, e]));

export default function DashboardPage() {
  const stats = getStats();

  const statCards = [
    { label: '총 기증 건수', value: stats.total, unit: '건', color: 'blue', icon: '📦' },
    { label: '총 기증 품목', value: stats.totalItems, unit: '개', color: 'green', icon: '🎁' },
    { label: '처리 대기', value: stats.pending, unit: '건', color: 'yellow', icon: '⏳' },
    { label: '완료', value: stats.completed, unit: '건', color: 'purple', icon: '✅' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-3">쿠퍼브 플랫폼에 오신 걸 환영합니다 🤝</h1>
          <p className="text-blue-100 text-lg mb-6">
            AI 직원 8명이 기증 관리부터 굿팝업 운영까지 함께 합니다.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/donate" className="bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              기증 신청하기
            </Link>
            <Link href="/employees" className="border border-white text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              AI 직원 만나기
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div key={card.label} className={`border rounded-xl p-5 ${statColors[card.color]}`}>
            <div className="text-2xl mb-1">{card.icon}</div>
            <div className="text-3xl font-bold">
              {card.value.toLocaleString()}
              <span className="text-lg font-normal ml-1">{card.unit}</span>
            </div>
            <div className="text-sm mt-1 opacity-80">{card.label}</div>
          </div>
        ))}
      </div>

      {/* AI Employee Groups */}
      <div className="mb-10 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">AI 직원 팀</h2>
          <Link href="/employees" className="text-blue-600 text-sm hover:underline">전체 보기 →</Link>
        </div>

        {EMPLOYEE_GROUPS.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">{group.label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {group.ids.map((id) => {
                const emp = employeeMap[id];
                if (!emp) return null;
                return (
                  <Link
                    key={id}
                    href={`/employees/${id}`}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all group text-center"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 mx-auto ${colorMap[emp.color]}`}>
                      {emp.emoji}
                    </div>
                    <div className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{emp.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{emp.title}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">빠른 실행</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { href: '/donate', emoji: '📝', label: '기증 신청', desc: '새 기업 기증 접수' },
            { href: '/admin', emoji: '⚙️', label: '관리자 패널', desc: '신청 검토 및 승인' },
            { href: '/employees/instagram', emoji: '📸', label: '인스타 콘텐츠', desc: '유나에게 요청' },
            { href: '/employees/goodpopup', emoji: '🏪', label: '굿팝업 제안서', desc: '지호에게 요청' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
