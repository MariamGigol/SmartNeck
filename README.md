# Smart Neck — Dashboard & Website

Premium dark/gold React dashboard for the Smart Neck posture device. Built with
[Vite](https://vitejs.dev/), React, [lucide-react](https://lucide.dev/) icons,
and [Recharts](https://recharts.org/) for the analytics charts. Mobile-first,
with a desktop layout that kicks in above 880px.

## 1. Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 2. Before deploying: set your repo name

Vite needs to know the sub-path your site will live at on GitHub Pages.

Open **`vite.config.js`** and set `base` to match your repository name:

```js
export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/", // <-- change this
});
```

- Deploying to `https://<username>.github.io/<repo-name>/` → use `"/<repo-name>/"`
- Deploying to a user/org root site (`https://<username>.github.io/`) or a
  custom domain → use `"/"`

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

## 4. Turn on GitHub Pages (automatic deploys)

This project already includes a GitHub Actions workflow at
`.github/workflows/deploy.yml` that builds and deploys the site every time you
push to `main`.

1. In your GitHub repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push a commit to `main` (or re-run the workflow from the **Actions** tab).
4. After the workflow finishes, your site will be live at the URL shown in
   **Settings → Pages**.

### Alternative: manual deploy with `gh-pages`

If you'd rather deploy from your own machine instead of using Actions:

```bash
npm run deploy
```

This builds the project and pushes the `dist/` folder to a `gh-pages` branch
using the included `gh-pages` package. Then set **Settings → Pages → Source**
to **Deploy from a branch → `gh-pages`**.

## Project structure

```
├── index.html              # HTML entry point, loads Google Fonts
├── vite.config.js          # Vite config — set `base` here for GH Pages
├── package.json
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # All pages/components (Home, About, Analytics, Profile, Store)
│   └── index.css            # All styles (design tokens, layout, responsive rules)
└── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages on push
```

## Notes

- All content is in Georgian, matching the original brief.
- Data (posture score, weekly/monthly charts, alerts) is mocked client-side
  for demo purposes — wire it up to your real sensor/API by replacing the
  mock arrays and `useEffect` polling logic in `src/App.jsx`.
- Colors, fonts, and spacing are defined as CSS variables at the top of
  `src/index.css` (`--gold`, `--gold-bright`, `--amber`, etc.) — change them
  there to retheme the whole app.
