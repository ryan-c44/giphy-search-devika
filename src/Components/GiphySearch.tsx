import * as React from "react";
import  { useEffect, useState } from "react";
import axios from "axios";

import Paginate from "./Paginate";
import Error from "./Error";
import Search from "./Search";
import Gifs from "./Gifs";

import { Gif } from "../Models/Model";

const GiphySearch = (): React.ReactElement => {
  const [data, setData] = useState([] as Gif[]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGifs = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "fYu0J9pzZqrTnHu2IvQlU6YGFLCm9PDQ",
            limit: 100
          }
        });
        setData(results.data.data);
      } 
      catch (err) 
      {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [] as Gif[]);
  
  const renderError = () => {
    if (isError) {
      return (
        <Error />
      );
    } else 
      return;
  };

  const handleSubmit = async (event : React.MouseEvent) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "fYu0J9pzZqrTnHu2IvQlU6YGFLCm9PDQ",
          q: search,
          limit: 200
        }
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };

  const pageSelected = (pageNumber : number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>)=> {
    setSearch(event.target.value);
  };

  return (
    <div className="m-4">
      {renderError()}
      <Search 
        search={search}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
      <Gifs
        isLoading={isLoading}
        currentGifs={currentGifs}
      />
    </div>
  );
};

export default GiphySearch;