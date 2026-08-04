export function renderInfoSections(): string {
  return `
    <section class="article-grid" aria-label="외모관리 정보 글">
      <article class="content-card">
        <p class="eyebrow">Guide</p>
        <h2>외모관리 입문자는 무엇부터 보면 좋을까?</h2>
        <p>
          처음부터 모든 제품과 시술을 비교하려고 하면 금방 지칩니다. 가장 먼저 볼 키워드는
          피부장벽, 선크림, 눈썹정리, 두피케어처럼 매일의 인상을 안정적으로 바꾸는 기본 관리입니다.
        </p>
      </article>
      <article class="content-card">
        <p class="eyebrow">Trend Note</p>
        <h2>2026 외모관리 트렌드의 큰 흐름</h2>
        <p>
          최근 흐름은 강한 변화보다 꾸준한 컨디션 관리에 가깝습니다. 슬로우에이징, 장벽 관리,
          두피 관리, 자연스러운 톤 보정처럼 매일 유지 가능한 키워드가 눈에 띕니다.
        </p>
      </article>
      <article class="content-card">
        <p class="eyebrow">Ad Ready</p>
        <h2>이 사이트의 정보 기준</h2>
        <p>
          Hot Appearance는 외모관리 키워드를 쉽게 이해하도록 정리하는 정보 사이트입니다.
          의료적 효과를 보장하지 않으며, 제품이나 시술 선택 전에는 본인 상태와 전문가 상담을 함께 고려해야 합니다.
        </p>
      </article>
    </section>
    <section class="legal-grid" aria-label="사이트 정보">
      <article id="about" class="content-card">
        <h2>About</h2>
        <p>
          Hot Appearance는 요즘 많이 언급되는 외모관리 키워드를 한눈에 볼 수 있게 정리하는 작은 트렌드 맵입니다.
          첫 버전은 큐레이션 기반이며, 이후 실제 검색/소셜 신호를 반영하는 서비스로 확장할 수 있습니다.
        </p>
      </article>
      <article id="contact" class="content-card">
        <h2>Contact</h2>
        <p>
          문의 이메일: contact@example.com
        </p>
      </article>
      <article id="privacy" class="content-card">
        <h2>Privacy Policy</h2>
        <p>
          현재 이 사이트는 회원가입을 받지 않고 개인 정보를 직접 수집하지 않습니다. 향후 광고, 분석 도구,
          문의 기능을 추가할 경우 이 정책을 업데이트합니다.
        </p>
      </article>
    </section>
  `;
}
