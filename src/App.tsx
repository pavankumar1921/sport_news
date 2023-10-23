import router from "./routes";
import { RouterProvider } from "react-router-dom";
import React from "react";

import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";

const App = () =>{
  return (
    <div>
      <MatchesProvider>
        <ArticlesProvider>
          <RouterProvider router={router} />
        </ArticlesProvider>
      </MatchesProvider>
    </div>
  )
}
export default App