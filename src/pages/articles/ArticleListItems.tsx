import { useArticlesState } from "../../context/articles/context";
import React, { useState, useEffect } from "react";
import ArticleDetails from "./ArticleDetails";
import { API_ENDPOINT } from "../../config/constants";

export default function ArticleListItems() {
  const state = useArticlesState();

  interface PreferencesState {
    choice: { id: string; name: string; category: string }[];
  }

  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState("All");
  let [sports, setSports] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("date");
  const [preferences, setPreferences] = useState<PreferencesState>({
    choice: [],
  });

  useEffect(() => {
    if (articles) {
      const uniqueSports = Array.from(
        new Set(articles.map((article: any) => article.sport.name))
      );

      setSports(uniqueSports);
    }
  }, [articles]);

  useEffect(() => {
    const fetchPreferences = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setPreferences(data.preferences);
        console.log("fetched", data.preferences);
      }
    };
    fetchPreferences();
  }, []);

  const user = localStorage.getItem("authToken");
  const fullArticleDetails = (id: number) => {
    return <ArticleDetails id={id} />;
  };
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
    .filter(
      (article) =>
        selectedSport === "All" || article.sport.name === selectedSport
    )
    .sort((a, b) => {
      if (sortOrder === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      } else if (sortOrder === "title") {
        return a.title.localeCompare(b.title);
      }
    });
  return (
    <>
      {user && preferences.choice && preferences.choice.length > 0 ? (
        <>
          <div className="mb-4">
            <div className="py-2">
              <label className="font-medium">Filter by Sport: </label>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setSelectedSport("All")}
                className={`px-4 py-2 rounded border text-black ${
                  selectedSport === "All"
                    ? "border-black-500"
                    : "border-gray-300"
                } ${selectedSport === "All" ? "bg-teal-400" : "bg-gray-200"}`}
              >
                All
              </button>
              {sports.map(
                (sport, index) =>
                  preferences.choice.some((item) => item.name === sport) && (
                    <button
                      key={index}
                      onClick={() => setSelectedSport(sport)}
                      className={`px-4 py-2 rounded border ${
                        selectedSport === sport
                          ? "border-green-500"
                          : "border-gray-300"
                      } ${
                        selectedSport === sport ? "bg-teal-400" : "bg-gray-200"
                      }`}
                    >
                      {sport}
                    </button>
                  )
              )}
            </div>
            <div className="mb-4">
              <div className="py-2">
                <label className="font-medium">Sort by:</label>
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          {preferences &&
          preferences.choice.some((item) => item.category === "sports") ? (
            <div className="flex flex-col gap-3">
              {filteredArticles && filteredArticles.length > 0 ? (
                filteredArticles
                  .filter(
                    (article: any) =>
                      (selectedSport === "All" ||
                        article.sport.name === selectedSport) &&
                      preferences.choice.some(
                        (item) => item.category === "sports"
                      ) &&
                      preferences.choice.some(
                        (item) => item.name === article.sport.name
                      )
                  )
                  .map((article: any) => (
                    <div
                      key={article.id}
                      className="border rounded-lg bg-gray-100 shadow-lg p-4"
                    >
                      <div className="flex ">
                        <div className="w-2/3 pr-4">
                          <h1 className="font-semibold">
                            {article.sport.name}
                          </h1>
                          <h2 className="text-gray-700 py-2">
                            {article.title}
                          </h2>
                          <div className="flex gap-3 pb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>
                            <h3>
                              {new Date(article.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </h3>
                          </div>
                          <p className="pb-2">{article.summary}</p>
                          <div>{fullArticleDetails(article.id)}</div>
                        </div>
                        <div className="w-1/3">
                          <img
                            src={article.thumbnail}
                            className="w-40 h-40 mx-auto rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <span>No articles available for the selected sport.</span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredArticles && filteredArticles.length > 0 ? (
                filteredArticles
                  .filter(
                    (article: any) =>
                      selectedSport === "All" ||
                      article.sport.name === selectedSport
                  )
                  .map((article: any) => (
                    <div
                      key={article.id}
                      className="border rounded-lg bg-gray-100 shadow-lg p-4"
                    >
                      <div className="flex">
                        <div className="w-2/3 pr-4">
                          <h1 className="font-semibold">
                            {article.sport.name}
                          </h1>
                          <h2 className="text-gray-700 py-2">
                            {article.title}
                          </h2>
                          <div className="flex gap-3 pb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>
                            <h3>
                              {new Date(article.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </h3>
                          </div>
                          <p>{article.summary}</p>
                          <div>{fullArticleDetails(article.id)}</div>
                        </div>
                        <div className="w-1/3">
                          <img
                            src={article.thumbnail}
                            className="w-40 h-40 mx-auto rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <span>No articles available for the selected sport.</span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="w-full p-4">
          <div className="mb-4">
            <label>Filter by Sport: </label>
            <div className="space-x-4">
              <button
                onClick={() => setSelectedSport("All")}
                className={`px-4 py-2 rounded border ${
                  selectedSport === "All"
                    ? "border-green-500"
                    : "border-gray-300"
                } ${selectedSport === "All" ? "bg-green-100" : "bg-gray-100"}`}
              >
                All
              </button>
              {sports.map((sport, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-4 py-2 rounded border ${
                    selectedSport === sport
                      ? "border-green-500"
                      : "border-gray-300"
                  } ${
                    selectedSport === sport ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {sport}
                </button>
              ))}
              <button
                onClick={handleRugbyButtonClick}
                className={`px-4 py-2 rounded border ${
                  selectedSport === "Rugby"
                    ? "border-green-500"
                    : "border-gray-300"
                } ${
                  selectedSport === "Rugby" ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                Rugby
              </button>
              <label>Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {filteredArticles && filteredArticles.length > 0 ? (
              filteredArticles
                .filter(
                  (article: any) =>
                    selectedSport === "All" ||
                    article.sport.name === selectedSport
                )
                .map((article: any) => (
                  <div
                    key={article.id}
                    className="border rounded-lg bg-gray-100 shadow-lg p-4"
                  >
                    <div className="flex">
                      <div className="w-2/3 pr-4">
                        <h1 className="font-semibold">{article.sport.name}</h1>
                        <h2 className="text-gray-700 py-2">{article.title}</h2>
                        <div className="flex gap-3 pb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                          <h3>
                            {new Date(article.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </h3>
                        </div>
                        <p>{article.summary}</p>
                        <div>{fullArticleDetails(article.id)}</div>
                      </div>
                      <div className="w-1/3">
                        <img
                          src={article.thumbnail}
                          className="w-40 h-40 mx-auto rounded"
                        />
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <span>No articles available for the selected sport.</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
