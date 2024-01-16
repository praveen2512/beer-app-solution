import React, { useMemo, useState, useEffect, ChangeEvent } from "react";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import styles from "./Home.module.css";

interface BreweriesProps {
  breweries: Beer[];
  fetchBreweryData: () => void;
}

const Breweries = ({ breweries, fetchBreweryData }: BreweriesProps) => {
  // State for selected breweries
  const [selectedBreweries, setSelectedBreweries] = useState<Array<Beer>>([]);

  // State for filtering breweries
  const [filterValue, setFilterValue] = useState<string>("");

  // Handle checkbox selection of breweries
  const handleSelectBrewery = (
    event: ChangeEvent<HTMLInputElement>,
    brewery: Beer
  ) => {
    const isChecked = event.target.checked;
    setSelectedBreweries((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, brewery];
      } else {
        return prevSelected.filter(
          (selectedBrewery) => selectedBrewery.id !== brewery.id
        );
      }
    });
  };

  // Memoized filtered breweries array based on filterValue
  const filteredBreweries = useMemo(() => {
    return breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [breweries, filterValue]);

  // Memoized BreweriesList component to avoid unnecessary re-renders
  const BreweriesList = useMemo(() => {
    return filteredBreweries.map((brewery, index) => (
      <li key={index.toString()}>
        <Checkbox onChange={(e) => handleSelectBrewery(e, brewery)} />
        <Link component={RouterLink} to={`/brewery/${brewery.id}`}>
          {brewery.name}
        </Link>
      </li>
    ));
  }, [filteredBreweries, handleSelectBrewery]);

  return (
    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          {/* Search input for filtering breweries */}
          <TextField
            label="Search"
            placeholder="Type to search..."
            variant="outlined"
            className={styles.filter}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <div className={styles.actions}>
            {/* Button to trigger data reload */}
            <Button
              variant="contained"
              onClick={fetchBreweryData}
              startIcon={<RefreshRounded />}
            >
              Reload list
            </Button>
          </div>
        </div>
        {/* List of breweries */}
        <ul className={styles.list}>{BreweriesList}</ul>
      </div>
    </Paper>
  );
};

export default Breweries;
