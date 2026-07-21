# Deploying to GitHub Pages

This project is already configured for GitHub Pages:
- `vite.config.ts` uses `base: './'` (relative asset paths — works on any repo name)
- `src/main.tsx` uses `HashRouter` (so page routes like `/courses` work without a server)
- `.github/workflows/deploy.yml` builds and deploys the site automatically

## Steps

1. Create a new GitHub repository (or use an existing one).
2. Push this entire folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Push (or re-run the workflow from the **Actions** tab) — it will install dependencies, run `npm run build`, and publish the `dist` folder.
6. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

## Notes

- No secrets/environment variables are required — the Supabase URL and anon key in `src/lib/supabaseClient.ts` are hardcoded and safe to expose (access is controlled by Supabase Row Level Security).
- The Stripe checkout / webhook code under `supabase/functions` is deployed separately to Supabase Edge Functions — it is not part of the static site and does not affect GitHub Pages deployment.
- If you ever rename the repo, nothing needs to change — the relative base path and hash routing work regardless of the repo name.
