import React, {useEffect} from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticleList: React.FC = () =>{
    const dispatchArticles = useArticlesDispatch()
    
    useEffect(()=>{
        fetchArticles(dispatchArticles)
    },[])
    return (
        <div>
            <ArticleListItems/>
        </div>
    )
}

export default ArticleList