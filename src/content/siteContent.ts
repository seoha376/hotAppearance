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
    body: "처음부터 모든 제품과 시술을 비교하려고 하면 금방 지칩니다. 가장 먼저 볼 키워드는 피부장벽, 선크림, 눈썹정리, 두피케어처럼 매일의 인상을 차분하게 정돈하는 기본 관리입니다. 이 글은 정보성 참고 글이며, 한 번에 크게 바꾸는 방법보다 매일 유지 가능한 루틴을 만드는 관점에서 외모관리 흐름을 설명합니다."
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
  },
  {
    slug: "trend-hype-check",
    eyebrow: "Policy Note",
    title: "트렌드 키워드를 과장 없이 읽는 법",
    body: "외모관리 키워드는 짧은 영상과 후기에서 빠르게 커지기 때문에 실제 의미보다 더 강하게 보일 수 있습니다. Hot Appearance는 특정 제품, 시술, 성분의 결과를 약속하지 않고 사람들이 왜 그 단어를 검색하는지, 어떤 맥락에서 언급되는지를 정보성 해설로 정리합니다. 낯선 키워드는 먼저 뜻과 사용 장면을 확인하고, 개인 피부나 건강 상태와 관련된 선택은 전문가 상담이 필요한 영역으로 구분하는 편이 안전합니다."
  },
  {
    slug: "sunscreen-tone-basics",
    eyebrow: "Basics",
    title: "선크림과 톤업 제품을 볼 때 확인할 점",
    body: "선크림과 톤업 제품은 외모관리에서 자주 함께 언급되지만 목적은 다릅니다. 선크림은 자외선 차단 표시와 사용감, 덧바르기 편의성을 먼저 보고, 톤업 제품은 얼굴과 목의 색 차이, 건조함, 묻어남을 함께 확인하는 편이 좋습니다. 자연스러운 인상을 원한다면 밝아지는 정도보다 매일 부담 없이 바를 수 있는지와 세안 후 피부가 편안한지를 기준으로 보는 것이 실용적입니다."
  },
  {
    slug: "community-summary-rules",
    eyebrow: "Editorial",
    title: "커뮤니티 트렌드를 안전하게 요약하는 기준",
    body: "커뮤니티에서 많이 언급되는 단어는 유용한 신호가 될 수 있지만, 원문을 그대로 옮기면 저작권과 맥락 왜곡 문제가 생길 수 있습니다. Hot Appearance는 향후 커뮤니티 흐름을 다룰 때 직접 작성한 요약, 쉬운 배경 설명, 확인 가능한 원문 링크 이동 방식을 우선합니다. 욕설, 혐오, 선정적인 표현은 소개하지 않고, 개인 경험담은 일반적인 사실처럼 단정하지 않는 기준을 유지합니다."
  }
];

export const privacyParagraphs = [
  "Hot Appearance는 현재 회원가입을 받지 않으며, 이름·주소·전화번호 같은 개인 정보를 직접 수집하지 않습니다. 문의를 위해 이메일을 보내는 경우 답변 목적에 필요한 범위에서 이메일 주소와 문의 내용을 확인할 수 있습니다.",
  "향후 Google AdSense 같은 광고 서비스나 방문 통계를 위한 분석 도구를 사용할 수 있습니다. 이 과정에서 Google을 포함한 제3자 서비스 제공자가 쿠키, 웹 비콘, IP 주소, 브라우저 정보 또는 이와 유사한 식별자를 사용할 수 있습니다.",
  "Google 및 제3자 광고 제공자는 사용자의 이전 방문 기록을 바탕으로 광고를 표시할 수 있으며, 개인화 광고 설정은 Google 광고 설정 페이지에서 관리하거나 해제할 수 있습니다. 광고와 분석 도구가 추가되면 이 개인정보처리방침에 관련 내용을 계속 반영합니다.",
  "정책 변경이 있을 경우 이 섹션의 내용을 업데이트합니다. 개인정보 관련 문의는 seoha376@gmail.com 으로 연락할 수 있습니다."
];
