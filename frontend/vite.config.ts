import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), removeConsole(), tailwindcss()],
});
