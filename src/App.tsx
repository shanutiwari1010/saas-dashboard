import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { router } from "@/router";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
