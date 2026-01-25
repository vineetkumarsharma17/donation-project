# Component Architecture Overview

## 📐 Architecture Pattern

This is a **single-page application (SPA)** using:
- **react-scroll** for smooth navigation
- **Framer Motion** for animations
- **Component-based architecture** for maintainability

## 🏗️ Component Hierarchy

```
App.jsx
└── SinglePageHome.jsx
    ├── ScrollNavbar.jsx (sticky, always visible)
    ├── Main Content (scrollable sections)
    │   ├── HeroSectionScroll.jsx (#home)
    │   ├── AboutSectionScroll.jsx (#about)
    │   ├── ProgramsSectionScroll.jsx (#programs)
    │   ├── BlogSectionScroll.jsx (#blog)
    │   ├── EventsSectionScroll.jsx (#events)
    │   ├── GallerySectionScroll.jsx (#gallery)
    │   ├── ContactSectionScroll.jsx (#contact)
    │   └── GetInvolvedSectionScroll.jsx (#get-involved)
    └── Footer.jsx
```

## 📦 Component Details

### 1. ScrollNavbar.jsx
**Purpose**: Sticky navigation with smooth scroll links

**Key Features**:
- Scroll spy (tracks active section)
- Animated underline indicator
- Mobile hamburger menu
- Smooth scroll on click

**State**:
- `activeSection` - Currently active section ID
- `isMobileMenuOpen` - Mobile menu open/closed
- `underlineStyle` - Position and width of active underline

**Props**: None (self-contained)

**Dependencies**: react-scroll, framer-motion, lucide-react

---

### 2. HeroSectionScroll.jsx
**Purpose**: Hero section with donation card

**Key Features**:
- Full-width background image
- Green gradient overlay
- Animated text content (left)
- Floating donation card (right)
- Statistics display
- Scroll indicator

**Animations**:
- Text: fade in from left (1s)
- Card: slide in from right (1s, 0.4s delay)
- Stats: stagger animation (0.7s delay)
- Scroll indicator: infinite pulse

**State**: None (static content)

**Props**: None

---

### 3. AboutSectionScroll.jsx
**Purpose**: About section with mission/vision/values

**Key Features**:
- Image + text split layout
- Mission/Vision/Values cards
- Scroll-triggered animations
- Hover effects on cards

**Animations**:
- Section entry: fade + slide up
- Cards: stagger (0.2s between each)
- Card hover: lift + border color change

**State**: None

**Props**: None

**Hooks**: `useInView` for scroll detection

---

### 4. ProgramsSectionScroll.jsx
**Purpose**: Display NGO programs

**Key Features**:
- Grid of program cards (4 programs)
- Icons for each program
- Stats display
- CTA banner at bottom

**Animations**:
- Cards: stagger entry (0.15s)
- Card hover: lift 10px + shadow increase
- Icon hover: scale + rotate

**State**: None

**Props**: None

**Data**: Programs array (can be moved to external file)

---

### 5. BlogSectionScroll.jsx
**Purpose**: Latest blog posts

**Key Features**:
- 3 blog cards
- Image with category badge
- Author and date metadata
- "Read More" button

**Animations**:
- Cards: stagger entry
- Card hover: lift up
- Image hover: zoom in
- Button hover: gap increase

**State**: None

**Props**: None

**Data**: Blogs array (can be fetched from API)

---

### 6. EventsSectionScroll.jsx
**Purpose**: Upcoming events with registration

**Key Features**:
- Event cards with details
- Registration modal
- Form validation
- Date badges

**Animations**:
- Cards: scale from 0.9 to 1
- Card hover: lift up
- Modal: backdrop fade + content scale

**State**:
- `selectedEvent` - Currently selected event for modal

**Props**: None

**Modals**: Registration form modal

---

### 7. GallerySectionScroll.jsx
**Purpose**: Image gallery with lightbox

**Key Features**:
- Responsive grid (3 columns)
- Hover overlay with zoom icon
- Lightbox for full-screen viewing
- Click to open, ESC to close

