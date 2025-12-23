# How to Add Google Drive Images to Projects

## ⚠️ Important Note

Google Drive viewer links (like the one you provided) **cannot be used directly** as image sources. You need to convert them to direct image links.

## ✅ Step-by-Step Guide

### Method 1: Get Direct Shareable Link (Recommended)

1. **Open your image in Google Drive**
2. **Right-click** on the image file
3. Select **"Get link"** or **"Share"**
4. Set permissions to **"Anyone with the link can view"**
5. Copy the link - it will look like:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```

6. **Extract the FILE_ID** (the long string between `/d/` and `/view`)
   - Example: `https://drive.google.com/file/d/1ABC123xyz.../view`
   - FILE_ID = `1ABC123xyz...`

7. **Convert to direct image URL**:
   ```
   https://drive.google.com/uc?export=view&id=FILE_ID
   ```

### Method 2: Use Google Drive Direct Link Generator

1. Go to: https://www.labnol.org/embed/google/drive/
2. Paste your Google Drive file link
3. Click "Generate Direct Link"
4. Copy the generated direct link

### Method 3: Alternative - Host Images Elsewhere

For better reliability, consider hosting images on:
- **GitHub** (in your repository)
- **Cloudinary** (free tier available)
- **Imgur** (simple image hosting)
- **Vercel/Netlify** (if deploying there)

## 📝 Example

**Original Google Drive Link:**
```
https://drive.google.com/file/d/1ABC123xyz789/view?usp=sharing
```

**Extracted FILE_ID:**
```
1ABC123xyz789
```

**Direct Image URL:**
```
https://drive.google.com/uc?export=view&id=1ABC123xyz789
```

## 🔧 Adding to Project Data

Once you have the direct image URL, add it to your project in `src/data/projects.js`:

```javascript
images: [
  {
    url: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID',
    type: 'web',  // or 'mobile' or 'custom'
    alt: 'Description of the image',
    caption: 'Optional caption text'
  },
]
```

## ⚡ Quick Fix for Your Current Link

The link you provided:
```
https://drive.google.com/u/0/drive-viewer/AKGpihYn3tgC99NFPu2wzkxrbamuqXdnlXJY3IzP6-4edJqNVZusk-A98KPhterzizNAzSvDKLbvWPhU596ZOIcslD2m9C0yS8lkvk8=s1600-rw-v1?auditContext=forDisplay
```

This is a **viewer link**, not a direct file link. To use it:

1. **Open the link in your browser**
2. **Right-click the image** → "Open image in new tab"
3. **Copy the new tab URL** - this should be a direct image link
4. **Or** follow Method 1 above to get the proper shareable link

## 🎯 Best Practice

For production portfolios, it's recommended to:
1. **Host images in your repository** (in a `/public/images/` folder)
2. **Use relative paths**: `/images/geolink-dashboard.png`
3. **Optimize images** before adding (compress, resize to reasonable dimensions)
4. **Use WebP format** for better performance

## 📁 Suggested Folder Structure

```
public/
  images/
    projects/
      geolink/
        dashboard.png
        api-docs.png
        mobile-view.png
```

Then reference as:
```javascript
url: '/images/projects/geolink/dashboard.png'
```

---

**Note**: If the Google Drive link doesn't work after conversion, the image won't display. Always test your image URLs before deploying!

