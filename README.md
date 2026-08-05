# Hot Appearance

요즘 뜨는 외모관리 키워드를 핫함 정도에 따라 큰 글자로 보여주는 정적 웹사이트입니다.

## Scripts

- `npm run dev`: local development server
- `npm run build`: production build
- `npm test`: unit tests

## Deployment

The default production target is Vercel at the site root.

- Default canonical URL: `https://hot-appearance.vercel.app`
- Default base path: `/`
- If Vercel assigns a different production URL, set `VITE_SITE_URL` in Vercel and redeploy.
- Keep `VITE_BASE_PATH=/` for Vercel. The GitHub Pages workflow overrides this only for the legacy `/hotAppearance/` deployment.

## First Release

The first release uses curated static keyword data. The keyword data shape is normalized so future versions can replace it with collected trend data.

## Ad Application Checklist

- Homepage has original informational content.
- About, Contact, and Privacy Policy sections are present.
- Medical or procedure-related copy avoids guaranteed-result claims.
- Build output can be deployed to free static hosting.
- The AdSense application URL should be the root Vercel production URL, not the legacy GitHub Pages project path.
- Do not add ad placeholders, "coming ad" labels, or `ads.txt` before an AdSense publisher ID is available.
- If AdSense requests `ads.txt`, publish it at the active root domain after the publisher ID is available.
