import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DATA.name} — ${DATA.role}`,
    short_name: DATA.name,
    description: DATA.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0866ff",
    icons: [
      {
        src: "/jairo-pfp-dark-nowatermark-1x1.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
