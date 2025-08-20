# Match the Pairs Game

A simple browser-based memory game built with TypeScript, HTML, and CSS. No frameworks required.

## How to Run

1. Compile the TypeScript file:
   
   ```sh
   tsc game.ts
   ```
   (Requires TypeScript installed globally: `npm install -g typescript`)

2. Open `index.html` in your browser.

## Features
- 4x4 grid of cards with emoji icons
- Move counter
- Pairs matched counter
- Reset button
- Modern, responsive UI

## Customization
- Replace emoji in `game.ts` with your own icons or images.

---

## Deploying to Vercel and Mapping to a Custom Domain (GoDaddy)

### 1. Deploying to Vercel

1. **Sign up / Log in to Vercel**
   - Go to [https://vercel.com/](https://vercel.com/) and sign in with your GitHub, GitLab, or email.

2. **Create a New Project**
   - Click **Add New... > Project**.
   - Import your repository (if using GitHub/GitLab) or use the **Import** button to upload your project folder.
   - If uploading manually, zip your project folder and upload it.

3. **Configure Project**
   - For a static site, Vercel will auto-detect your project as a static site.
   - If prompted for a build command, leave it blank (or use `tsc` if you want Vercel to compile TypeScript for you).
   - Set the output/public directory to `.` (the root folder) or leave as default if all files are in the root.

4. **Deploy**
   - Click **Deploy**. Wait for the deployment to finish.
   - You will get a Vercel URL like `https://your-project-name.vercel.app`.

### 2. Map Your Custom Domain (game.sumantpro.in) to Vercel

#### On Vercel:
1. Go to your project dashboard on Vercel.
2. Click **Settings > Domains**.
3. Click **Add** and enter `game.sumantpro.in`.
4. Vercel will show you the DNS records you need to add at GoDaddy (usually a CNAME or A record).

#### On GoDaddy:
1. Log in to your GoDaddy account and go to **My Products**.
2. Find your domain (`sumantpro.in`) and click **DNS** or **Manage DNS**.
3. Under **Records**, click **Add** (or edit if the subdomain already exists).
4. Add a **CNAME** record:
   - **Type:** CNAME
   - **Name:** game
   - **Value:** cname.vercel-dns.com (or the value Vercel provides)
   - **TTL:** 1 hour (default)
   - If Vercel provides an **A record** instead, add it as an A record.
5. Save the record.

#### Finalize on Vercel:
1. Go back to Vercel and click **Verify** for your domain.
2. It may take a few minutes for DNS changes to propagate.
3. Once verified, your game will be live at `https://game.sumantpro.in`.

---

## Troubleshooting
- If the domain does not work after 10-15 minutes, clear your browser cache and check DNS propagation at [https://dnschecker.org/](https://dnschecker.org/).
- Make sure there are no conflicting records for the subdomain in GoDaddy DNS.
- For SSL issues, Vercel will automatically provision SSL certificates once the domain is verified.

---

Enjoy the game!
