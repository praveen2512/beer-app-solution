type TYPE =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

type SORT = "asc" | "desc";

type SORT_TYPES = "name" | "brewery_type" | "country" | "state" | "city";

type SORT_ORDERS = {
  [key: string]: SORT;
};

export type { TYPE, SORT, SORT_ORDERS, SORT_TYPES };
