import { RouterProvider } from "react-router-dom";

import { router } from "@/router";
import { ThemeProvider } from "@/providers/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
