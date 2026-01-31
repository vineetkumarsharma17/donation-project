# 🚀 Deployment Guide - आपकी Website को Live कैसे करें

## समस्या क्यों आ रही थी?

आपकी website एक **React + Vite** application है। यह सीधे HTML की तरह काम नहीं करती। इसे पहले **build** करना पड़ता है, फिर deploy करना होता है।

---

## ✅ Solution 1: Vercel (सबसे आसान - Recommended)

### Steps:

1. **Vercel पर जाएं**: https://ercel.com
2. **GitHub से Sign up करें**
3. **Import Project** पर क्लिक करें
4. अपना GitHub repository select करें
5. **Deploy** पर क्लिक करें

**बस हो गया!** Vercel automatically detect करेगा कि यह Vite project है।

### Local Test (Optional):
```bash
npm run build
npm run preview
```

---

## ✅ Solution 2: Netlify

### Steps:

1. **Netlify पर जाएं**: https://netlify.com
2. **GitHub से Sign up करें**
3. **Add new site** → **Import an existing project**
4. अपना GitHub repository select करें
5. Build settings automatically detect हो जाएंगी:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Deploy** पर क्लिक करें

---

## ✅ Solution 3: GitHub Pages

### Steps:

1. **GitHub Repository Settings में जाएं**
2. **Pages** section में जाएं (बाईं तरफ menu में)
3. **Source** को `GitHub Actions` पर set करें
4. अपने code को push करें:

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

5. **Actions** tab में जाकर deployment देखें
6. कुछ मिनट में आपकी site live हो जाएगी!

**URL होगा**: `https://yourusername.github.io/donation-project/`

### Important Note for GitHub Pages:
`vite.config.js` में `base` को अपने repository name से match करें:
```javascript
base: '/donation-project/', // Your repo name
```

---

## 🔧 Manual Build (किसी भी hosting के लिए)

अगर आप कोई और hosting use कर रहे हैं (जैसे cPanel, Hostinger, etc.):

### Step 1: Build करें
```bash
npm run build
```

यह `dist` folder बना देगा।

### Step 2: Upload करें
`dist` folder के अंदर की सभी files को अपने hosting के public folder में upload करें:
- cPanel: `public_html`
- Hostinger: `public_html`
- Other: usually `www` या `public_html`

### Step 3: .htaccess file बनाएं (Apache servers के लिए)
`dist` folder में यह file upload करें:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🎯 Quick Commands

```bash
# Development में run करें (local)
npm run dev

# Production build बनाएं
npm run build

# Build को locally test करें
npm run preview
```

---

## ❓ Common Issues

### 1. **Blank white screen दिखता है**
- Check करें कि `vite.config.js` में `base` path सही है
- Browser console में errors check करें (F12 दबाएं)

### 2. **Routes काम नहीं कर रहे (404 error)**
- Vercel/Netlify config files check करें
- `.htaccess` file upload करें (Apache servers के लिए)

### 3. **Assets load नहीं हो रहे**
- `base` path check करें
- Build फिर से करें: `npm run build`

---

## 📞 Support

अगर फिर भी problem हो, तो बताएं:
1. आप कहाँ deploy कर रहे हैं? (Vercel/Netlify/GitHub Pages/cPanel/Other)
2. क्या error आ रहा है?
3. Browser console में क्या दिख रहा है? (F12 दबाकर देखें)

---

**Made with ❤️ for NALA Donation Project**
