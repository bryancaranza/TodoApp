import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme/provider";
import { RouteElements } from "./routes";
import { ROUTE } from "./routes/routing";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter basename={ROUTE.BASE}>
        <RouteElements />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
