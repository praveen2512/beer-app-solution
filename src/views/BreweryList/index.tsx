import React, { useEffect, useState, ChangeEvent } from "react";
import { List, TextField, Pagination, Grid, IconButton } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { Box, CircularProgress } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";

import Breadcrumb from "../../components/Breadcrumb";
import BreweryListItem from "./BreweryListItem";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { SORT_ORDERS, SORT_TYPES } from "../../types";

import styles from "./BreweryList.module.css";

const BreweryList: React.FC = () => {
  // State for the list of breweries
  const [breweryList, setBreweryList] = useState<Array<Beer>>([]);

  // State for loading status
  const [fetching, setFetching] = useState<boolean>();

  // State for the filtered list of breweries
  const [filteredBreweries, setFilteredBreweries] = useState<Array<Beer>>([]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  // State for sorting orders
  const [sortOrders, setSortOrders] = useState<SORT_ORDERS[]>([
    {
      name: "asc",
      brewery_type: "asc",
      country: "asc",
      state: "asc",
      city: "asc",
    },
  ]);

  // Number of breweries to display per page
  const breweriesPerPage: number = 10;

  // State for filters
  const [nameFilter, setNameFilter] = useState<string>("");
  const [breweryTypeFilter, setBreweryTypeFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");

  const FILTERS = [
    { name: "Name", key: "name", label: "Name", value: nameFilter },
    {
      name: "Type",
      key: "brewery_type",
      label: "Type",
      value: breweryTypeFilter,
    },
    { name: "Country", key: "country", label: "Country", value: countryFilter },
    { name: "State", key: "state", label: "State", value: stateFilter },
    { name: "City", key: "city", label: "City", value: cityFilter },
  ];

  const fetchBreweryData = () => {
    fetchData(setBreweryList, setFetching);
  };

  // Fetch brewery data on component mount
  useEffect(() => {
    fetchBreweryData();
  }, []);

  // Update filteredBreweries when breweryList changes
  useEffect(() => {
    setFilteredBreweries(breweryList);
  }, [breweryList]);

  // Filter breweries based on search term and filters
  useEffect(() => {
    filterBreweries();
  }, [
    searchTerm,
    nameFilter,
    breweryTypeFilter,
    cityFilter,
    stateFilter,
    countryFilter,
    breweryList,
  ]);

  // Handle search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter breweries based on search term and filters
  const filterBreweries = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let filtered = breweryList.filter((brewery: Beer) =>
      Object.values(brewery).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );

    // Apply additional filters
    if (!!nameFilter) {
      filtered = filtered.filter(
        (brewery: Beer) => brewery.name === nameFilter
      );
    }
    if (!!breweryTypeFilter) {
      filtered = filtered.filter(
        (brewery: Beer) => brewery.brewery_type === breweryTypeFilter
      );
    }
    if (!!cityFilter) {
      filtered = filtered.filter(
        (brewery: Beer) => brewery.city === cityFilter
      );
    }
    if (!!stateFilter) {
      filtered = filtered.filter(
        (brewery: Beer) => brewery.state === stateFilter
      );
    }
    if (!!countryFilter) {
      filtered = filtered.filter(
        (brewery: Beer) => brewery.country === countryFilter
      );
    }

    setFilteredBreweries(filtered);
    setCurrentPage(1);
  };

  // Apply sorting for given sort key and sort order
  const handleSortChange = (sortKey: SORT_TYPES) => {
    const filteredList = [...filteredBreweries];
    const sortKeyOrder = sortOrders[sortKey as keyof typeof sortOrders];

    setSortOrders((prevOrders) => {
      const sortOrder =
        (prevOrders[sortKey as keyof typeof prevOrders] as unknown) === "asc"
          ? "desc"
          : "asc";
      return { ...prevOrders, [sortKey]: sortOrder };
    });

    filteredList.sort((a: Beer, b: Beer) => {
      const keyA = a[sortKey]?.toString();
      const keyB = b[sortKey]?.toString();

      if (keyA !== keyB) {
        if (typeof sortKeyOrder === "string" && sortKeyOrder === "desc") {
          return keyA.localeCompare(keyB);
        } else {
          return keyB.localeCompare(keyA);
        }
      }
      return 0;
    });
    setFilteredBreweries(filteredList);
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (event: SelectChangeEvent, filterKey: string) => {
    console.log(event.target.value);
    switch (filterKey) {
      case "name": {
        setNameFilter(event.target.value.toString() || "");
        break;
      }
      case "brewery_type": {
        setBreweryTypeFilter(event.target.value);
        break;
      }
      case "city": {
        setCityFilter(event.target.value);
        break;
      }
      case "state": {
        setStateFilter(event.target.value);
        break;
      }
      case "country": {
        setCountryFilter(event.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const indexOfLastBrewery: number = currentPage * breweriesPerPage;
  const indexOfFirstBrewery: number = indexOfLastBrewery - breweriesPerPage;

  // Handle pagination change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <article>
      <section>
        <header>
          <Breadcrumb
            links={[
              { name: "Home", path: "/" },
              { name: "Breweries", path: "" },
            ]}
          />
          <h1>Brewery List</h1>
          <Box marginY={2}>
            <Card>
              <CardContent>
                <div className={styles.filterWrapper}>
                  <TextField
                    id="brewery-search"
                    label="Search"
                    placeholder="Type to search..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.filter}
                  />
                </div>
                {/* Filters */}
                <div className={styles.filterWrapper}>
                  {FILTERS.map((filter, i) => {
                    return (
                      <Grid key={i} container alignItems={"center"}>
                        <Grid item xs={12} sm={10} md={11}>
                          <FormControl fullWidth key={i}>
                            <InputLabel id={`${filter.key}-filter-label`}>
                              {filter.name}
                            </InputLabel>
                            <Select
                              labelId={`${filter.key}-filter-label`}
                              id={`${filter.key}-filter`}
                              value={filter.value}
                              label={filter.label}
                              onChange={(e) =>
                                handleFilterChange(e, filter.key)
                              }
                            >
                              <MenuItem value={""}>Select</MenuItem>
                              {[
                                ...new Set(
                                  breweryList.map(
                                    (item: any) => item[filter.key]
                                  )
                                ),
                              ].map((menu: string, i: number) => (
                                <MenuItem key={i} value={menu}>
                                  {menu}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} md={1}>
                          <IconButton
                            title={`Sort by ${filter.name}`}
                            onClick={() =>
                              handleSortChange(filter.key as SORT_TYPES)
                            }
                          >
                            <SwapVertOutlinedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Box>
        </header>
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
              {!!filteredBreweries.length ? (
                <>
                  <Box marginY={2}>
                    <Card>
                      <CardContent>
                        <List>
                          {filteredBreweries
                            .slice(indexOfFirstBrewery, indexOfLastBrewery)
                            .map((brewery) => (
                              <BreweryListItem
                                key={brewery.id}
                                brewery={brewery}
                              />
                            ))}
                        </List>
                        {/* Pagination */}
                        <Grid
                          container
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <p>
                            Showing {indexOfFirstBrewery + 1} to{" "}
                            {Math.min(
                              indexOfLastBrewery,
                              filteredBreweries.length
                            )}{" "}
                            of {filteredBreweries.length} entries
                          </p>
                          <Pagination
                            count={Math.ceil(
                              filteredBreweries.length / breweriesPerPage
                            )}
                            page={currentPage}
                            onChange={(event, page) => paginate(page)}
                          />
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                </>
              ) : (
                // Display no breweries message
                <Grid container justifyContent="center">
                  <p>No breweries found</p>
                </Grid>
              )}
            </>
          )}
        </main>
      </section>
    </article>
  );
};

export default BreweryList;
