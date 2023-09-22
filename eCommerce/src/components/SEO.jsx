import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({
 title,
 description,
 keywords,
 url,
 canonical,
}) {
 return (
 <Helmet>
 <title>{title}</title>
 {/* Add meta tags for SEO */}
 <meta name="description" content={description} />
 <meta name="keywords" content={keywords} />

 {/* Add meta tags for social media */}
 <meta property="og:title" content={title} />
 <meta property="og:description" content={description} />
 <meta property="og:url" content={url} />
 <link rel="canonical" href={canonical} />
 </Helmet>
 );
}