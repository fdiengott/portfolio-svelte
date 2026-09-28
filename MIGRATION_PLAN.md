# Svelte to Astro Migration Plan

## Overview

Migrate the portfolio/blog site from SvelteKit to Astro. The site is fully static (prerendered), making Astro a natural fit. The result will be a simpler, faster site with better blog authoring via content collections.

**Deployment:** Netlify (using `@astrojs/netlify` or static output)
**Branch:** `feature/astro-migration` (already created)

---

## Phase 1: Scaffold the Astro Project

1. Remove SvelteKit dependencies and config (`svelte.config.js`, `vite.config.js` if present)
2. Install Astro and core dependencies:
   - `astro`
   - `@astrojs/netlify` (or use static output mode — the site is fully prerendered, so static is likely sufficient)
   - `sharp` (for image optimization)
3. Create `astro.config.mjs` with:
   - Static output mode
   - Shiki syntax highlighting config (single theme to match new site aesthetic)
   - Markdown config with rehype plugins for heading IDs/anchor links (replaces `TableOfContentsHeader.svelte`)
4. Update `package.json` scripts (`dev`, `build`, `preview`)
5. Keep `static/` contents — Astro uses `public/` instead, so rename the directory

---

## Phase 2: Convert Blog Content to Markdown with Frontmatter

Convert all blog posts to `.md` files with frontmatter in `src/content/blog/`.

### Content collection schema (`src/content.config.ts`)

Define a `blog` collection with this schema:

```ts
{
  title: string,
  date: string,
  tags: string[],
  pinned?: boolean,
  searchable?: boolean,
}
```

### Posts to convert

**Already `.md` files** (just need frontmatter added, move to `src/content/blog/`):
- `static-fonts.md`
- `regex101.md`
- `csv-react.md`
- `pdf-react.md`
- `goal-activities-2025.md`
- `advanced-ts.md`
- `software-skills-for-an-ai-future.md`
- `will-ai-replace-software-developers.md`
- `podcasts-should-not-be-video.md`
- `tokens-are-a-commodity-sort-of.md`
- `have-we-thought-about-privacy-all-wrong.md`
- `why-fiat-currency.md`
- `simple-amazing-page-transitions.md`
- `derivatives-presentation.md`

**JS template literal exports** (extract markdown string to `.md` file with frontmatter):
- `bookList.js` -> `book-list.md`
- `recommendedBookList.js` -> `recommended-books.md`
- `tomatoSoup.js` -> `tomato-soup.md`
- `blogGuide.js` -> `blog-guide.md`
- `zsh-theme-customization.js` -> `zsh-theme-customization.md`
- `career-planning.js` -> `career-planning-in-the-age-of-ai.md`
- `ea.js` and `beginning.js` — currently commented out, skip or convert if desired

### Frontmatter format

```yaml
---
title: "Recent Reading List"
date: "12/04/24"
tags: ["suggestions"]
pinned: true
searchable: true
slug: "book-list"
---
```

### Slug strategy

Use the `slug` field in frontmatter to preserve existing URLs. The file name can match the slug for simplicity, but the frontmatter slug is the source of truth for URL generation.

---

## Phase 3: Layouts and Pages

### Base layout (`src/layouts/BaseLayout.astro`)

Replaces `+layout.svelte`. Contains:
- `<head>` with Font Awesome CSS imports, devicon CDN link, Google Fonts link
- `<Header />` component (remove Skills nav link)
- `<main><div class="card"><slot /></div></main>` wrapper
- Global styles (new design)

### Pages to create

| SvelteKit route | Astro page |
|---|---|
| `src/routes/+page.svelte` | `src/pages/index.astro` |
| `src/routes/projects/+page.svelte` | `src/pages/projects.astro` |
| `src/routes/contact/+page.svelte` | `src/pages/contact.astro` |
| `src/routes/resume/+page.svelte` | `src/pages/resume.astro` |
| `src/routes/blogs/+page.svelte` | `src/pages/blogs/index.astro` |
| `src/routes/blogs/[slug]/+page.svelte` | `src/pages/blogs/[slug].astro` |

