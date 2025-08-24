# Match the Pairs Game

A beautiful, interactive browser-based memory game built with TypeScript, HTML, and CSS. Features multiple difficulty levels, smooth animations, and a modern UI design.

## 🎮 Game Features

### **Three Difficulty Levels:**
- **😊 Easy**: 4×4 grid (8 pairs) - Perfect for beginners
- **🤔 Medium**: 4×8 grid (16 pairs) - For intermediate players  
- **🔥 Hard**: 8×8 grid (32 pairs) - Ultimate challenge

### **Enhanced Gameplay:**
- **Timer** - Track how long it takes to complete each level
- **Move Counter** - Monitor your efficiency
- **Success Modal** - Celebrate completion with detailed stats
- **Level Selection** - Easy navigation between difficulty levels
- **Reset Functionality** - Start over anytime

### **Beautiful Animations & UI:**
- **Card Flip Animations** - Smooth 3D card reveals
- **Match Effects** - Satisfying pulse animations for successful pairs
- **Wrong Choice Feedback** - Shake animation for incorrect matches
- **Gradient Backgrounds** - Modern, eye-catching design
- **Glassmorphism Effects** - Translucent, modern UI elements
- **Responsive Design** - Works perfectly on mobile and desktop
- **Hover Effects** - Interactive shimmer animations

## 🚀 How to Run Locally

1. **Install TypeScript (if not already installed):**
   ```sh
   npm install -g typescript
   ```

2. **Clone the repository:**
   ```sh
   git clone https://github.com/arihant-jn-dev/match-game-ts.git
   cd match-game-ts
   ```

3. **Compile the TypeScript file:**
   ```sh
   tsc game.ts
   ```

4. **Open the game in your browser:**
   - Double-click `index.html` or open it with your browser.
   - For best results, use a local server (recommended for Chrome):
     - With Python 3:
       ```sh
       python3 -m http.server 8080
       ```
       Then visit [http://localhost:8080](http://localhost:8080)
     - Or use the Live Server extension in VS Code.

---

## 🎯 How to Play

1. **Choose Your Level** - Select Easy, Medium, or Hard difficulty
2. **Click Cards** - Flip cards to reveal the hidden emojis
3. **Find Matches** - Match pairs of identical emojis
4. **Complete the Board** - Match all pairs to win!
5. **Track Progress** - Monitor your moves and time
6. **Celebrate** - Enjoy the completion animation and stats

## 🛠 Customization

- Replace emojis in `game.ts` with your own icons or images
- Modify difficulty levels by adjusting the `levelConfigs` object
- Customize animations and colors in `style.css`
- Add new levels or features as needed

## 📁 Project Structure

```
match-game-ts/
├── index.html          # Main HTML structure
├── style.css           # Enhanced styling and animations
├── game.ts            # TypeScript game logic
├── game.js            # Compiled JavaScript (auto-generated)
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

---

## 🚀 Deploying to Vercel and Mapping to a Custom Domain (GoDaddy)

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

## 🎮 Live Demo

**Coming Soon:** The game will be deployed at `https://game.sumantpro.in`

---

## 🔧 Tech Stack

- **TypeScript** - Type-safe JavaScript for robust game logic
- **HTML5** - Modern semantic structure
- **CSS3** - Advanced animations, gradients, and responsive design
- **Vanilla JavaScript** - No frameworks, pure performance

---

## 🎨 Design Features

- **Modern Glassmorphism** - Translucent, layered UI elements
- **Gradient Animations** - Dynamic color transitions
- **3D Card Flips** - Realistic card turning animations
- **Responsive Layout** - Perfect on any screen size
- **Accessibility** - Keyboard navigation and screen reader friendly

---

Enjoy the game! 🎉
