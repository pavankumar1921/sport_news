import React, { useState,useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "../articles/ArticleDetails";
import { API_ENDPOINT } from "../../config/constants";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchTeams } from "../../context/teams/action";
import { useTeamsDispatch } from "../../context/teams/context";

export default function Favourites(){
    const state = useArticlesState()
    const {articles, isLoading, isError, errorMessage} = state

    if(articles.length === 0 && isLoading){
        return <span>Loading ....</span>
    }
    if (isError){
        return <span>{errorMessage}</span>
    }

    const fullArticleDetails =(id:number) =>{
        return <ArticleDetails id={id}/>
    }

    type Sports ={
        id:number
        name:string
    }

    type Teams = {
        id:number
        name: string
        plays:string
    }

    const [sportsData,setSportsData] = useState<Sports[]>([])
    const [selectedSport,setSelectedSport] = useState<number | null>(null)

    const [teamsData,setTeamsData] = useState<Teams[]>([])
    const [selectedTeam,setSelectedTeam] = useState<number | null>(null)

    useEffect(()=>{
        const fetchSportsData = async() =>{
            const response = await fetch(`${API_ENDPOINT}/sports`,{
                method: "GET"
            })
            const data = await response.json()
            setSportsData(data.sports)
        }
        const fetchTeamsData = async() =>{
            const response = await fetch(`${API_ENDPOINT}/teams`,{
                method: "GET"
            })
            const data = await response.json()
            setTeamsData(data)
        }
        fetchSportsData()
        fetchTeamsData()
    },[])

    useEffect(()=>{
        if(selectedSport != null) {
            fetchArticles(useArticlesDispatch)
        }
    },[])

    const dispatchTeams = useTeamsDispatch()
    
    useEffect(()=>{
        if(selectedTeam != null) {
            fetchTeams(dispatchTeams)
        }
    })

    const selectSport = (id:number |null) =>{
        setSelectedSport(id)
        setSelectedTeam(null)
    }
    const selectTeam = (id:number | null )=>{
        setSelectedTeam(id)
    }

    const filteredArticles= articles.filter((article:any)=>{
        if(selectedSport !== null) {
            const sportArticles = article.sport.id === selectedSport
            const teamArticles = selectedTeam === null || Object.values(article.teams).some((team:any) => team.id === selectedTeam)
            return sportArticles && teamArticles
        }else{
            return true
        }
    })

    return (
        <>
        <div>
            <p>Favourites</p>
            <select name="sports" id="sports" onChange={(e)=>selectSport(parseInt(e.target.value,10)||null)} className="p-2 border rounded-lg">
                <option value="" >Select sport</option>
                {sportsData.map(
                    (sport:any)=>(
                        <option key={sport.id} value={sport.id}>{sport.name}</option>
                    )
                )}
                </select>
            {teamsData && (
            <select name="teams" id="teams" onChange={(e) => selectTeam(parseInt(e.target.value, 10) || null)} className="p-2 border rounded-lg">
                <option value="">Select team</option>
                {teamsData
                .filter(
                (team) =>
                selectedSport === null ||
                sportsData.find((sport) => sport.id === selectedSport)?.name === team.plays
                )
                .map((team: any) => (
                <option key={team.id} value={team.id}>
                    {team.name}
                </option>
                ))}
            </select>
            )}

                <div className="flex flex-col gap-3">
                    {filteredArticles.map((article:any)=>(
                        <div key={article.id} className="border rounded-lg shadow-lg p-4">
                            <h2>{article.sport.name}</h2>
                            <h2>{article.title}</h2>
                            <p>{article.summary}</p>
                            <div>{fullArticleDetails(article.id)}</div>
                        </div>
                    ))}
                </div>
                
                </div>
                </>
    )
}