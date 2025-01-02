import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api":
        "https://calendar-application-for-communication-16bb.onrender.com", // Ensure this is correct
    },
  },
});
