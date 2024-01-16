import { getBeer } from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = (
  setData: (data: Beer) => void,
  setFetching: (fetching: boolean) => void,
  id?: string
) => {
  if (!id) return;

  (async () => {
    try {
      setFetching(true);
      const response = await getBeer(id);
      setData(response.data);
      setFetching(false);
    } catch (error) {
      handle(error);
      setFetching(false);
    }
  })();
};

export { fetchData };
