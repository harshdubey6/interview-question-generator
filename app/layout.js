import './globals.css';

export const metadata = {
  title: 'Interview Question Generator',
  description: 'Generate tailored interview questions from your resume using AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
