import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Breadcrumb from "../../components/Breadcrumb";
import BreweryCard from "./BreweryCard";

import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";

const Brewery = () => {
  // Get the brewery ID from the route parameters
  const { id } = useParams();

  // State for the brewery data
  const [brewery, setBrewery] = useState<IBeer>();

  // State for the loading status
  const [fetching, setFetching] = useState<boolean>();

  // Function to fetch brewery data
  const fetchBreweryData = () => {
    fetchData(setBrewery, setFetching, id);
  };

  // Fetch brewery data when the component mounts or when the ID changes
  useEffect(() => {
    fetchBreweryData();
  }, [id]);

  return (
    <article>
      <section>
        <header>
          <Breadcrumb
            links={[
              { name: "Home", path: "/" },
              { name: "Breweries", path: "/brewery" },
              { name: `${brewery?.name?.toString()}`, path: "" },
            ]}
          />
        </header>
        <main>
          {/* Display loading spinner while fetching data */}
          {fetching ? (
            <Box
              height={"100vh"}
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
              sx={{ display: "flex" }}
            >
              <CircularProgress />
            </Box>
          ) : (
            // Display BreweryCard once data is fetched
            <BreweryCard brewery={brewery} />
          )}
        </main>
      </section>
    </article>
  );
};

export default Brewery;
