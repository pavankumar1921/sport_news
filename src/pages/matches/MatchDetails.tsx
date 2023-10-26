import React ,{useEffect,useState} from "react";
// import { matchDetails } from "../../context/matches/action";
import { useMatchesDispatch } from "../../context/matches/context";
import { API_ENDPOINT } from "../../config/constants";

interface completeMatch {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: { [teamName: string]: string };
  teams: { id: number; name: string }[];
  sportName: string;
  playingTeam: number;
  story: string;
}


const MatchDetails: React.FC<{id:number}> = ({id}) =>{
  const [matchData,setMatchData] = useState<completeMatch|null>(null)
  const [isOpen,setIsOpen] = useState(false)
  const [isFetching,setIsFetching] = useState(false)
  // const dispatch = useMatchesDispatch()

  const completeMatchDetails = async()=> {
    setIsFetching(true)
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      });
      if(!response.ok){
        throw new Error("Cannot fetch match details")
      }
      const data = await response.json();
      setMatchData(data)
    } catch (error) {
      console.log('Error fetching matches',error);
    }finally{
      setIsFetching(false)
    }
  };
  const openModal = () =>{
    setIsOpen(true)
  }

  const closeModal = () =>{
    setIsOpen(false)
  }

 

  useEffect(()=>{
    completeMatchDetails()
  },[id])

  return(
    <>
      {matchData &&  (
        <div>
          <ul>
            {Object.keys(matchData.score).map((teamName) => (
              <li key={teamName}>
                {teamName}: {matchData.score[teamName]}
              </li>
            ))}
          </ul>
        </div>
      )}
     

    </>
  )
}

export default MatchDetails



