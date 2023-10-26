import { useArticlesState } from "../../context/articles/context";
import React, { useState, useEffect } from "react";
import ArticleDetails from "./ArticleDetails";

export default function ArticleListItems() {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState("All");
  let [sports, setSports] = useState<string[]>([]);
const [sortOrder,setSortOrder] = useState("date")

  useEffect(() => {
    if (articles) {
      const uniqueSports = Array.from(new Set(articles.map((article: any) => article.sport.name)));

      setSports(uniqueSports);
    }
  }, [articles]);

  const fullArticleDetails = (id:number) =>{
    return <ArticleDetails id={id} />
  }
   const handleRugbyButtonClick = () => {
    setSelectedSport("Rugby");
  };
  if (isLoading && articles.length === 0) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const filteredArticles = articles
  .filter((article) => selectedSport === "All" || article.sport.name === selectedSport
  )
  .sort((a,b)=>{
    if(sortOrder === 'date'){
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    }else if(sortOrder === 'title'){
      return a.title.localeCompare(b.title)
    }
  })
  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <label>Filter by Sport: </label>
        <div className="space-x-4">
        <button
            onClick={() => setSelectedSport("All")}
            className={`px-4 py-2 rounded border ${selectedSport === "All" ? "border-green-500" : "border-gray-300"} ${
              selectedSport === "All" ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            All
          </button>
          {sports.map((sport, index) => (
            <button
              key={index}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded border ${selectedSport === sport ? "border-green-500" : "border-gray-300"} ${
                selectedSport === sport ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              {sport}
            </button>
            
          ))}
          <button
            onClick={handleRugbyButtonClick}
            className={`px-4 py-2 rounded border ${selectedSport === "Rugby" ? "border-green-500" : "border-gray-300"} ${
              selectedSport === "Rugby" ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            Rugby
          </button>
          <label>Sort by:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}  className="px-4 py-2 rounded border border-gray-300">
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {filteredArticles && filteredArticles.length > 0 ? (
          filteredArticles
            .filter((article: any) => selectedSport === "All" || article.sport.name === selectedSport)
            .map((article: any) => (
              
              <div key={article.id} className="border rounded-lg shadow-lg p-4">
                <h5 className="font-semibold">{article.sport.name}</h5>
                <h4 className="text-gray-500">{article.title}</h4>
                <h3>{new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</h3>
                <p>{article.summary}</p>
                <div>{fullArticleDetails(article.id)}</div>
              </div>
            ))
        ) : (
          <span>No articles available for the selected sport.</span>
        )}
      </div>
    </div>
  );
}
