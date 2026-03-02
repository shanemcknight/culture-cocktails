# Culture Cocktails — Website + Admin Dashboard

Your complete website with a mobile-friendly admin dashboard for uploading beverage projects.

---

## What's in this package

- **Your website** — the full Culture Cocktails site (Home, Services, About, Process pages)
- **Admin dashboard** — go to `/admin` on your site to add/edit/delete portfolio projects from your phone
- **Image uploads** — photos you upload get stored in the cloud via Vercel Blob
- **SEO built-in** — meta tags, Open Graph, and structured content that Google loves
- **Portfolio section** — every project you add from the admin shows up on your homepage

---

## Deployment: 3 Steps

### Step 1: Upload to GitHub

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in the top-right corner → **New repository**
3. Name it `culture-cocktails`
4. Keep it **Public** (Vercel free tier needs this)
5. Click **Create repository**
6. GitHub will show you a "Quick setup" page
7. Click **"uploading an existing file"** link
8. **Drag and drop ALL the files from this folder** into the upload area
9. Make sure the folder structure stays intact (src/, public/, data/ etc.)
10. Click **Commit changes**

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in (use your GitHub account)
2. Click **"Add New..."** → **Project**
3. You'll see your `culture-cocktails` repo listed — click **Import**
4. Under **Framework Preset**, make sure it says **Next.js**
5. Click **Deploy**
6. Wait 1-2 minutes. That's it — your site is live!
7. Vercel will give you a URL like `culture-cocktails.vercel.app`

### Step 3: Set Up Image Uploads (Vercel Blob)

1. In your Vercel dashboard, click on your project
2. Go to **Storage** tab
3. Click **Create** → **Blob**
4. Name it `project-images`
5. Click **Create**
6. Go to **Settings** → **Environment Variables**
7. Add: `ADMIN_PASSWORD` = `culturecocktails2026` (or whatever password you want)
8. The BLOB token gets auto-added when you create the Blob store

That's it! Your site is live with image uploads working.

---

## Using Your Admin Dashboard

1. Go to `your-site-url.vercel.app/admin`
2. Enter your password (default: `culturecocktails2026`)
3. Tap **"Add New Project"**
4. Tap the camera icon to take a photo or pick from your gallery
5. Fill in the title, category, and description
6. Tap **Save Project**
7. The project immediately appears on your homepage

### From your phone:
- Bookmark `your-site-url.vercel.app/admin` on your home screen
- You can upload project photos right from a job site
- Every new project = fresh content = better Google rankings

---

## Custom Domain

Once your site is running:

1. In Vercel, go to **Settings** → **Domains**
2. Add `culturecocktails.com` (or whatever domain you buy)
3. Vercel will tell you what DNS records to add
4. If you buy the domain from Namecheap, Google Domains, or GoDaddy, follow their instructions to update DNS
5. Free SSL is automatic

---

## Google Business Profile Setup

1. Go to [business.google.com](https://business.google.com)
2. Add your business: "Culture Cocktails"
3. Category: "Beverage Consultant" or "Business Consultant"
4. Add your website URL
5. Add your contact info, hours, description
6. Post updates regularly (each new project you add is content you can share)

**Tip:** Every time you add a project on your site, also create a post on Google Business with a link to your site. This is how your friend's SEO keeps improving — fresh content signals to Google that your business is active.

---

## File Structure

```
culture-cocktails/
├── package.json          ← project dependencies
├── next.config.js        ← Next.js configuration
├── jsconfig.json         ← path aliases
├── .gitignore            ← files to exclude from GitHub
├── .env.example          ← environment variables template
├── data/
│   └── projects.json     ← your projects database
├── public/
│   └── images/           ← logos and static images
├── src/
│   ├── app/
│   │   ├── layout.js     ← root layout (fonts, meta)
│   │   ├── page.js       ← homepage
│   │   ├── globals.css   ← all styles
│   │   ├── admin/
│   │   │   └── page.js   ← admin dashboard
│   │   └── api/
│   │       ├── projects/
│   │       │   └── route.js  ← projects API
│   │       └── upload/
│   │           └── route.js  ← image upload API
│   └── lib/
│       └── projects.js   ← data access
```

---

## Important Notes

- **Culture Cocktails is a beverage development consultancy** — all site copy positions the business as consulting/formulation services, not as a distillery or manufacturer
- The default admin password is `culturecocktails2026` — change it in Vercel environment variables
- Free Vercel tier supports up to 100GB bandwidth/month — plenty for a business site
- The site auto-deploys whenever you push changes to GitHub
