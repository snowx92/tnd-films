"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { analyticsEnabled, clarityId, gtmId, metaPixelId, trackPageView } from "@/lib/analytics";

const gtmSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
`;

const metaSnippet = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');
`;

const claritySnippet = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");
`;

/** Google Tag Manager, Meta Pixel and Microsoft Clarity. */
export function Analytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // The snippets count the first page; client-side navigations are counted here.
  useEffect(() => {
    if (!analyticsEnabled) {
      return;
    }
    if (lastPath.current !== null && lastPath.current !== pathname) {
      trackPageView(pathname);
    }
    lastPath.current = pathname;
  }, [pathname]);

  if (!analyticsEnabled) {
    return null;
  }

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {gtmSnippet}
      </Script>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
      />
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {metaSnippet}
      </Script>
      <Script id="clarity-init" strategy="afterInteractive">
        {claritySnippet}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's no-JS tracking pixel */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
