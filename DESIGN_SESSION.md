# only-us — Design Session
**Session:** ONLYUS | **Date:** 2026-05-09

---

## App Brief

**Type:** Couples private memory app  
**Users:** 2 people (a couple) only  
**Core use case:** Store shared memories, photos, diary entries, bucket list together  
**Vibe:** Mobile-first, intimate/romantic, warm soft tones — personal not social-media-like

---

## Key Screens

| Screen | Route |
|--------|-------|
| Login | `/login` |
| Home | `/` |
| Memories | `/memories` |
| Memory Detail | `/memories/[id]` |
| Add Memory | `/memories/new` |
| Diary | `/diary` |
| Timeline | `/timeline` |
| Bucket List | `/bucket-list` |
| Favourites | `/favourites` |

---

## Design System (Generated)

### Style
**Soft UI Evolution** — evolved soft UI, better contrast, modern aesthetics, subtle depth, accessibility-focused, improved shadows, hybrid. WCAG AA+.

### Colors
| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#E11D48` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#FB7185` | `--color-secondary` |
| Accent/CTA | `#EA580C` | `--color-accent` |
| Background | `#FFF1F2` | `--color-background` |
| Foreground | `#881337` | `--color-foreground` |
| Muted | `#F0ECF2` | `--color-muted` |
| Border | `#FECDD3` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |

*Romantic rose + warm blush + soft pink borders*

### Typography
| Role | Font | Style |
|------|------|-------|
| Headings | **Caveat** | Handwritten, personal, charming |
| Body | **Quicksand** | Warm, friendly, casual |

```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
```

### Effects
- Improved shadows (softer than flat, clearer than neumorphism)
- Transitions: 200–300ms
- Focus visible, WCAG AA/AAA

---

## 3 Open Questions (Awaiting Answers)

**Q1 — Photo-first or text-first?**  
Memories screen: big photo album (grid/masonry) OR journal-style (text cards + small thumbnail)?  
→ *Affects overall visual hierarchy*

**Q2 — Shared or personal content?**  
Fully shared (both see same everything) OR mixed (diary = private, memories = shared)?  
→ *Affects auth model + data structure*

**Q3 — Home screen feeling?**  
- **A** — Last memory (big romantic hero card)  
- **B** — Daily snapshot (today's date + "on this day" + quick-add)  
- **C** — Dashboard (counts: memories, days together, next bucket list item)  

---

## Stack (existing)
- Next.js 14.2.3, pages router, Tailwind CSS, Framer Motion, Lucide React
- Supabase (DB + Storage) — `nymazemxiqetxxwcwgew.supabase.co`
- Auth: PIN-based (`onlyus2025`), httpOnly cookie, Next.js middleware
- Deployed: `only-us-v2.vercel.app`

## Deploy Command
```bash
cd ~/only-us
npm run build
vercel build --prod --yes --scope rachitsharma123s-projects
vercel deploy --prebuilt --prod --yes --scope rachitsharma123s-projects
```

---

## Next Steps
1. Answer the 3 questions above
2. Run full page-by-page design
3. Build components (bottom nav, memory card, diary entry, bucket item)
4. Redesign each screen with new design system
