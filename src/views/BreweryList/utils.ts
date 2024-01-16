import { getBeerList } from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

export const fetchData = (setData: (data: Array<Beer>) => void, setFetching: (fetching: boolean) => void,) => {
  (async () => {
    try {
      setFetching(true);
      const response = await getBeerList();
      setData(response.data);
      setFetching(false);
    } catch (error) {
      handle(error);
      setFetching(false);
    }
  })();
};

export const addToFavorites = (brewery: Beer) => {
  try {
    const favorites: Beer[] = getFavoriteBeweries();
    // Check if brewery is already in favorites
    if (!isFavoriteBrewery(brewery)) {
      localStorage.setItem(
        "favoriteBeweries",
        JSON.stringify([...favorites, { ...brewery, isFavorite: true }])
      );
    }
  } catch (error) {}
};

export const updateFavourites = (beweries: Beer[]) => {
  try {
    localStorage.setItem("favoriteBeweries", JSON.stringify(beweries));
  } catch (error) {}
};

export const getFavoriteBeweries = () => {
  const favorites: Beer[] =
    (JSON.parse(localStorage.getItem("favoriteBeweries") || "[]") as Beer[]) ||
    [];
  return favorites;
};

export const isFavoriteBrewery = (brewery: Beer) => {
  const favorites: Beer[] = getFavoriteBeweries();
  return favorites.some((favBrewery) => favBrewery.id === brewery.id);
};
