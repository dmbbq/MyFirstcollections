import React from "react";
import "./index.scss";
import { Collection } from "./Collection";
import { useState, useEffect } from "react";

const cats = [
  { name: "Всі" },
  { name: "Море" },
  { name: "Гори" },
  { name: "Архітектура" },
  { name: "Міста" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";
  

    fetch(`https://64bf99b20d8e251fd1111798.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при передачі данних");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId,page]);

  return (
    <div className="App">
      <h1>Моя колекція фотографій</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Пошук по назві"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2> Йде загрузка...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
