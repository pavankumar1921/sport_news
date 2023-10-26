import React ,{useEffect,useState} from "react";
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

  const handleRefresh = ()=>{
    completeMatchDetails()
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
      <button onClick={handleRefresh} disabled={isFetching}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${isFetching ? 'animate-spin' : ''} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
      </button>

    </>
  )
}

export default MatchDetails



