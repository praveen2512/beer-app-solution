import React, { useEffect, useState, useMemo, ChangeEvent } from "react";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, Link, Grid } from "@mui/material";
import styles from "./Home.module.css";

const SavedBreweries = () => {
  // State for saved breweries list
  const [savedList, setSavedList] = useState<Array<Beer>>(
    JSON.parse(localStorage.getItem("favoriteBeweries") || "[]") || []
  );

  // State for selected breweries
  const [selectedBreweries, setSelectedBreweries] = useState<Array<Beer>>([]);

  // State for tracking whether all breweries are selected
  const [allSelected, setAllSelected] = useState<boolean>(false);

  // Update localStorage when savedList changes
  useEffect(() => {
    localStorage.setItem("favoriteBeweries", JSON.stringify(savedList));
  }, [savedList]);

  // Handle checkbox selection of breweries
  const handleSelectBrewery = (
    event: ChangeEvent<HTMLInputElement>,
    brewery: Beer
  ) => {
    const isChecked = event.target.checked;
    setSelectedBreweries((prevSelected) =>
      isChecked
        ? [...prevSelected, brewery]
        : prevSelected.filter(
            (selectedBrewery) => selectedBrewery.id !== brewery.id
          )
    );
  };

  // Handle selecting/deselecting all breweries
  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllSelected(isChecked);
    setSelectedBreweries(isChecked ? savedList : []);
  };

  // Remove selected items from the saved list
  const removeSelectedItems = () => {
    const updatedList = savedList.filter(
      (brewery) =>
        !selectedBreweries.some(
          (selectedBrewery) => selectedBrewery.id === brewery.id
        )
    );
    setSavedList(updatedList);
    setSelectedBreweries([]);
    setAllSelected(false);
  };

  // Remove all saved items and clear localStorage
  const removeAllSavedItems = () => {
    setSavedList([]);
    setSelectedBreweries([]);
    setAllSelected(false);
    localStorage.removeItem("favoriteBeweries");
  };

  // Memoize the mapped saved list to avoid unnecessary re-renders
  const mappedSavedList = useMemo(() => {
    return savedList.map((brewery, index) => (
      <li key={index.toString()}>
        <Checkbox
          checked={selectedBreweries.some(
            (selectedBrewery) => selectedBrewery.id === brewery.id
          )}
          onChange={(e) => handleSelectBrewery(e, brewery)}
        />
        <Link component={RouterLink} to={`/brewery/${brewery.id}`}>
          {brewery.name}
        </Link>
      </li>
    ));
  }, [savedList, selectedBreweries, handleSelectBrewery]);

  return (
    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3>Favourites</h3>
          <div className={styles.actions}>
            {/* Button to remove selected items */}
            <Button
              variant="outlined"
              onClick={removeSelectedItems}
              disabled={!selectedBreweries.length}
            >
              Remove selected
            </Button>
            {/* Button to remove all saved items */}
            <Button
              variant="contained"
              color="error"
              onClick={removeAllSavedItems}
              disabled={!savedList.length}
            >
              Remove all
            </Button>
          </div>
        </div>
        <ul className={styles.list}>
          {!!savedList.length && (
            // Checkbox to select/deselect all breweries
            <li>
              <Checkbox checked={allSelected} onChange={handleSelectAll} />
              <Link>{"Select All"}</Link>
            </li>
          )}
          {mappedSavedList}
          {!savedList.length && (
            // Display message when no saved breweries
            <Grid container justifyContent={"center"}>
              <p>No favourite breweries</p>
            </Grid>
          )}
        </ul>
      </div>
    </Paper>
  );
};

export default SavedBreweries;
