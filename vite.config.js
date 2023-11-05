import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default ({mode}) => {
  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true 
        },
        manifest: {
          name: "Sports News Application",
          short_name: "Sports News",
          icons: [
            {
              "src": "/favicon.png",
              "sizes": "64x64 32x32 24x24 16x16",
              "type": "image/x-icon"
            },
            {
              "src": "/favicon-16x16.png",
              "type": "image/png",
              "sizes": "16x16"
            },
            {
              "src": "/favicon-32x32.png",
              "type": "image/png",
              "sizes": "32x32"
            },
            {
              "src": "/android-chrome-192x192.png",
              "type": "image/png",
              "sizes": "192x192"
            },
            {
              "src": "/android-chrome-192x192.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "any maskable"
            }
          ],
          theme_color: '#AAF',
        },
      }),
    ],
    define :{
      "process.env.NODE_ENV": `"${mode}"`,
    },
  })
  };
