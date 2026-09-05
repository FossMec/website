import { client } from "@/sanity/lib/client";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foss.mec.ac.in";

  // 1. Static sections of the website
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Dynamic event URLs fetched live from Sanity CMS
  let eventRoutes = [];
  try {
    const events = await client.fetch(`
      *[_type == "event"]{
        _id,
        _updatedAt
      }
    `);

    if (Array.isArray(events)) {
      eventRoutes = events.map((event) => ({
        url: `${baseUrl}/events/${event._id}`,
        lastModified: event._updatedAt ? new Date(event._updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch events for sitemap generation:", error);
  }

  return [...staticRoutes, ...eventRoutes];
}