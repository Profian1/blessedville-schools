import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>[];
};

const SITE_URL = "https://blessedvilleschools.co.ke";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path, noindex = false, structuredData }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", `${SITE_URL}${path}`);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);

    const previous = Array.from(document.querySelectorAll("script[data-seo-jsonld]"));
    previous.forEach((s) => s.remove());

    if (structuredData && structuredData.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, path, noindex, structuredData]);

  return null;
}
