import QueryProvider from "./providers/QueryProvider";
import Router from "./router/Router";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <QueryProvider>
      <Router />
      <Toaster richColors position="top-center" />
    </QueryProvider>
  );
}

export default App;
