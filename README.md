# 🚀 EduCrisis Website - Complete Setup Guide

## 📂 Project Structure

Create this exact folder structure:

```
educrisis-website/
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── deploy.sh
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── I18nContext.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Loading.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── EvolutionPage.jsx
│   │   ├── MissionPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── DonatePage.jsx
│   │   ├── PartnerPage.jsx
│   │   ├── OtherWaysPage.jsx
│   │   └── LegalPage.jsx
│   └── locales/
│       ├── en.json
│       ├── uk.json
│       ├── ru.json
│       └── zh.json
```

## 📋 Step-by-Step Setup

### 1. Create Project Directory
```bash
mkdir educrisis-website
cd educrisis-website
```

### 2. Copy All Files
Copy each file from the artifacts into the corresponding location in your project structure.

**✅ All files are ready to copy-paste exactly as provided**

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:5173

### 5. Build for Production
```bash
npm run build
```

## 🐳 Docker Deployment

### Method 1: Using Deploy Script (Recommended)
```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

### Method 2: Manual Docker Commands
```bash
# Build image
docker build -t educrisis-web .

# Run container
docker-compose up -d --build

# View logs
docker-compose logs -f web

# Stop
docker-compose down
```

## 📧 Email Configuration

### Option A: Third-Party Email (Recommended)
1. Sign up with Google Workspace, Microsoft 365, or Zoho
2. Add their MX records to your DNS
3. Configure in Footer.jsx:

```javascript
const handleSubscribe = async () => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (response.ok) {
    alert('Successfully subscribed!');
    setEmail('');
  }
};
```

### Option B: Self-Hosted Email
1. Uncomment mailserver section in `docker-compose.yml`
2. Run: `docker-compose up -d mailserver`
3. Create accounts: `docker exec -it educrisis-mail setup email add info@educrisis.org password`

## 🌐 DNS Configuration

Point your domain to your server:

```
Type  Host  Value
A     @     YOUR_SERVER_IP
A     www   YOUR_SERVER_IP
```

## 🔐 SSL Setup

Run the deploy script and choose "Setup SSL" or manually:

```bash
docker-compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d educrisis.org -d www.educrisis.org \
  --email admin@educrisis.org \
  --agree-tos
```

## ✏️ Customizing Content

### Edit Translations
Edit the JSON files in `src/locales/`:
- `en.json` - English
- `uk.json` - Ukrainian  
- `ru.json` - Russian
- `zh.json` - Chinese

### Add Page Content
Edit individual page files in `src/pages/`:
```javascript
// Example: src/pages/HomePage.jsx
export default function HomePage() {
  const { t } = useI18n();
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: '#002866' }}>
        {t('homeTitle')}
      </h1>
      <div className="prose max-w-none" style={{ color: '#002866' }}>
        <p className="text-base md:text-lg mb-4">{t('homeContent')}</p>
        
        {/* Add your custom content here */}
        <section className="my-8">
          <h2 className="text-xl font-bold mb-4">Your Section Title</h2>
          <p>Your content...</p>
        </section>
      </div>
    </div>
  );
}
```

## 🎨 Styling Guide

The website uses:
- **Primary Color**: #002866 (Dark Blue)
- **Accent Color**: #FFEE00 (Yellow)
- **Font**: Poppins, sans-serif
- **Framework**: Tailwind CSS

### Adding Custom Styles
```jsx
<div className="my-custom-section" style={{ color: '#002866' }}>
  <h2 className="text-2xl font-bold mb-4">Section Title</h2>
  <p className="text-lg">Content here...</p>
</div>
```

## 🔄 Updating Website

### Local Changes
1. Edit files
2. Run `npm run build`
3. Test with `npm run preview`

### Production Update
```bash
# Pull latest code
git pull origin main

# Rebuild and redeploy
docker-compose up -d --build web
```

## 🛠️ Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Docker Issues
```bash
# Check logs
docker-compose logs web

# Restart services
docker-compose restart

# Rebuild from scratch
docker-compose down
docker-compose up -d --build
```

### Port Already in Use
```bash
# Find process using port 80
sudo lsof -i :80

# Kill process or change port in docker-compose.yml
```

## 📊 Performance Tips

1. **Optimize Images**: Use WebP format, compress images
2. **Enable CDN**: Use Cloudflare for global speed
3. **Monitor**: Use `docker stats` to check resource usage
4. **Cache**: Nginx configuration already includes caching

## ✅ Deployment Checklist

- [ ] All files copied to correct locations
- [ ] Dependencies installed (`npm install`)
- [ ] Build works locally (`npm run build`)
- [ ] Docker installed on server
- [ ] DNS pointed to server
- [ ] Deploy script executed (`./deploy.sh`)
- [ ] SSL certificates installed
- [ ] Email configured
- [ ] Website accessible at https://educrisis.org
- [ ] All pages load correctly
- [ ] Language switcher works
- [ ] Mobile responsive verified

## 📞 Support Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Docker
docker-compose up -d              # Start services
docker-compose down               # Stop services
docker-compose logs -f web        # View logs
docker-compose restart web        # Restart web service
docker-compose ps                 # Check status

# Deployment
./deploy.sh                       # Interactive deployment
chmod +x deploy.sh                # Make script executable
```

## 🎉 You're Done!

Your website is now ready with:
- ✅ Multi-language support (EN, UK, RU, ZH)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Docker containerization
- ✅ SSL/HTTPS support
- ✅ Optimized performance
- ✅ Email integration ready
- ✅ Easy content management

Visit your website at: **https://educrisis.org**
