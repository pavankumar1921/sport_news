import MatchList from "./MatchList";
import React from "react";

const Matches = () =>{
    return (
        <>
        <div className="p-4">
            <div className="text-xl font-bold mb-4">
                Live Matches
            </div>
            <div>
                <MatchList/>
            </div>
        </div>
        </>
    )
}
export default Matches