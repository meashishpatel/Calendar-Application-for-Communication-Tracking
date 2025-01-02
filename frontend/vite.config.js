import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
  server: {
    proxy: {
      "/api":
        "https://calendar-application-for-communication-16bb.onrender.com",
    },
  },
});
