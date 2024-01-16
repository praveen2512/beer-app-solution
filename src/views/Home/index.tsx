import React, { useEffect, useState, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";

import Breweries from "./Breweries";
import SavedBreweries from "./SavedBreweries";
import { fetchData } from "./utils";
import { Beer } from "../../types";

const Home = () => {
  // Use React.memo for Breweries component to prevent unnecessary re-renders
  const MemoizedBreweries = React.memo(Breweries);

  // Use React.memo for SavedBreweries component to prevent unnecessary re-renders
  const MemoizedSavedBreweries = React.memo(SavedBreweries);

  const [breweries, setBreweryList] = useState<Array<Beer>>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  // Fetch data using useCallback to prevent unnecessary recreation of the function
  const fetchBreweryData = useCallback(() => {
    fetchData(setBreweryList, setFetching);
  }, []);

  // Use dependency array [] for useEffect since fetchBreweryData doesn't change
  useEffect(() => {
    fetchBreweryData();
  }, [fetchBreweryData]);

  return (
    <article>
      <section>
        <main>
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
            <>
              <MemoizedBreweries
                breweries={breweries}
                fetchBreweryData={fetchBreweryData}
              />
              <MemoizedSavedBreweries />
            </>
          )}
        </main>
      </section>
    </article>
  );
};

export default Home;
