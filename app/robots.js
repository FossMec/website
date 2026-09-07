export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foss.mec.ac.in";

  return {
    rules: [
      {
        userAgent: "*", //applies to all web crawlers
        allow: "/", //permission to index homepage and event pages
        disallow: ["/studio/", "/api/"], //blocks indexing sanity
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}