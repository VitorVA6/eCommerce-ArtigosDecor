import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({
    
    title = "Artigos Decor - Sua loja online de artigos para decoração, Vasos, Bandejas e Painéis de Led",
    description = "Encontre os melhores artigos para decoração de festa na nossa loja online. Oferecemos painéis de led, vasos para festas, castiçais, suporte para bolo, bandejas e lindas mesas.",
    keywords,
    url = "https://artigosdecor.render.com/",
    siteName = "Artigos Decor",
    contentType = "website",
    canonical = "https://artigosdecor.render.com/",
}) {
 return (
 <Helmet>
   {title !==undefined && <title>{title}</title>}
 {/* Add meta tags for SEO */}
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content={keywords} />

 {/* Add meta tags for social media */}

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:type" content={contentType} />
    <link rel="canonical" href={canonical} />
 </Helmet>
 );
}