**Removed pages:**
- Skills page — not migrating

### Page conversion notes

Each page is mostly HTML + CSS with minimal JS. The conversion is largely mechanical:

- Replace `<script>` data declarations with frontmatter code fences (`---`)
- Replace `{#each}` / `{#if}` with Astro template syntax (JS expressions in `{}`)
- Replace `<svelte:head>` with Astro's `<head>` in the layout or per-page `<head>` slot
- Replace `<style lang="scss">` with plain `<style>` (see Phase 6)
- Move data files (`projects.js`) to `src/data/`

### Projects page (simplified)

Only the first 3 projects are kept (all have live links):
- **Barbara Siegel Carlson Poet** — barbarasiegelcarlson.com
- **Tyler Taylor Composer** — tylertaylorcomposer.netlify.app
- **The Body Knows Somatics** — thebodyknowssomatics.com

Changes from the current design:
- Replace GIFs with static images (screenshots)
- Remove the hover-to-reveal description effect
- Show text descriptions statically alongside images
- Simple list layout, no overlay interaction

### Blog list page (`src/pages/blogs/index.astro`)

- Use `getCollection('blog')` to fetch all posts
- Sort by pinned first, then by date (port `sortBlogs` logic)
- Render the list with tags, pins, and staggered animation delays

### Blog post page (`src/pages/blogs/[slug].astro`)

- Use `getCollection('blog')` + `getStaticPaths()` to generate routes
- Render markdown content via `<Content />` component from the collection entry
- Wrap in the blog article layout with back button, date, and scroll-to-top button

---

## Phase 4: Components

### Components to convert to `.astro`

| Svelte component | Astro component |
|---|---|
| `Header.svelte` | `src/components/Header.astro` |
| `Pin.svelte` | `src/components/Pin.astro` |
| `githubLogo.svelte` | `src/components/GithubLogo.astro` |

**Removed components:**
- `ThemeToggle.svelte`, `Sun.svelte`, `Moon.svelte` — no theme toggle in new design

### Components that need special handling

**TableOfContentsHeader.svelte** — Replace with a rehype plugin (`rehype-slug` + `rehype-autolink-headings`) in `astro.config.mjs`. The copy-link-on-click behavior can be added via a small inline `<script>` on the blog post page.

**Code.svelte** — Delete entirely. Astro's built-in Shiki handles syntax highlighting. Configure the theme in `astro.config.mjs`. For highlighted lines (the `> ` prefix convention), use Shiki's line highlighting syntax in code fences or a custom rehype plugin.

---

## Phase 5: Styles

### Full style rework

All styles will be rewritten from scratch with a new theme and aesthetic. This means:

- No need to port existing SCSS or CSS from the Svelte site
- `reset.css` can be kept or replaced with a preferred reset
- Font Awesome CSS files — keep in `src/styles/css/` if still using FA icons, import in layout
- Scoped `<style>` blocks in `.astro` components — Astro scopes these by default
- The devicon CDN link is only needed if the skills page equivalent exists elsewhere; otherwise remove it

### Blog post styles

The blog post page (`[slug].astro`) needs styles for markdown-rendered content (headings, lists, code blocks, blockquotes, tables, etc.). In Astro, use `<style is:global>` or scope under a wrapper class with `:global()` selectors where needed. These should be written fresh as part of the new design.

### No theme toggle

There is no light/dark toggle in the new design. If a theming mechanism is added later, it won't be a simple light/dark switch. No FOUC prevention script is needed for now.

---

## Phase 6: Book List Search (Vanilla JS)

The book list is the one interactive feature. In Astro:

1. The `book-list.md` content renders as static HTML (a `<ul>` of `<li>` items)
2. Add a `<script>` block on the blog post page (or conditionally when `searchable` is true) that:
   - Injects a search `<input>` before the list
   - Filters `<li>` elements by text content on input
   - Uses `display: none` to hide non-matching items

This is simpler than the current approach (which filters the markdown source before rendering) and works entirely client-side on the already-rendered HTML.

---

