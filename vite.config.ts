import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    FullReload(["config/routes.rb", "app/views/**/*"], { delay: 200 }),
  ],
});
