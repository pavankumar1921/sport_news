import React, { createContext, useContext, useReducer } from "react";

import {
  reducer,
  initialState,
  ArticlesState,
  ArticlesActions,
} from "./reducer";
const ArticlesStateContext = createContext<ArticlesState | undefined>(
  undefined
);

type ArticlesDispatch = React.Dispatch<ArticlesActions>;
const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(
  undefined
);

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateArticle, dispatchArticles] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={stateArticle}>
      <ArticlesDispatchContext.Provider value={dispatchArticles}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};

export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);