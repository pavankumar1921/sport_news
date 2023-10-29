import React, { createContext, useContext, useReducer } from "react";
import {reducer,initialState,TeamsState,TeamsActions,} from "./reducer";

const TeamsStateContext = createContext<TeamsState | undefined>(
  undefined
);

type TeamsDispatch = React.Dispatch<TeamsActions>;
const TeamsDispatchContext = createContext<TeamsDispatch | undefined>(
  undefined
);

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateTeam, dispatchTeams] = useReducer(reducer, initialState);

  return (
    <TeamsStateContext.Provider value={stateTeam}>
      <TeamsDispatchContext.Provider value={dispatchTeams}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};

export const useTeamsState = () => useContext(TeamsStateContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);