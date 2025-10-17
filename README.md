# Portfolio v3 - Modern React Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features dynamic project showcases, RSS blog integration, and a functional contact form.

## Features

### Core Functionality
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile
- **Modern Tech Stack** - React 18, Vite, Tailwind CSS
- **Client-side Routing** - Fast navigation with React Router
- **Performance Optimized** - Lazy loading, code splitting, and optimized assets

### Portfolio Sections
- **Hero Section** - Professional introduction with call-to-actions
- **Skills Carousel** - Animated showcase of technical skills
- **Featured Projects** - Curated project highlights with detailed modals
- **Blog Integration** - Automatic RSS feed aggregation from multiple blogs
- **Contact Form** - Functional email integration with EmailJS

### Projects Page
- **Dynamic Filtering** - Filter by category, status, and technology
- **Search Functionality** - Real-time search across project titles and descriptions
- **Project Details** - Modal views with galleries, tech stacks, and project info
- **Status Tracking** - Visual indicators for completed, ongoing, and planned projects

### Blog System
- **RSS Integration** - Automatic content fetching from external blogs
- **Multiple Feed Support** - Aggregate content from multiple sources
- **Error Handling** - Robust fallback systems for feed failures
- **Auto-refresh** - Content updates automatically

### Contact System
- **EmailJS Integration** - Direct email sending to your inbox
- **Form Validation** - Client-side validation with helpful error messages
- **Success States** - Professional user feedback and loading indicators

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Services
- **EmailJS** - Email service for contact form
- **RSS2JSON** - RSS feed processing
- **AllOrigins** - CORS proxy for feed fallbacks

## Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/starkSV/starkSV-new.git
cd starkSV-new

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create `.env.local` file in the root directory:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Configuration

### EmailJS Setup
1. Create an account at [EmailJS](https://emailjs.com)
2. Set up Gmail service
3. Create email template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Update credentials in `src/pages/HomePage.jsx`

### Project Data
Update `public/projects.json` with your project information:
```json
[
  {
    "id": "project-id",
    "title": "Project Title",
    "shortDesc": "Brief description",
    "fullDesc": "Detailed description",
    "image": "/assets/project-banner.jpg",
    "tags": ["React", "Node.js"],
    "category": "Web Application",
    "status": "completed",
    "github": "https://github.com/user/repo",
    "demo": "https://demo-url.com"
  }
]
```

### Blog Feeds
Update `public/blogs.json` with your RSS feeds:
```json
[
  {
    "title": "Blog Name",
    "description": "Blog description", 
    "image": "/assets/blog-logo.png",
    "link": "https://your-blog.com",
    "rss": "https://your-blog.com/feed"
  }
]
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation with routing
│   ├── Hero.jsx        # Landing section
│   ├── Skills.jsx      # Skills carousel
│   ├── FeaturedProjects.jsx
│   ├── Blogs.jsx       # RSS integration
│   ├── Contact.jsx     # EmailJS form
│   └── Footer.jsx
├── pages/              # Route components
│   ├── HomePage.jsx    # Main landing page
│   ├── ProjectsPage.jsx # Projects showcase
│   └── BlogPage.jsx    # Blog placeholder
└── App.jsx             # Router setup

public/
├── projects.json       # Project data
├── blogs.json         # RSS feed configuration
└── assets/            # Images and files
```

## Build and Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## Performance Features

- **Code Splitting** - Lazy loading for routes
- **Image Optimization** - Proper loading attributes and fallbacks
- **Bundle Optimization** - Vite's automatic optimizations
- **CSS Purging** - Tailwind removes unused styles
- **Error Boundaries** - Graceful error handling

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Shekhar Vaidya - [shekhar@tech-latest.com](mailto:shekhar@tech-latest.com)

Project Link: [https://github.com/starkSV/starkSV-new](https://github.com/starkSV/starkSV-new)

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS](https://emailjs.com/)
- [RSS2JSON](https://rss2json.com/)