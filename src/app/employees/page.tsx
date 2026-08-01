import Link from 'next/link';
import { EMPLOYEES, EMPLOYEE_GROUPS } from '@/lib/employee-prompts';

const colorMap: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',   text: 'text-blue-700' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',  text: 'text-green-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', text: 'text-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', text: 'text-orange-700' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',   text: 'text-pink-700' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   badge: 'bg-teal-100 text-teal-700',   text: 'text-teal-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700',    text: 'text-red-700' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', text: 'text-indigo-700' },
};

const employeeMap = Object.fromEntries(EMPLOYEES.map((e) => [e.id, e]));

export default function EmployeesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI 직원 소개</h1>
        <p className="text-gray-500">
          쿠퍼브의 AI 직원 8명이 24시간 업무를 지원합니다. 원하는 직원을 클릭해 대화를 시작하세요.
        </p>
      </div>

      <div className="space-y-10">
        {EMPLOYEE_GROUPS.map((group) => (
          <div key={group.label}>
            <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-4">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.ids.map((id) => {
                const emp = employeeMap[id];
                if (!emp) return null;
                const c = colorMap[emp.color] ?? colorMap.blue;
                return (
                  <div
                    key={emp.id}
                    className={`bg-white border ${c.border} rounded-2xl p-5 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${c.bg} flex-shrink-0`}>
                        {emp.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{emp.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>
                            {emp.title}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">{emp.description}</p>
                        <Link
                          href={`/employees/${emp.id}`}
                          className={`text-sm font-semibold ${c.text} hover:underline`}
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
        ))}
      </div>
    </div>
  );
}
