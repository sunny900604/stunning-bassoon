export const NAV_ITEMS = [
  { label: "홈", href: "#top" },
  { label: "스튜디오 소개", href: "#about" },
  { label: "서비스", href: "#services" },
  { label: "포트폴리오", href: "#portfolio" },
  { label: "블로그", href: "#blog" },
];

export const STATS = [
  { key: "works", label: "2020-2024년 작업건수", min: 120, max: 650 },
  { key: "projects", label: "진행 프로젝트", min: 220, max: 1080 },
  { key: "partners", label: "총 파트너 수", min: 95, max: 500 },
  {
    key: "scale",
    label: "단일 최대 제작규모",
    min: 110_000_000,
    max: 550_000_000,
  },
] as const;

export const PARTNERS = [
  "GENESIS",
  "NIKE",
  "KOREAN AIR",
  "BMW",
  "LG전자",
  "POLO RALPH LAUREN",
  "kakao",
  "SAMSUNG",
  "NETFLIX",
  "LG U+",
  "AUDI",
  "LAND ROVER",
  "현대건설",
  "SK바이오사이언스",
  "KBS",
  "문화체육관광부",
  "HERMES PARIS",
  "KIA",
  "HYUNDAI",
  "신세계백화점",
  "LOTTE WORLD",
  "Helinox",
  "고려아연",
  "LOTTE HOTELS",
  "yes24",
  "SONY",
  "ROYAL SALUTE",
  "경기도",
  "중앙선거관리위원회",
  "소방청",
  "화성시",
  "경기문화재단",
  "ELLE",
  "강릉문화재단",
  "한국청소년상담복지개발원",
  "우주항공청",
  "과학기술정보통신부",
  "국립생물자원관",
  "서울특별시",
  "강진군",
  "e편한세상",
  "IBK기업은행",
  "kotra",
];

export const YOUTUBE_CONTENT = {
  eyebrow: "Making youtube contents",
  titleMain: "유튜브",
  titleAccent: "컨텐츠",
  paragraphs: [
    "올인스튜디오는 최신 유튜브 트렌드를 분석하여 타깃층에 맞춘 맞춤형 유튜브 영상제작 서비스를 제공합니다.",
    "기업 및 기관의 유튜브 채널 목적과 적합한 연령층을 고려해, 유튜브 알고리즘을 효과적으로 활용할 수 있는 최적화된 영상 콘텐츠를 제작합니다.",
    "유튜브에서 성공적인 영상제작과 채널 성장을 원하신다면, 올인 스튜디오와 함께하세요.",
  ],
  cta: "포트폴리오 확인하기",
  thumbnails: [
    { title: "꽃밭캐스트", subtitle: "Ep.6 시큐리티 캐스트 되기" },
    { title: "퀴즈 파티", subtitle: "생일 축하 퀴즈쇼" },
    { title: "드라이브 토크", subtitle: "출근길 인터뷰" },
  ],
};

export const SERVICE_SECTIONS = [
  {
    id: "ads",
    eyebrow: "Ads / Vital film",
    titleMain: "브랜드 / 기업홍보 / 바이럴",
    titleAccent: "",
    tone: "light" as const,
    paragraphs: [
      "올인스튜디오는 브랜드 이미지를 선명하게 각인시키는 광고 및 바이럴 영상제작을 올인합니다.",
      "브랜드의 매력을 극대화한 맞춤형 광고 영상제작을 통해 고객의 비전을 시각적으로 구현하고, 시장에 강력한 인상을 남깁니다.",
    ],
    cta: "포트폴리오 확인하기",
    mediaCaption: "음소거 해제",
    toggleType: "mute" as const,
    gradient: "from-stone-300 via-stone-200 to-amber-100",
  },
  {
    id: "education",
    eyebrow: "Educationfilm",
    titleMain: "교육 / 공공기관",
    titleAccent: "영상",
    tone: "peach" as const,
    paragraphs: [
      "올인스튜디오는 복잡한 정보를 명확하고 쉽게 전달할 수 있는 교육 영상제작을 전문으로 합니다.",
      "인포그래픽, 일러스트, 애니메이션 등 다양한 시각적 요소를 활용하여 학습자가 효과적으로 지식을 습득할 수 있도록 맞춤형 교육 영상제작을 제공합니다.",
      "올인스튜디오는 교육 목적에 맞는 최적의 시각적 콘텐츠를 통해 높은 교육 효과를 보장합니다.",
    ],
    cta: "포트폴리오 확인하기",
    mediaCaption: "한국언론진흥재단",
    toggleType: "play" as const,
    gradient: "from-slate-300 via-blue-100 to-white",
  },
];

export const CONTACT_FEED: { title: string; time: string }[] = [
  { title: "기업 인터뷰 영상 제작 문의", time: "9시간전" },
  { title: "호텔 여름 프로모션 홍보영상 제작 문의", time: "11시간전" },
  { title: "산업용 안전장비 제품 홍보영상 제작 문의", time: "1일전" },
  { title: "박람회 냉각설비 시연영상 제작 견적 문의", time: "1일전" },
  { title: "물류센터 신규 자동화설비 교육영상 문의", time: "2일전" },
  { title: "의료기기 홍보영상 제작 문의", time: "2026-07-24" },
];

export const PORTFOLIO_ITEMS = [
  { title: "BURBERRY", subtitle: "LONDON ENGLAND" },
  { title: "제품 필름", subtitle: "앞으로도 우리는 무엇이든 더 완벽에 가까운 발전을 이룰겁니다" },
  { title: "빛나2", subtitle: "Tenacity" },
  { title: "브랜드 필름", subtitle: "올인스튜디오 포트폴리오" },
];

export const FOOTER = {
  address: "서울특별시 서초구 마방로6길 13, 4층 4292호(양재동, 범정빌딩)",
  tel: "02- 3144-1728",
  email: "allin.studio.info@gmail.com",
  license: "618-71-00607",
  copyright: "COPYRIGHT © 2024 ALLINSTUDIO CO.,LTD. SEOUL, KOREA ALL RIGHTS RESERVED.",
  bizName: "올인스튜디오",
  ceo: "김기명, 이승호",
  ceoPhone: "010-9783-2324",
  ceoEmail: "studio.all.in.info@gmail.com",
  hosting: "(주)아임웹",
};
