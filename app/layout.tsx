import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { ChatPluginBootstrap } from "@/components/chat-plugin-bootstrap";
import { ChatReasoningVisibilityController } from "@/components/chat-reasoning-visibility-controller";
import { CSSImportEnhancer } from "@/components/css-import-enhancer";
import { PWAManifestInjector } from "@/components/pwa-manifest-injector";
import { PWARegistrar } from "@/components/pwa-registrar";
import "../styles/fonts.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "float",
  description: "float",
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" crossOrigin="use-credentials" />
        <meta name="theme-color" content="#f8f7f2" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" href="/icon-192.png" type="image/png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="float" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* 去掉 Netlify 免费版强制注入的 Powered by Netlify 徽标（外层 iframe id = nl-badge-frame） */}
        <style>{`#nl-badge-frame,#nl-badge,#nl-hud-frame{display:none!important;visibility:hidden!important}`}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function kill(){try{var ids=['nl-badge-frame','nl-badge','nl-hud-frame'];for(var i=0;i<ids.length;i++){var e=document.getElementById(ids[i]);if(e&&e.parentNode){e.parentNode.removeChild(e);}}var f=document.querySelectorAll('iframe');for(var k=0;k<f.length;k++){var s=f[k].getAttribute('srcdoc')||'';if(s.indexOf('Netlify')>=0&&f[k].parentNode){f[k].parentNode.removeChild(f[k]);}}}catch(err){}}kill();try{new MutationObserver(kill).observe(document.documentElement,{childList:true,subtree:true});}catch(err){}setInterval(kill,1000);document.addEventListener('DOMContentLoaded',kill);})();`,
          }}
        />
      </head>
      <body>
        <PWAManifestInjector />
        <PWARegistrar />
        <CSSImportEnhancer />
        <ChatPluginBootstrap />
        <ChatReasoningVisibilityController />
        {children}
      </body>
    </html>
  );
}
