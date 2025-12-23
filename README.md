# Interview Question Generator

A client-side Next.js web application that generates personalized, resume-grounded interview questions using Google's Gemini AI API. Simply upload your resume PDF and get tailored questions across multiple categories in seconds.

![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 📄 **Drag & Drop PDF Upload** - Intuitive file upload with visual feedback
- 🤖 **AI-Powered Generation** - Uses Google's Gemini 2.5 Flash model
- 🎯 **Resume-Grounded Questions** - Every question references specific resume details
- 📊 **Categorized Output** - Organized by Skills, Projects, Experience, Behavioral, etc.
- 🎚️ **Difficulty Levels** - Questions tagged as Easy, Medium, or Hard
- 📋 **One-Click Export** - Copy all questions to clipboard in formatted text
- ⚡ **100% Client-Side** - No backend required, runs entirely in the browser
- 🎨 **Clean UI** - Simple, professional design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or download this repository**

```bash
cd Assignment
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure your API key**

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Security Note**: The `NEXT_PUBLIC_` prefix exposes this key in client-side code. Only use this for development, demos, or personal projects. For production apps, implement server-side API routes to protect your API key.

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Upload Resume**: Drag and drop your resume PDF or click to browse
2. **Wait for Extraction**: The app extracts text from your PDF (happens automatically)
3. **Generate Questions**: Click the "Generate Questions" button
4. **Review Results**: Browse categorized questions with difficulty levels
5. **Export**: Click "Copy All Questions" to export to clipboard

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI library |
| **Tailwind CSS** | Utility-first styling |
| **PDF.js** | Client-side PDF text extraction |
| **Gemini API** | AI question generation |

## 📁 Project Structure

```
Assignment/
├── app/
│   ├── layout.js              # Root layout with metadata
│   ├── page.js                # Main page with upload + results
│   └── globals.css            # Tailwind directives
├── components/
│   ├── ResumeUploader.js      # Drag-drop PDF upload component
│   ├── QuestionCard.js        # Individual question card display
│   ├── CategorySection.js     # Category grouping with header
│   └── CopyAllButton.js       # Export functionality
├── lib/
│   ├── gemini.js              # Gemini API client + JSON parser
│   └── prompt.js              # Structured prompt builder
├── public/
│   └── pdf.worker.min.mjs     # PDF.js web worker
├── .env.local                 # Environment variables (create this)
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎯 Question Categories

The AI generates 12-18 questions across these categories:

- **Skills** - Technical abilities and tools
- **Projects** - Past work and achievements
- **Experience** - Professional background
- **Behavioral** - Soft skills and situations
- **Leadership** - Management and mentoring
- **System Design** - Architecture (senior roles only)
- **Problem Solving** - Critical thinking
- **Career Motivation** - Goals and interests
- **Culture Fit** - Work style preferences
- **Other** - Additional relevant topics

Each question includes:
- Clear question text
- Explanation of why it's relevant
- Direct quote/anchor from your resume
- Difficulty level (Easy/Medium/Hard)

## 🔧 API Configuration

The app uses these Gemini API settings:

```javascript
Model: gemini-1.5-flash-latest
Temperature: 0.7
Max Tokens: 8192
API Version: v1
```

## ⚠️ Limitations & Considerations

### Security
- **API Key Exposure**: Your Gemini API key is visible in browser DevTools
- **Mitigation**: Only use for personal projects or demos
- **Production**: Implement Next.js API routes to proxy requests server-side

### Rate Limits (Free Tier)
- 15 requests per minute
- 1,500 requests per day
- Requests will fail if limits are exceeded

### PDF Support
- ✅ Text-based PDFs only
- ❌ Scanned PDFs (images) won't work
- ❌ Password-protected PDFs not supported
- Maximum file size: 10MB
- Complex formatting may reduce extraction quality

### AI Output
- Questions vary between runs (AI is non-deterministic)
- Occasionally generic questions may appear
- JSON parsing can fail if model doesn't follow schema
- Always review generated questions before use

### Privacy
- Resume text is sent to Google's servers
- PDF processing happens locally in your browser
- No data is stored by this application
- Review [Gemini API Terms](https://ai.google.dev/terms)

## 🐛 Troubleshooting

### "Missing API key" Error
- Verify `.env.local` exists with `NEXT_PUBLIC_GEMINI_API_KEY`
- Restart dev server after creating/editing `.env.local`
- Check for typos in the key

### PDF Upload Fails
- Ensure PDF contains extractable text (not scanned images)
- Try a different PDF or export your resume as a new PDF
- Check file size is under 10MB
- Open browser console (F12) for detailed errors

### "Setting up fake worker failed" Error
- Ensure `public/pdf.worker.min.mjs` exists
- Restart the dev server
- Clear browser cache (Ctrl+Shift+R)

### Gemini API Errors
- **404 Error**: Model name might have changed (check Gemini docs)
- **403 Error**: Invalid API key or quota exceeded
- **429 Error**: Rate limit exceeded, wait and retry
- Check [API Status](https://status.cloud.google.com/)

### No Questions Generated
- Ensure resume has at least 200 characters
- Check Network tab in browser DevTools for API errors
- Verify API key has quota remaining
- Try with a different resume

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `NEXT_PUBLIC_GEMINI_API_KEY` in Environment Variables
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Next.js

## 🔒 Production Security Recommendations

To use this in production safely:

1. **Create API Route**: Move Gemini API calls to `/app/api/generate/route.js`
2. **Use Server-Only Key**: Store API key as `GEMINI_API_KEY` (without `NEXT_PUBLIC_`)
3. **Add Rate Limiting**: Implement request throttling
4. **Add Authentication**: Require user login
5. **Add CORS Protection**: Restrict API access to your domain

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Google Gemini](https://ai.google.dev/) - AI model
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF parsing
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📧 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console for errors
3. Verify API key and quota
4. Check [Gemini API Documentation](https://ai.google.dev/docs)

---

**Built with ❤️ using Next.js and Google Gemini API**
