import { useEffect, useState } from "react";
import {
  getFavoriteBeweries,
  updateFavourites,
} from "../views/BreweryList/utils";
import { Beer } from "../types";

const useBrewery = (brewery: Beer) => {
  const [savedList, setSavedList] = useState<Array<Beer>>(
    JSON.parse(localStorage.getItem("favoriteBeweries") || "[]") || []
  );

  useEffect(() => {
    updateFavourites(savedList);
  }, [savedList]);

  const addToFavorites = (brewery: Beer) => {
    setSavedList([...getFavoriteBeweries(), brewery]);
  };

  const removeFromFavorites = (brewery: Beer) => {
    const updatedFavorites = [...getFavoriteBeweries()].filter(
      (favBrewery) => favBrewery.id !== brewery.id
    );
    setSavedList(updatedFavorites);
  };

  const isFavoriteBrewery = savedList.some(
    (favBrewery) => favBrewery.id === brewery.id
  );

  return [addToFavorites, removeFromFavorites, isFavoriteBrewery];
};

export default useBrewery;
