import { SITE_URL } from "@/lib/site";

const routes = [
  { path: "/", priority: 1.0 },
  { path: "/AboutUs", priority: 0.8 },
  { path: "/ServiceEr", priority: 0.9 },
  { path: "/ServiceAgt", priority: 0.9 },
  { path: "/ServiceAmb", priority: 0.9 },
  { path: "/ServiceUg", priority: 0.9 },
  { path: "/ServiceAfterLife", priority: 0.7 },
  { path: "/Impact", priority: 0.6 },
  { path: "/StandBy", priority: 0.8 },
  { path: "/AmbulanceTp", priority: 0.7 },
  { path: "/AfterLife", priority: 0.6 },
  { path: "/ems-week", priority: 0.5 },
];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
