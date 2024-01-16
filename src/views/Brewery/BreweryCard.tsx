import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavouriteIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import MapView from "./MapView";

import useBrewery from "../../hooks/useBrewery";

import { Beer } from "../../types";

interface BreweryCardProps {
  brewery?: Beer;
}

const BreweryCard: React.FC<BreweryCardProps> = ({ brewery }) => {
  // Custom hook for managing favorites
  const [addToFavorites, removeFromFavorites, isFavoriteBrewery] = useBrewery(
    brewery || ({} as Beer)
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader title={brewery?.name} subheader={brewery?.brewery_type} />

        <CardMedia
          component="img"
          height="300"
          image="/beer-hd.jpeg"
          alt="Brewery"
        />

        <CardContent>
          <Grid container marginY={5}>
            {/* Address section */}
            <Grid
              container
              item
              xs={12}
              md={6}
              alignItems={"center"}
              columnSpacing={2}
            >
              <Grid item>
                <PlaceOutlinedIcon color="info" />
              </Grid>
              <Grid item>
                <p>
                  {brewery?.address_1}, {brewery?.address_2}
                </p>
                <p>
                  {brewery?.city}, {brewery?.state} - {brewery?.postal_code}
                </p>
                <p>{brewery?.country}</p>
              </Grid>
            </Grid>

            {/* Phone section */}
            <Grid
              container
              item
              xs={12}
              md={6}
              alignItems={"center"}
              columnSpacing={2}
            >
              <Grid container item alignItems={"center"} columnGap={2}>
                <LocalPhoneOutlinedIcon color="info" />
                <p>{brewery?.phone}</p>
              </Grid>
              <Grid container item alignItems={"center"} columnGap={2}>
                <LanguageOutlinedIcon color="info" />
                <a href={brewery?.website_url} target="_blank" rel="noreferrer">
                  {brewery?.website_url}
                </a>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions disableSpacing>
          <Grid container justifyContent={"space-between"}>
            {/* Favorites button */}
            <Grid item xs={6}>
              <IconButton
                aria-label="favourite"
                color={isFavoriteBrewery ? "error" : "default"}
                title={
                  isFavoriteBrewery
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFavoriteBrewery) {
                    if (typeof removeFromFavorites === "function" && brewery) {
                      removeFromFavorites(brewery);
                    }
                  } else {
                    if (typeof addToFavorites === "function" && brewery) {
                      addToFavorites(brewery as Beer);
                    }
                  }
                }}
              >
                {isFavoriteBrewery ? (
                  <FavouriteIcon />
                ) : (
                  <FavoriteOutlinedIcon />
                )}
              </IconButton>
            </Grid>

            {/* Location and Website buttons */}
            <Grid
              container
              item
              xs={6}
              md={6}
              justifyContent={"flex-end"}
              columnSpacing={3}
            >
              <IconButton
                aria-label="view location"
                title="View location"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  // setOpen(true);
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${brewery?.latitude},${brewery?.longitude}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <MapOutlinedIcon />
              </IconButton>

              <IconButton
                aria-label="open website"
                title="Go to website"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `${brewery?.website_url}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <LaunchOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {!!open && <MapView brewery={brewery} open={open} setOpen={setOpen} />}
    </>
  );
};

export default BreweryCard;
