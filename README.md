# Advanced Timetable Component

This workspace contains a React component `AdvancedTimetable` built with Tailwind CSS and Framer Motion.

Features:
- Deep Space / Futuristic Dark theme
- Glassmorphism cards with backdrop-blur and semi-transparent borders
- Framer Motion staggered fade-in and hover glow/scale
- CSS Grid layout with time on Y-axis and days on X-axis
- Uses the exact schedule provided

Quick start (Vite + Tailwind):

1. Initialize a new project (if you don't have one):
   - npm init vite@latest my-timetable -- --template react
   - cd my-timetable

2. Copy the `src` files into your project (or point to this directory).

3. Install dependencies:
   - npm install
   - npm install framer-motion tailwindcss postcss autoprefixer -D
   - npx tailwindcss init -p

4. Replace `tailwind.config.cjs` with the one in this repo (it contains a safelist for dynamic classes).

5. Ensure `index.css` includes the Tailwind directives (this repo already contains it).

6. Start dev server:
   - npm run dev

Notes:
- The component uses `row-span-1` and `row-span-2` Tailwind classes for duration handling; the safelist in `tailwind.config.cjs` ensures these remain available.
- If you add more durations or color gradients, add them to `safelist` to avoid purge issues.

If you'd like, I can:
- Add a Vite project scaffold with package.json and scripts here, or
- Add responsive/mobile styles and a stacked-day view (already implemented in this branch), or
- Add a Storybook story / visual tests, or
- Add automated visual regression tests.

Responsive & Mobile:
- A stacked-day mobile view is available (visible on screens smaller than `md`). Each day becomes a card listing its classes in time order.
- The desktop grid remains hidden on small screens; the mobile view is touch-friendly and uses Framer Motion for subtle entry animations.

Light Theme & Typography:
- The timetable now uses a light theme with `Roboto` as the primary font. Spacing, font sizes and weights have been tuned for better alignment and readability on both desktop and mobile.
- The left time-column has a fixed width to improve alignment; time labels are left-aligned and the grid has a subtle border for clarity.

Tell me which next step to take and I'll proceed. 🔧