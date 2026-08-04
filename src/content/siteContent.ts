export const SITE_URL = "https://seoha376.github.io/hotAppearance";

export type NavLink = {
  href: string;
  label: string;
};

export type ArticleGuide = {
  slug: string;
  title: string;
  eyebrow: string;
  body: string;
};

export const navLinks: NavLink[] = [
  { href: "/hotAppearance/", label: "Home" },
  { href: "/hotAppearance/#ranking", label: "Ranking" },
  { href: "/hotAppearance/about/", label: "About" },
  { href: "/hotAppearance/contact/", label: "Contact" },
  { href: "/hotAppearance/privacy/", label: "Privacy" }
];

export const articleGuides: ArticleGuide[] = [
  {
    slug: "beginner-routine",
    eyebrow: "Guide",
    title: "외모관리 입문자는 무엇부터 보면 좋을까?",
    body: "처음부터 모든 제품과 시술을 비교하려고 하면 금방 지칩니다. 가장 먼저 볼 키워드는 피부장벽, 선크림, 눈썹정리, 두피케어처럼 매일의 인상을 안정적으로 바꾸는 기본 관리입니다. 한 번에 크게 바꾸는 것보다 매일 유지 가능한 루틴을 만드는 편이 실패 확률이 낮습니다."
  },
  {
    slug: "mens-grooming-checklist",
    eyebrow: "Checklist",
    title: "남자 외모관리 체크리스트",
    body: "남성 외모관리 입문은 피부를 덮는 것보다 정돈감을 만드는 데서 시작하는 편이 좋습니다. 세안 후 보습, 자외선 차단, 눈썹 정리, 두피 냄새 관리, 입술 각질 관리만 해도 첫인상이 꽤 달라집니다. 여기에 향수나 톤업 선크림을 더하면 과하지 않은 변화가 생깁니다."
  },
  {
    slug: "skin-barrier-first",
    eyebrow: "Skin",
    title: "피부장벽 관리가 먼저인 이유",
    body: "요즘 스킨케어 키워드는 강한 기능성보다 피부장벽, 수분, 저자극처럼 기본 컨디션을 지키는 방향으로 움직입니다. 피부가 쉽게 붉어지거나 건조하다면 새로운 성분을 계속 추가하기보다 세안과 보습 단계를 단순화하는 것이 먼저입니다. 장벽이 안정되면 모공, 톤, 광채 관리도 더 편하게 이어갈 수 있습니다."
  },
  {
    slug: "scalp-care-impression",
    eyebrow: "Hair",
    title: "두피케어가 인상에 미치는 영향",
    body: "외모관리는 얼굴 피부만의 문제가 아닙니다. 두피 유분, 냄새, 각질, 볼륨은 가까이에서 느껴지는 청결감과 스타일 완성도에 영향을 줍니다. 두피케어 키워드가 계속 언급되는 이유는 탈모 걱정뿐 아니라 머리 냄새와 축 처지는 볼륨처럼 일상적인 고민과 바로 연결되기 때문입니다."
  },
  {
    slug: "trend-keywords-2026",
    eyebrow: "Trend",
    title: "2026 외모관리 트렌드 키워드 읽는 법",
    body: "PDRN, 엑소좀, 슬로우에이징, 물광피부 같은 단어는 한 번에 정답을 주는 키워드라기보다 사람들이 무엇을 궁금해하는지 보여주는 신호입니다. Hot Appearance는 이런 단어를 제품 추천보다 먼저 뜻과 맥락으로 정리합니다. 이후에는 커뮤니티에서 언급되는 관심 키워드도 원문을 복사하지 않고, 안전하게 요약한 정보글과 원문 이동 링크 방식으로 다룰 계획입니다."
  }
];

export const privacyParagraphs = [
  "Hot Appearance는 현재 회원가입을 받지 않으며, 이름·주소·전화번호 같은 개인 정보를 직접 수집하지 않습니다. 문의를 위해 이메일을 보내는 경우 답변 목적에 필요한 범위에서 이메일 주소와 문의 내용을 확인할 수 있습니다.",
  "향후 Google AdSense 같은 광고 서비스나 방문 통계를 위한 분석 도구를 사용할 수 있습니다. 이 과정에서 Google을 포함한 제3자 서비스 제공자가 쿠키, 웹 비콘, IP 주소, 브라우저 정보 또는 이와 유사한 식별자를 사용할 수 있습니다.",
  "Google 및 제3자 광고 제공자는 사용자의 이전 방문 기록을 바탕으로 광고를 표시할 수 있으며, 개인화 광고 설정은 Google 광고 설정 페이지에서 관리하거나 해제할 수 있습니다. 광고와 분석 도구가 추가되면 이 개인정보처리방침에 관련 내용을 계속 반영합니다.",
  "정책 변경이 있을 경우 이 섹션의 내용을 업데이트합니다. 개인정보 관련 문의는 seoha376@gmail.com 으로 연락할 수 있습니다."
];
