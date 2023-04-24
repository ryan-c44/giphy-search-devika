import * as React from "react";
import  { useEffect, useState } from "react";
import axios from "axios";

import { environment } from "../Environment/environment";
import Paginate from "./Paginate";
import Error from "./Error";
import Search from "./Search";
import Gifs from "./Gifs";

import { Gif, Parameters } from "../Models/Model";

const GiphySearch = (): React.ReactElement => {
  const searchUrl: string = environment.app_config.apiUrl + "search";
  const trendingUrl: string = environment.app_config.apiUrl + "trending";

  const [data, setData] = useState([] as Gif[]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [params, setParams] = useState<Parameters>({
    api_key: environment.app_config.apiKey,
    limit: 100
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGifs = data.slice(indexOfFirstItem, indexOfLastItem);  

  useEffect(() => {
    setParams({...params, q: search})
  }, [search])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      fetchGifs(trendingUrl);
    };
    fetchData();
  }, [] as Gif[]);

  const fetchGifs = async (url: string): Promise<void> => {
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios(url, {
        params: params
      });
      setData(results.data.data);
    }
    catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
    setIsLoading(false);
  }

  const renderError = () => {
    if (isError) {
      return (
        <Error />
      );
    } else 
      return;
  };

  const handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>)=> {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event : React.MouseEvent) => {
    event.preventDefault();
    fetchGifs(searchUrl);
  };

  const pageSelected = (pageNumber : number) => {
    setCurrentPage(pageNumber);
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