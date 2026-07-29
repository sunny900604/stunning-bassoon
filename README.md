# allin studio 홈페이지 클론 (allstudio.kr/home)

[allstudio.kr/home](https://allstudio.kr/home)의 첫 페이지를 참고하여 만든 반응형 Next.js 페이지입니다.
스크린 레코딩으로 전달받은 화면 구성을 바탕으로 레이아웃/문구/색상을 최대한 동일하게 재현했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 확인할 수 있습니다.

## 폴더 구조

- `src/app/page.tsx` — 각 섹션 컴포넌트를 조립하는 홈페이지
- `src/components/` — Header, Hero, StatsPartners, YoutubeSection, ServiceSection, ContactSection, Footer 등 섹션별 컴포넌트
- `src/data/content.ts` — 문구, 통계 수치 범위, 파트너사 목록 등 모든 텍스트 콘텐츠
- `src/app/globals.css` — 색상 토큰(peach 계열 등)과 공통 애니메이션

## 알아두면 좋은 점

- **실제 이미지/영상은 없습니다.** 원본 사이트의 사진, 영상, 로고 이미지 파일은 저작권이 있는 리소스라 직접 만들어낼 수 없어서, 해당 자리에는 그라디언트 placeholder 박스를 넣어뒀습니다. 실제 파일을 준비하시면 `src/components/*.tsx` 안의 그라디언트 `div`를 `<img>`/`<video>` 태그로 교체하시면 됩니다.
- **통계 숫자는 실시간으로 움직입니다.** 원본 사이트처럼 "작업건수/진행 프로젝트/파트너 수/최대 제작규모" 숫자가 몇 초마다 랜덤하게 바뀌도록 구현했습니다. 범위는 `src/data/content.ts`의 `STATS` 배열에서 조정할 수 있습니다.
- **반응형**입니다. 모바일에서는 햄버거 메뉴로, 데스크톱에서는 가로 네비게이션으로 자동 전환됩니다.
