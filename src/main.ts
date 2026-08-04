import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root #app was not found.");
}

app.innerHTML = `
  <main class="page-shell">
    <section class="hero">
      <p class="eyebrow">Hot Appearance</p>
      <h1>요즘 외모관리 키워드를 한눈에</h1>
      <p class="hero-copy">핫할수록 글자가 커지는 키워드 맵을 준비 중입니다.</p>
    </section>
  </main>
`;
