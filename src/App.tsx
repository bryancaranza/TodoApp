import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme/provider";
import { RouteElements } from "./routes";
import { ROUTE } from "./routes/routing";
import { Suspense } from "react";
import Loader from "./components/custom/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter basename={ROUTE.BASE}>
          <RouteElements />
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