## Phase 7: Images and Assets

- Move `src/assets/images/` to `src/assets/` (Astro convention)
- Use Astro's `<Image />` component for optimized images where beneficial (headshot, project screenshots)
- Replace project GIFs with static screenshots for the 3 kept projects
- Remove unused GIFs (`pebbble-homepage.gif`, `postcard-homepage.gif`, `lexiloop-homepage.gif`)
- Font files in `src/styles/webfonts/` — keep in place, referenced by Font Awesome CSS

---

## Phase 8: Code Highlighting Details

### Shiki configuration

In `astro.config.mjs`. Pick a single theme that fits the new site aesthetic (no dual light/dark needed):

```js
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark', // or whichever suits the new design
    },
  },
});
```

### Line highlighting convention

The current codebase uses a `> ` prefix to mark highlighted lines in code blocks. This convention is parsed by `Code.svelte`. Options:

1. **Convert to Shiki syntax** — Update all code blocks in blog posts to use Shiki's `{1,3-5}` line highlighting syntax in the code fence meta
2. **Custom rehype plugin** — Write a small rehype plugin that detects the `> ` prefix and converts it to Shiki-compatible highlighting
3. **Post-render script** — Handle it client-side

Option 1 is cleanest if there aren't many occurrences. Audit the blog posts to count how many code blocks use this convention.

---

## Phase 9: Cleanup and Verification

1. Delete all Svelte-specific files:
   - `svelte.config.js`
   - All `.svelte` files
   - `src/routes/` directory (replaced by `src/pages/`)
   - `src/routes/blogs/articles/index.js` and all JS blog exports
2. Remove Svelte dependencies from `package.json`:
   - `svelte`, `@sveltejs/kit`, `@sveltejs/adapter-auto`
   - `svelte-markdown`, `svelte-highlight`, `svelte-preprocess`
   - `@neoconfetti/svelte`, `eslint-plugin-svelte`, `prettier-plugin-svelte`
   - `node-sass`, `sass`
   - The mysterious `"20": "^3.1.9"` dependency
3. Remove unused assets:
   - Project GIFs for removed projects (`pebbble-homepage.gif`, `postcard-homepage.gif`, `lexiloop-homepage.gif`)
   - `the-body-knows.gif` (replace with static image)
   - Devicon CDN link (if no longer used without skills page)
4. Update Netlify config if needed (build command: `astro build`, publish directory: `dist/`)
5. Verify all routes work:
   - `/` (home)
   - `/projects`
   - `/contact`
   - `/resume`
   - `/blogs`
   - `/blogs/[slug]` for each post
   - Confirm `/skills` returns 404 or redirects
6. Test book list search
7. Test syntax highlighting in blog posts
8. Check responsive breakpoints

---

## File Structure (Target)

```
src/
  assets/
    images/
  components/
    Header.astro
    Pin.astro
    GithubLogo.astro
  content/
    blog/
      book-list.md
      tomato-soup.md
      blog-guide.md
      regex101.md
      zsh-theme-customization.md
      career-planning-in-the-age-of-ai.md
      ... (all blog posts as .md with frontmatter)
  content.config.ts
  data/
    projects.js
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    projects.astro
    contact.astro
    resume.astro
    blogs/
      index.astro
      [slug].astro
  styles/
    reset.css
    ... (new styles, written from scratch)
    css/          (Font Awesome)
    webfonts/     (Font Awesome fonts)
public/
  favicon.ico
  robots.txt
astro.config.mjs
package.json
```

---

## Migration Order (Recommended)

1. Scaffold Astro project, install deps, create config
2. Create `BaseLayout.astro` with head and header (styles will be reworked later)
3. Convert static pages (home, projects, contact, resume)
4. Set up content collection schema and convert blog posts to `.md`
5. Build blog list page and blog post page
6. Implement book list search with vanilla JS
7. Configure Shiki and heading anchor links
8. Clean up old Svelte files and dependencies
9. Rework all styles with new theme/aesthetic
10. Replace project GIFs with static screenshots
11. Test everything, deploy to Netlify
