import { useMatchesDispatch,useMatchesState } from "../../context/matches/context";
import React from "react";

export default function MatchListItems(){
    let state: any = useMatchesState()
    const {matches, isLoading , isError, errorMessage} = state
    console.log(matches)
    if (isLoading && matches.length ===0){
        return <span>Loading ...</span>
    }
    if(isError){
        return <span>{errorMessage}</span>
    }
    return (
        <div className="flex gap-3 w-full p-4">
          {matches && matches.length > 0 ? (
        matches.map((match:any) => 
          match.isRunning === true &&(
          <div key={match.id} className="border rounded-lg shadow-lg p-4">
            <h5 className="font-semibold">{match.name}</h5>
            <p className="text-gray-500">{match.sportName}</p>
            <div className="mt-4">
              <button className="text-blue-600 hover:underline">More Details</button>
            </div>
          </div>
        ))
      ) : (
        <span>No matches available.</span>
      )}
        </div>
      );
}