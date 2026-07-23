import { notFound } from 'next/navigation';
import { EMPLOYEES } from '@/lib/employee-prompts';
import ChatInterface from '@/components/employees/ChatInterface';

export default async function EmployeeChatPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const employee = EMPLOYEES.find((e) => e.id === role);
  if (!employee) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ChatInterface employee={employee} />
    </div>
  );
}
