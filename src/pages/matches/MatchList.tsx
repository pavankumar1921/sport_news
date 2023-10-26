import React, {useEffect} from "react";
import { fetchMacthes } from "../../context/matches/action";
import { useMatchesDispatch } from "../../context/matches/context";
import MatchListItems from "./MatchListItems";


const MatchList: React.FC = () => {
    const dispatchMatches = useMatchesDispatch()

    useEffect(()=>{
        fetchMacthes(dispatchMatches)
    },[])
    return (
        <div className="overflow-x-auto">
            <MatchListItems/>
        </div>
    )
}

export default MatchList