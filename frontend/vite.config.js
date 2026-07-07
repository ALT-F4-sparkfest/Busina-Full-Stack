import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null, // we register manually via usePwaUpdate so we control the update UX
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "BUSINA - Smart Route",
        short_name: "BUSINA",
        description: "Real-time public transport tracking",
        theme_color: "#03164A",
        background_color: "#FAFAFA",
        display: "standalone",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Track a Jeepney",
            short_name: "Commuter",
            description: "Open commuter map and ETA",
            url: "/?mode=commuter",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Fleet Dashboard",
            short_name: "Operator",
            description: "Open the operator fleet dashboard",
            url: "/?mode=operator",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        navigateFallback: "/index.html",
        // you can add runtimeCaching here if needed
      },
    }),
  ],
});
