# 📸 Project Images - Quick Start Guide

## ✅ Folder Structure Created

All folders are ready! Here's where to add your images:

```
public/images/projects/
├── hvar-hub/
│   ├── web/          ← Add web screenshots here
│   └── mobile/       ← Add mobile screenshots here
├── geolink-api/
│   └── web/          ← Add web dashboard screenshots here
├── areo/
│   └── mobile/       ← Add mobile app screenshots here
├── taxiarab-platform/
│   └── mobile/       ← Add mobile app screenshots here
└── hvar-catalog/
    └── web/          ← Add web screenshots here
```

## 🚀 How to Add Images

### Step 1: Add Your Images
1. Place your image files in the appropriate folder
   - Example: `public/images/projects/geolink-api/web/dashboard.png`

### Step 2: Update `src/data/projects.js`
2. Open `src/data/projects.js`
3. Find your project
4. Uncomment and update the image examples, or add new ones:

```javascript
images: [
  {
    url: '/images/projects/geolink-api/web/dashboard.png',
    type: 'web',  // 'web', 'mobile', or 'custom'
    alt: 'Geolink admin dashboard',
    caption: 'Admin dashboard with analytics and user management'
  },
  {
    url: '/images/projects/geolink-api/web/api-docs.png',
    type: 'web',
    alt: 'API documentation page',
    caption: 'Interactive API documentation'
  },
],
```

## 📋 Image Path Reference

| Project | Web Path | Mobile Path |
|---------|----------|-------------|
| **Hvar-Hub** | `/images/projects/hvar-hub/web/` | `/images/projects/hvar-hub/mobile/` |
| **Geolink API** | `/images/projects/geolink-api/web/` | - |
| **Areo** | - | `/images/projects/areo/mobile/` |
| **Taxiarab Platform** | - | `/images/projects/taxiarab-platform/mobile/` |
| **Hvar-Catalog** | `/images/projects/hvar-catalog/web/` | - |

## 🎨 Image Types

- **`web`** - Desktop/web screenshots (uses Teal/Horizon theme)
- **`mobile`** - Mobile app screenshots (uses Gold/Compass theme)
- **`custom`** - Other images like diagrams (uses Coral/Navigator theme)

## 📝 Example: Adding Geolink Dashboard

1. **Save image**: `public/images/projects/geolink-api/web/dashboard.png`

2. **Update projects.js**:
```javascript
{
  id: 2,
  title: 'Geolink API',
  // ... other fields ...
  images: [
    {
      url: '/images/projects/geolink-api/web/dashboard.png',
      type: 'web',
      alt: 'Geolink admin dashboard interface',
      caption: 'Admin dashboard with real-time analytics'
    },
  ],
}
```

3. **Done!** The image will appear in the project modal gallery.

## 💡 Tips

- **Name files descriptively**: `dashboard.png`, `api-docs.png`, `mobile-home.png`
- **Optimize images**: Compress before adding (keep under 500KB)
- **Use PNG for screenshots**: Best quality for UI screenshots
- **Add captions**: Help users understand what they're seeing
- **Multiple images**: Add as many as you want per project!

## 🔍 Current Status

All projects have empty `images` arrays ready for you to fill. Just:
1. Add your image files to the folders
2. Uncomment and update the examples in `projects.js`
3. The gallery will automatically appear in the modal!

---

**Ready to add your images!** 🎉

