import React, { useState,useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "../articles/ArticleDetails";
import { API_ENDPOINT } from "../../config/constants";
import { useArticlesDispatch } from "../../context/articles/context";

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

    const[sportsData,setSportsData] = useState<Sports[]>([])
    const [selectedSport,setSelectedSport] = useState<number |null>(null)

    useEffect(()=>{
        const fetchSportsData = async() =>{
            const response = await fetch(`${API_ENDPOINT}/sports`,{
                method: "GET"
            })
            const data = await response.json()
            setSportsData(data.sports)
        }
        fetchSportsData()
    },[])

    useEffect(()=>{
        if(selectedSport != null) {
            fetchArticles(useArticlesDispatch)
        }
    },[])

    const selectSport = (id:number |null) =>{
        setSelectedSport(id)
    }

    const filteredArticles= articles.filter((article:any)=>{
        if(selectedSport !== null) {
            const sportArticles = article.sport.id === selectedSport
            return sportArticles
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