# MDV - Astro + Payload CMS Static Site

A modern static website built with Astro and Payload CMS, featuring weekly data updates and automatic rebuilds on Vercel.

## Project Overview

This project combines the power of Astro's static site generation with Payload CMS's flexible content management capabilities. The site consists of 10 total pages, with 7 dynamic pages that update weekly through automated rebuilds triggered by Payload CMS webhooks.

## Tips & Useful Commands

pnpm astro preferences disable devToolbar

### Architecture

- **Frontend**: Astro (Static Site Generation)
- **Backend**: Payload CMS (Headless CMS)
- **Hosting**: Vercel with webhook-triggered rebuilds
- **Styling**: Tailwind CSS v4
- **Framework Integration**: React components support
- **Package Manager**: pnpm

### Key Features

- Static site generation for optimal performance
- Weekly automated content updates
- Webhook-triggered rebuilds on content changes
- React component integration within Astro
- Responsive design with Tailwind CSS
- SEO-optimized static pages

## Technology Stack

### Frontend

- **Astro 5.12.4** - Static Site Generator
- **React 19.1.1** - Component framework for dynamic elements
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **TypeScript** - Type safety and better developer experience

### Backend (Planned)

- **Payload CMS** - Headless Content Management System
- **MongoDB/PostgreSQL** - Database for content storage

### Deployment & Infrastructure

- **Vercel** - Hosting platform with automatic deployments
- **GitHub** - Version control and CI/CD integration
- **Webhooks** - Automated rebuild triggers

## Project Structure

```
mdv/
├── src/
│   ├── layouts/
│   │   └── layout.astro          # Base layout component
│   ├── pages/
│   │   └── index.astro           # Homepage
│   └── styles/
│       └── global.css            # Global styles with Tailwind imports
├── public/
│   └── favicon.svg               # Site favicon
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## Installation & Setup

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Git

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mdv
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:4321
   ```

### Environment Configuration

Create a `.env` file in the root directory for environment variables:

```env
# Payload CMS Configuration (when implemented)
PAYLOAD_SECRET=your-payload-secret
DATABASE_URI=your-database-connection-string

# Vercel Configuration
VERCEL_WEBHOOK_SECRET=your-webhook-secret
```

## Development Workflow

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build static site for production
- `pnpm preview` - Preview production build locally
- `pnpm astro` - Run Astro CLI commands

### Adding New Pages

1. Create new `.astro` files in `src/pages/`
2. Use the base layout for consistency:

   ```astro
   ---
   import Layout from '../layouts/Layout.astro'
   ---

   <Layout title="Page Title">
   	<!-- Page content -->
   </Layout>
   ```

### Component Development

- Place reusable components in `src/components/`
- Use React components for interactive elements
- Leverage Astro components for static content

## Payload CMS Integration (Planned Implementation)

### Content Structure

The CMS will manage content for 7 dynamic pages that update weekly:

1. **Weekly Updates Page** - Latest announcements and news
2. **Events Calendar** - Upcoming events and activities
3. **Team Directory** - Staff and member information
4. **Resources Library** - Downloadable resources and documents
5. **Gallery** - Photo and media galleries
6. **Blog/News** - Article content and updates
7. **Contact Information** - Dynamic contact details and forms

### API Integration

```javascript
// Example: Fetching weekly content
const response = await fetch(`${PAYLOAD_API_URL}/api/weekly-content`)
const weeklyData = await response.json()
```

### Content Types

```typescript
// Example content schema
interface WeeklyContent {
	id: string
	title: string
	content: string
	publishDate: Date
	featured: boolean
	category: string
}
```

## Deployment Process

### Vercel Configuration

The project is configured for automatic deployment on Vercel with the following setup:

1. **Automatic Deployments**: Connected to GitHub for CI/CD
2. **Build Command**: `pnpm build`
3. **Output Directory**: `dist/`
4. **Node.js Version**: 18.x or 20.x

### Webhook-Triggered Rebuilds

Weekly content updates trigger automatic rebuilds through:

1. **Content Update**: Editor updates content in Payload CMS
2. **Webhook Trigger**: Payload sends webhook to Vercel
3. **Rebuild Process**: Vercel rebuilds and redeploys the site
4. **Cache Invalidation**: CDN cache is updated with new content

### Environment Variables (Vercel)

Configure these in your Vercel dashboard:

```
PAYLOAD_SECRET=your-payload-secret
DATABASE_URI=your-database-connection-string
VERCEL_WEBHOOK_SECRET=your-webhook-secret
```

## Weekly Update Process

### Automated Workflow

1. **Monday Morning**: Content team updates weekly information in Payload CMS
2. **Webhook Trigger**: CMS automatically triggers Vercel rebuild
3. **Build Process**: Astro generates static pages with new content
4. **Deployment**: Updated site goes live automatically
5. **Verification**: Team receives deployment notifications

### Manual Override

For urgent updates outside the weekly schedule:

1. Access Payload CMS admin panel
2. Update relevant content
3. Trigger manual rebuild via webhook
4. Monitor deployment in Vercel dashboard

## Configuration Files

### Astro Configuration (`astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()]
	}
})
```

### TypeScript Configuration (`tsconfig.json`)

```json
{
	"extends": "astro/tsconfigs/strict",
	"include": [".astro/types.d.ts", "**/*"],
	"exclude": ["dist"],
	"compilerOptions": {
		"jsx": "react-jsx",
		"jsxImportSource": "react"
	}
}
```

## Performance Optimization

### Build Optimization

- Static site generation for fast loading
- Automatic code splitting
- Optimized asset bundling
- Image optimization (when implemented)

### CDN and Caching

- Vercel Edge Network for global distribution
- Static asset caching
- Dynamic content caching strategies
- Cache invalidation on content updates

## Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clear cache and rebuild
   rm -rf dist/ .astro/
   pnpm build
   ```

2. **Development Server Issues**

   ```bash
   # Restart dev server
   pnpm dev --force
   ```

3. **Dependency Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules/ pnpm-lock.yaml
   pnpm install
   ```

### Debugging

- Check Vercel deployment logs for build errors
- Monitor webhook delivery in Payload CMS
- Use browser dev tools for client-side issues
- Enable Astro debugging: `DEBUG=astro:* pnpm dev`

## Contributing

### Development Guidelines

1. Follow TypeScript best practices
2. Use semantic commit messages
3. Test builds locally before pushing
4. Document new features and changes

### Code Style

- Use Prettier for code formatting
- Follow Astro and React conventions
- Maintain consistent file structure
- Write descriptive component names

## License

[Add your license information here]

## Support

For technical support or questions:

- Create an issue in the repository
- Check Astro documentation: https://docs.astro.build
- Review Payload CMS docs: https://payloadcms.com/docs

---

**Project Status**: Active Development
**Last Updated**: July 2025
**Version**: 0.0.1
