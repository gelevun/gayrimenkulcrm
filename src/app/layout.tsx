import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/providers/auth-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArsaRazi - Balıkesir Arsa ve Arazi İlanları",
  description: "Balıkesir'in en güvenilir arsa ve arazi danışmanlık şirketi. Edremit, Ayvalık, Bandırma ve diğer ilçelerde yatırıma uygun arsa ve arazi seçenekleri.",
  authors: [{ name: "ArsaRazi Team" }],
  keywords: ["ArsaRazi", "Balıkesir Arsa", "Balıkesir Arazi", "Edremit Arsa", "Ayvalık Arsa", "Bandırma Arsa", "Gayrimenkul", "Arsa Satışı", "Arazi Satışı"],
  openGraph: {
    title: "ArsaRazi - Balıkesir Arsa ve Arazi İlanları",
    description: "Balıkesir'in en güvenilir arsa ve arazi danışmanlık şirketi",
    url: "https://arsarazi.com",
    siteName: "ArsaRazi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArsaRazi - Balıkesir Arsa ve Arazi İlanları",
    description: "Balıkesir'in en güvenilir arsa ve arazi danışmanlık şirketi",
  },
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  // Safari uyumluluğu için ek ayarlar
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "ArsaRazi",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Safari uyumluluğu için ek meta tag'ler */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ArsaRazi" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        
        {/* Safari için viewport ayarları */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        
        {/* Optimized CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Performance optimizations */
            * {
              box-sizing: border-box;
            }
            
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeSpeed;
            }
            
            /* Safari optimizations */
            @supports (-webkit-touch-callout: none) {
              input, select, textarea {
                font-size: 16px !important;
              }
              
              .overflow-y-auto {
                -webkit-overflow-scrolling: touch;
              }
            }
            
            /* Safe area support */
            @supports (padding: max(0px)) {
              .safe-area-top {
                padding-top: max(env(safe-area-inset-top), 0px);
              }
              .safe-area-bottom {
                padding-bottom: max(env(safe-area-inset-bottom), 0px);
              }
            }
            
            /* Performance improvements */
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            /* Reduce layout shifts */
            img, video {
              max-width: 100%;
              height: auto;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <AuthWrapper>
          {children}
          <Toaster />
        </AuthWrapper>
      </body>
    </html>
  );
}
