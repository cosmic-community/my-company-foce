# The Rishiv Investments

![App Preview](https://imgix.cosmicjs.com/071ff2e0-7151-11f1-a87f-d72293b1048a-autopilot-photo-1472099645785-5658abf4ff4e-1782472825096.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A premium, institutional-grade investment website for **The Rishiv Investments** — inspired by the gravitas of Edelweiss Financial Services, elevated with immersive Three.js shader animations, a deep blue-and-gold visual identity, and full integration with [Cosmic](https://www.cosmicjs.com).

## Features

- 🌊 **Immersive Three.js Hero** — Full-screen GLSL shader with liquid-light caustic waves, 4000-particle drift system, and a slowly rotating wireframe icosahedron
- 🪟 **Glass-morphism Business Grid** — Our Businesses section with backdrop-blur panels and elegant hover lifts
- 📊 **Animated Stat Counters** — AUM, years of experience, and client counts that count up when scrolled into view
- 💼 **Dynamic Content** — Services, Team Members, Case Studies, and Testimonials pulled live from Cosmic
- 🎯 **Scroll-snap Storytelling** — Full-page snap sections with navigation dots and IntersectionObserver fade transitions
- 📱 **Fully Responsive** — Looks stunning on desktop, tablet, and mobile
- ⚡ **Server-rendered with Next.js 16** — Fast, SEO-friendly, type-safe

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3e5fed00113b4e40c8d0f0&clone_repository=6a3e616400113b4e40c8d134)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a professional services company with services offered, team members (including photos and bios), case studies, and client testimonials."

### Code Generation Prompt

> "Build a complete premium investment website for 'RISHIV INVESTMENTS' — inspired by the structure and gravitas of Edelweiss Financial Services, elevated with immersive Three.js 3D shader animations and a modern blue-toned visual identity. The site must feel institutional, internationally credible, and visually stunning. Include a Hero section 'Where Capital Finds Direction', an 'Our Businesses' diversified portfolio grid, animated stat counters (₹2,400 Cr+ AUM, 18+ Years, 12,000+ Clients), scroll-snap slides with navigation dots, and glass-morphism business cards. Design notes: SEBI Registered NSE and BSE stock broker, AMFI Certified ARN Holder (318094), IRDA Approved Insurance Advisor, TATA AIA Senior Life Planner, 23 years of experience in distribution of financial investment products."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js](https://threejs.org)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `services`, `team-members`, `case-studies`, and `testimonials` object types

### Installation

```bash
bun install
bun dev
```

Create environment variables in your hosting platform (these are provided automatically in Cosmic deployments):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all services ordered by display_order
const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single case study by slug
const { object: caseStudy } = await cosmic.objects
  .findOne({ type: 'case-studies', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from four object types:

- **services** — Investment service offerings with descriptions and accent colors
- **team-members** — Advisors with photos, credentials, and bios
- **case-studies** — Client success stories with challenge/solution/result
- **testimonials** — Client quotes with ratings

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel** — Connect your repo, set the env vars, deploy
- **Netlify** — Works out of the box with the Next.js runtime

<!-- README_END -->