**Animations**:
- Images: stagger entry (0.1s)
- Image hover: scale 1.05
- Overlay: fade in on hover
- Lightbox: backdrop fade + image scale

**State**:
- `selectedImage` - Currently selected image for lightbox

**Props**: None

**Data**: Images array with URLs and captions

---

### 8. ContactSectionScroll.jsx
**Purpose**: Contact information and form

**Key Features**:
- Contact info cards (email, phone, address)
- Contact form with validation
- Success animation
- Animated input focus

**Animations**:
- Info section: slide from left
- Form section: slide from right
- Input focus: border color + shadow + lift
- Submit success: icon change + color

**State**:
- `formData` - Form field values
- `isSubmitted` - Success state

**Props**: None

**Form Handling**: Basic validation, can be connected to backend

---

### 9. GetInvolvedSectionScroll.jsx
**Purpose**: Call-to-action for involvement

**Key Features**:
- Action cards (4 types)
- Icon animations
- Glow effects on buttons
- CTA footer

**Animations**:
- Cards: stagger entry
- Card hover: lift + shadow + border glow
- Icon hover: scale + rotate
- Button hover: scale + glow

**State**: None

**Props**: None

**Data**: Actions array (donate, volunteer, events, awareness)

---

### 10. SinglePageHome.jsx
**Purpose**: Main page container

**Key Features**:
- Wraps all sections with `<Element>` from react-scroll
- Provides scroll targets for navigation
- Includes navbar and footer

**Structure**:
```jsx
<ScrollNavbar />
<main>
  <Element name="home"><HeroSectionScroll /></Element>
  <Element name="about"><AboutSectionScroll /></Element>
  // ... other sections
</main>
<Footer />
```

**Props**: None

**Dependencies**: react-scroll (Element component)

---

## 🎨 Styling Architecture

### CSS Organization
Each component has its own CSS file:
- `ComponentName.jsx` → `ComponentName.css`

### Naming Convention
- BEM-like naming: `.component-name__element--modifier`
- Example: `.hero-section-scroll`, `.hero-text-content`, `.hero-title`

### Responsive Strategy
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Grid layouts that collapse on mobile

### Animation Strategy
- Framer Motion for complex animations
- CSS transitions for simple hover effects
- `useInView` hook for scroll-triggered animations

---

## 🔄 Data Flow

### Static Content
Currently all content is hardcoded in components. To make it dynamic:

1. **Create data files**:
```javascript
// src/data/programs.js
export const programs = [
  { id: 1, title: "...", description: "..." },
  // ...
];
```

2. **Import and use**:
```javascript
import { programs } from '../data/programs';
```

3. **Map over data**:
```javascript
{programs.map(program => (
  <ProgramCard key={program.id} {...program} />
))}
```

### Future Enhancements
- Connect to CMS (Contentful, Strapi)
- Fetch from API
- Use React Context for global state
- Add form submission to backend

---

## 🎯 Performance Optimizations

### Current Optimizations
- Lazy loading images (native `loading="lazy"`)
- CSS animations (GPU-accelerated)
- Framer Motion optimizations
- Minimal re-renders (no unnecessary state)

### Potential Improvements
- Code splitting with `React.lazy()`
- Image optimization (WebP format)
- CDN for images
- Service worker for caching

---

## 🧪 Testing Recommendations

### Component Testing
```javascript
// Test scroll navigation
- Click navbar item → section scrolls into view
- Scroll page → active item updates

// Test animations
- Scroll to section → animations trigger
- Hover over card → lift effect works

// Test modals
- Click event register → modal opens
- Click gallery image → lightbox opens
```

### Responsive Testing
- Desktop (1920px, 1440px, 1024px)
- Tablet (768px, 834px)
- Mobile (375px, 414px, 390px)

### Accessibility Testing
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader compatibility
- Color contrast ratios
- Focus indicators

---

## 📚 Further Reading

- [Framer Motion Docs](https://www.framer.com/motion/)
- [react-scroll Docs](https://github.com/fisshy/react-scroll)
- [React Best Practices](https://react.dev/learn)
- [Web Accessibility](https://www.w3.org/WAI/)

---

**Happy Coding! 🚀**
