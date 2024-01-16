import { getRandomBeerList } from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = (
  setData: (data: Array<Beer>) => void,
  setFetching: (fetching: boolean) => void
) => {
  (async () => {
    try {
      setFetching(true);
      const { data } = await getRandomBeerList(10);
      setData(data);
      setFetching(false);
    } catch (error) {
      handle(error);
      setFetching(false);
    }
  })();
};

export { fetchData };
