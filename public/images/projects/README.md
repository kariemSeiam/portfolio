# Project Images Directory

This directory contains all project screenshots and images organized by project and type.

## 📁 Folder Structure

```
projects/
  ├── hvar-hub/
  │   ├── web/          # Web/desktop screenshots
  │   └── mobile/       # Mobile app screenshots
  ├── geolink-api/
  │   ├── web/          # Web dashboard screenshots
  │   └── landing/      # Landing page screenshots
  ├── areo/
  │   └── mobile/       # Mobile app screenshots
  ├── taxiarab-platform/
  │   └── mobile/       # Mobile app screenshots
  └── hvar-catalog/
      └── web/          # Web screenshots
```

## 📝 Naming Convention

Name your images descriptively:
- `dashboard.png` - Main dashboard view
- `api-docs.png` - API documentation page
- `mobile-home.png` - Mobile home screen
- `feature-analytics.png` - Specific feature screenshot

## 🎨 Image Guidelines

### Recommended Sizes
- **Web screenshots**: 1920x1080 or 1440x900
- **Mobile screenshots**: 750x1334 (iPhone) or 1080x1920 (Android)

### File Format
- Use **PNG** for screenshots (best quality)
- Use **WebP** for optimized versions (smaller file size)
- Keep file size under **500KB** per image

### Optimization
Before adding images:
1. Compress using [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/)
2. Resize to appropriate dimensions
3. Use WebP format when possible

## 📋 Adding Images

1. Place your images in the appropriate project/type folder
2. Update `src/data/projects.js` with the image paths
3. Use relative paths: `/images/projects/{project}/{type}/{filename}.png`

## ✅ Examples

For Geolink API dashboard:
- **File location**: `public/images/projects/geolink-api/web/dashboard.png`
- **URL in code**: `/images/projects/geolink-api/web/dashboard.png`

For Geolink API landing page:
- **File location**: `public/images/projects/geolink-api/landing/homepage.png`
- **URL in code**: `/images/projects/geolink-api/landing/homepage.png`

