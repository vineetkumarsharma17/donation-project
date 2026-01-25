# BookHope NGO - Single Page Website

A modern, fully responsive single-page NGO website built with React, featuring smooth scroll navigation, beautiful animations, and a premium design.

## 🌟 Features

### Navigation
- **Sticky Navigation Bar** with smooth scroll to sections
- **Animated Active Underline** that slides between menu items
- **Mobile Hamburger Menu** with slide-in animation
- **Scroll Spy** - automatically highlights active section while scrolling

### Page Sections

#### 1. **Hero Section** (`#home`)
- Full-width background image with green overlay
- Animated text content (fade in from left)
- Floating donation card (slide in from right)
- Statistics display with icons
- Call-to-action buttons
- Scroll indicator

#### 2. **About Us Section** (`#about`)
- Image + text split layout
- Mission, Vision, and Values cards
- Scroll-triggered fade and slide animations
- Hover effects on value cards

#### 3. **Programs Section** (`#programs`)
- Grid of program cards with icons
- Hover lift animations
- Stats display for each program
- Call-to-action banner at bottom

#### 4. **Blog Section** (`#blog`)
- Latest 3 blog cards
- Image zoom on hover
- Category badges
- Author and date metadata
- "Read More" buttons with underline animation

#### 5. **Events Section** (`#events`)
- Upcoming events cards
- Date badges
- Event details (time, location, attendees)
- **Animated Registration Modal** that opens on button click
- Form validation

#### 6. **Gallery Section** (`#gallery`)
- Responsive image grid
- Hover overlay with zoom icon
- **Lightbox Modal** for full-screen image viewing
- Click to open, ESC to close

#### 7. **Contact Section** (`#contact`)
- Contact information cards with icons
- Contact form with validation
- Animated input focus states
- Success animation on form submission

#### 8. **Get Involved Section** (`#get-involved`)
- Action cards (Donate Books, Volunteer, Join Events, Spread Awareness)
- Icon animations on hover
- Glow effects on buttons
- Call-to-action footer

## 🎨 Design Theme

- **Primary Colors**: Green (#2d5016, #3d6b1f) and Yellow (#ffd700, #ffed4e)
- **Typography**: Inter font family (Google Fonts)
- **Animations**: Framer Motion for smooth, premium animations
- **Responsive**: Mobile-first design, fully responsive across all devices

## 🚀 Technologies Used

- **React** - UI framework
- **Framer Motion** - Animation library
- **react-scroll** - Smooth scrolling navigation
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features

### Smooth Scroll Navigation
- All navbar links scroll smoothly to their respective sections
- No page reloads - entire experience on one page
- Offset adjusted for sticky navbar (80px)

### Animations
- **Scroll-triggered animations** - sections fade and slide in when scrolled into view
- **Stagger animations** - cards appear one after another
- **Hover effects** - lift, glow, scale, and color transitions
- **Modal animations** - smooth entrance and exit
- **Button animations** - ripple effects and scale transforms

### Mobile Optimization
- Hamburger menu with morphing icon (menu ↔ close)
- Full-screen mobile menu with staggered item animations
- Touch-friendly buttons and navigation
- Responsive grid layouts

### SEO Optimization
- Semantic HTML5 structure (`<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`)
- Proper heading hierarchy (H1, H2, H3)
- Meta tags for description and keywords
- Open Graph tags for social media sharing
- Twitter Card tags
- Alt text for all images
- ARIA labels for accessibility

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎭 Animation Details

### Hero Section
- Text fades in from left (1s duration)
- Donation card slides in from right (1s duration, 0.4s delay)
- Stats appear with stagger (0.7s delay)
- Scroll indicator pulses infinitely

### Section Entry Animations
- Fade in + slide up (0.6s duration)
- Triggered when section enters viewport
- Only plays once (not on every scroll)

### Card Animations
- Stagger children (0.15s between each)
- Hover: lift up 10px, increase shadow
- Smooth transitions (0.4s ease)

### Modal Animations
- Backdrop fades in
- Content scales from 0.8 to 1 with slight upward movement
- Exit reverses the animation

## 🔧 Customization

### Colors
Update colors in component CSS files:
- Primary Green: `#2d5016`, `#3d6b1f`
- Yellow: `#ffd700`, `#ffed4e`

### Content
Edit content in respective component files:
- `HeroSectionScroll.jsx` - Hero content
- `AboutSectionScroll.jsx` - About content
- `ProgramsSectionScroll.jsx` - Programs
- `BlogSectionScroll.jsx` - Blog posts
- `EventsSectionScroll.jsx` - Events
- `GallerySectionScroll.jsx` - Gallery images
- `ContactSectionScroll.jsx` - Contact info
- `GetInvolvedSectionScroll.jsx` - Get Involved actions

### Images
Replace image URLs in components with your own:
- Use high-quality images (recommended: 1600px width for hero)
- Optimize images for web (use WebP format when possible)
- Add proper alt text for accessibility

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 File Structure

```
src/
├── components/
│   ├── ScrollNavbar.jsx          # Sticky navbar with scroll navigation
│   ├── ScrollNavbar.css
│   ├── HeroSectionScroll.jsx     # Hero section with donation card
│   ├── HeroSectionScroll.css
│   ├── AboutSectionScroll.jsx    # About section
│   ├── AboutSectionScroll.css
│   ├── ProgramsSectionScroll.jsx # Programs section
│   ├── ProgramsSectionScroll.css
│   ├── BlogSectionScroll.jsx     # Blog section
│   ├── BlogSectionScroll.css
│   ├── EventsSectionScroll.jsx   # Events section with modal
│   ├── EventsSectionScroll.css
│   ├── GallerySectionScroll.jsx  # Gallery with lightbox
│   ├── GallerySectionScroll.css
│   ├── ContactSectionScroll.jsx  # Contact form
│   ├── ContactSectionScroll.css
│   ├── GetInvolvedSectionScroll.jsx  # Get Involved section
│   ├── GetInvolvedSectionScroll.css
│   └── Footer.jsx                # Footer component
├── pages/
│   ├── SinglePageHome.jsx        # Main page component
│   └── SinglePageHome.css
├── App.jsx                       # App entry point
├── main.jsx                      # React entry point
└── index.css                     # Global styles
```

## 🎨 Design Principles

1. **Modern & Premium** - Vibrant colors, smooth animations, glassmorphism effects
2. **User-Friendly** - Intuitive navigation, clear CTAs, responsive design
3. **Performance** - Optimized animations, lazy loading, efficient rendering
4. **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
5. **SEO-Friendly** - Meta tags, proper headings, clean URLs

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the 'dist' folder to GitHub Pages
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please contact: info@bookhope.org

---

**Built with ❤️ for making a difference in children's education**
