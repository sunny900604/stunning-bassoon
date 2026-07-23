import Link from 'next/link';
import { getStats } from '@/lib/store';
import { EMPLOYEES } from '@/lib/employee-prompts';

export default function DashboardPage() {
  const stats = getStats();

  const statCards = [
    { label: '총 기증 건수', value: stats.total, unit: '건', color: 'blue', icon: '📦' },
    { label: '총 기증 품목', value: stats.totalItems, unit: '개', color: 'green', icon: '🎁' },
    { label: '처리 대기', value: stats.pending, unit: '건', color: 'yellow', icon: '⏳' },
    { label: '완료', value: stats.completed, unit: '건', color: 'purple', icon: '✅' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
  };

  const employeeBgMap: Record<string, string> = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-3">쿠퍼브 플랫폼에 오신 걸 환영합니다 🤝</h1>
          <p className="text-blue-100 text-lg mb-6">
            AI 직원들이 기업 기증 행정을 처리하고, 사람이 최적의 매칭을 결정합니다.
            함께 더 나은 나눔을 만들어 가요.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/donate"
              className="bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              기증 신청하기
            </Link>
            <Link
              href="/employees"
              className="border border-white text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              AI 직원 만나기
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`border rounded-xl p-5 ${colorMap[card.color]}`}
          >
            <div className="text-2xl mb-1">{card.icon}</div>
            <div className="text-3xl font-bold">
              {card.value.toLocaleString()}
              <span className="text-lg font-normal ml-1">{card.unit}</span>
            </div>
            <div className="text-sm mt-1 opacity-80">{card.label}</div>
          </div>
        ))}
      </div>

      {/* AI Employees */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">AI 직원 소개</h2>
          <Link href="/employees" className="text-blue-600 text-sm hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMPLOYEES.map((emp) => (
            <Link
              key={emp.id}
              href={`/employees/${emp.id}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 ${employeeBgMap[emp.color]}`}>
                {emp.emoji}
              </div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {emp.name}
              </div>
              <div className="text-sm text-blue-600 font-medium mb-2">{emp.title}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{emp.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">빠른 실행</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/donate"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            <span className="text-2xl">📝</span>
            <div>
              <div className="font-medium text-gray-900">기증 신청</div>
              <div className="text-sm text-gray-500">새 기업 기증 접수</div>
            </div>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all"
          >
            <span className="text-2xl">⚙️</span>
            <div>
              <div className="font-medium text-gray-900">관리자 패널</div>
              <div className="text-sm text-gray-500">신청 검토 및 승인</div>
            </div>
          </Link>
          <Link
            href="/employees/data-analyst"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
          >
            <span className="text-2xl">📊</span>
            <div>
              <div className="font-medium text-gray-900">분석 리포트</div>
              <div className="text-sm text-gray-500">소라에게 분석 요청</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
