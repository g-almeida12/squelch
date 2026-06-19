import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./config/routes.config";
import { _rootQueryClient } from "./config/query-client.config";

function App() {
  return (
    <QueryClientProvider client={_rootQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
