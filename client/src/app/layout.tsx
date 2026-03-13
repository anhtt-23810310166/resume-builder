import { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './ThemeProvider';

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional CVs",
  description: "Build stunning professional resumes with multiple templates and export to PDF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
