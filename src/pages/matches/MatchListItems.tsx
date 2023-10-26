import { useMatchesDispatch,useMatchesState } from "../../context/matches/context";
import React from "react";
import MatchDetails from "./MatchDetails";

export default function MatchListItems(){
    let state: any = useMatchesState()
    const {matches, isLoading , isError, errorMessage} = state
    console.log(matches)

    const fullMatchDetails = (id:number) =>{
      return <MatchDetails id={id}/>
    }

    if (isLoading && matches.length ===0){
        return <span>Loading ...</span>
    }
    if(isError){
        return <span>{errorMessage}</span>
    }
    return (
        <div className="flex gap-3 w-full p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {matches && matches.length > 0 ? (
        matches.map((match:any) => 
          match.isRunning === true &&(
          <div key={match.id} className="border border-gray-300 bg-white p-4 rounded-md overflow-hidden w-80 h-40 shadow-lg p-4">
            <h5 className="font-semibold">{match.sportName}</h5>
            <p className="text-gray-700">{match.name.split('at')[0]}</p>
            <div className="mt-4">
              <div>{fullMatchDetails(match.id)}</div>
            </div>
          </div>
        ))
      ) : (
        <span>No matches available.</span>
      )}
          </div>
        </div>
      );
}