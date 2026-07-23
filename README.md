# 쿠퍼브 (Cooperb) - 굿윌스토어 AI 기증 관리 플랫폼

기업 기증을 AI 직원이 함께 관리하는 통합 플랫폼입니다.

## 시작하기

```bash
# 환경 변수 설정
cp .env.example .env.local
# .env.local에 ANTHROPIC_API_KEY 입력

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## AI 직원 소개

| 이름 | 역할 | 기능 |
|------|------|------|
| 나리 | 고객상담 AI | 기증 문의 응대, 프로세스 안내 |
| 주안 | 기증관리 AI | 신청 처리, 픽업 일정, 영수증 |
| 소라 | 데이터분석 AI | 트렌드 분석, 리포트 생성 |
| 하루 | 마케팅 AI | 홍보 콘텐츠, 기업 제안서 |

## 주요 페이지

- `/` — 대시보드
- `/employees` — AI 직원 목록
- `/employees/[role]` — AI 직원 채팅
- `/donate` — 기증 신청 포털
- `/admin` — 관리자 패널
