import Link from 'next/link';
import { EMPLOYEES } from '@/lib/employee-prompts';

const colorMap: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    text: 'text-blue-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    text: 'text-green-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    text: 'text-purple-700',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    text: 'text-orange-700',
  },
};

export default function EmployeesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI 직원 소개</h1>
        <p className="text-gray-500">
          쿠퍼브의 AI 직원들은 24시간 기업 기증 행정 업무를 지원합니다.
          원하는 직원을 클릭해 대화를 시작하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EMPLOYEES.map((emp) => {
          const c = colorMap[emp.color];
          return (
            <div
              key={emp.id}
              className={`bg-white border ${c.border} rounded-2xl p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${c.bg} flex-shrink-0`}>
                  {emp.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{emp.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>
                      {emp.title}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {emp.description}
                  </p>
                  <Link
                    href={`/employees/${emp.id}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.text} hover:underline`}
                  >
                    대화 시작하기 →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
