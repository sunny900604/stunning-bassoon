import DonationForm from '@/components/donations/DonationForm';

export default function DonatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">기업 기증 신청</h1>
        <p className="text-gray-500">
          기증 신청을 접수하면 AI 직원 주안이 검토 후 픽업 일정을 안내해 드립니다.
          신청 후 영업일 기준 1~2일 이내에 연락드립니다.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-700">
        <strong>기증 가능 품목:</strong> 의류, 소형 가전, 도서, 생활용품, 소형 가구, 장난감 등
        <br />
        <strong>기증 불가 품목:</strong> 음식, 의약품, 속옷류, 심하게 파손되거나 오염된 물품
      </div>

      <DonationForm />
    </div>
  );
}
