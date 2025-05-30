# 🎬 CinePlay Hub

## Overview

**CinePlay Hub** is your all-in-one streaming companion that consolidates content from multiple platforms into a seamless, modern interface. Powered by the TMDB API, it enables effortless browsing and discovery of movies and TV shows — all in one place.

---

## ✨ Features

- 🎞️ Modern, responsive interface for browsing movies and shows  
- 🔍 Powerful, cross-category search functionality  
- 📱 Fully mobile-friendly with touch gesture support  
- 🎯 Discover content via intuitive, category-based navigation  
- 💾 Maintain a personalized watchlist  
- 📢 Configurable announcement banner for updates and alerts  
- 🌙 Smooth UI with elegant animations and transitions  
- ⚡ Fast performance powered by **React** and **Vite**

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v22.x or higher  
- **npm** v10.x or higher  
- A valid **TMDB API key** – [Get one here](https://www.themoviedb.org/documentation/api)

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
cd cineplay-hub

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Edit .env and insert your TMDB API key

# 5. Start the development server
npm run dev
```

---

## 🔧 API Configuration

1. Obtain your TMDB API key from [TMDB's website](https://www.themoviedb.org/documentation/api)  
2. Rename `.env.example` to `.env`  
3. Replace `your_tmdb_api_key_here` with your actual API key  

---

## 🛠️ Tech Stack

This project uses modern web technologies:

- **[Vite](https://vitejs.dev/)** – Next-gen frontend tooling  
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript  
- **[React](https://reactjs.org/)** – UI component library  
- **[shadcn/ui](https://ui.shadcn.com/)** – Accessible UI components  
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework  
- **[React Query](https://tanstack.com/query)** – Efficient data handling  
- **[Framer Motion](https://www.framer.com/motion/)** – Smooth animations  
- **[React Router](https://reactrouter.com/)** – Client-side routing

---

## ☁️ Deployment

### ✅ Netlify (Recommended)

1. Fork this repository  
2. Connect your repo to Netlify  
3. Configure the build settings:
   - **Build Command**: `npm run build`  
   - **Publish Directory**: `dist`  
4. Add environment variables  
5. Deploy

### ⚠️ Vercel (Not Recommended)

1. Fork the repo  
2. Import it into Vercel  
3. Add environment variables  
4. Deploy

### 🌐 GitHub Pages

1. Set the `base` option in `vite.config.ts`  
2. Run `npm run build`  
3. Deploy the `dist` directory to GitHub Pages

### 🔥 Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 📢 Managing Announcements

Edit `public/config/announcement.json` to update the in-app announcement banner:

```json
{
  "enabled": true,
  "message": "Your message here",
  "link": "/optional/url",
  "backgroundColor": "#2B8CBE",
  "textColor": "#FFFFFF"
}
```

- Changes take effect within 1 hour (adjustable via cache config).
- Users can dismiss the banner; the dismissal is stored in local storage.

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo  
2. Create a feature branch: `git checkout -b feature/awesome-feature`  
3. Commit your changes: `git commit -m "Add awesome feature"`  
4. Push to GitHub: `git push origin feature/awesome-feature`  
5. Open a Pull Request

Please ensure you:

- Follow existing code style  
- Use TypeScript for all new code  
- Write meaningful commit messages  
- Update documentation where necessary  
- Use `shadcn/ui` components when applicable  
- Add error handling and keep performance in mind

---

## 🧑‍⚖️ License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🧭 Code of Conduct

We are committed to a welcoming environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 🛠️ Support

If you encounter issues:

1. Check [Issues](../../issues) for known problems  
2. Review the [Documentation](../../wiki) if available  
3. If the issue exists in the upstream version, raise it there  
4. Otherwise, open a new issue and provide:
   - Node.js version
   - npm version
   - Browser and version
   - Error messages
   - Steps to reproduce
   - Expected vs actual behavior

---

## 🙌 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie and TV show data  
- [shadcn/ui](https://ui.shadcn.com/) for the UI library  
- All the embedded services we used

---

## 📎 Additional Notes

- The project file tree is available in the root directory  
- `sw.js` and ad scripts are located in `/public/sw.js` and `/index.html` respectively  
  - **To disable ads**, delete `sw.js` and remove the related code from `index.html`  
  - If you keep it, thanks! We receive revenue support from it  
- Redirects from video servers are external and not controlled by us
