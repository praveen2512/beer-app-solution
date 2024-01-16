import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import FavouriteIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import { Beer } from "../../types";
import useBrewery from "../../hooks/useBrewery";

interface BreweryListItemProps {
  brewery: Beer;
}

const BreweryListItem: React.FC<BreweryListItemProps> = ({ brewery }) => {
  const navigate = useNavigate();

  // Custom hook for managing favorites
  const [addToFavorites, removeFromFavorites, isFavoriteBrewery] = useBrewery(
    brewery || ({} as Beer)
  );

  // Handle click on the list item
  const handleListItemClick = () => {
    navigate(`/brewery/${brewery.id}`);
  };

  // Handle click on the map icon
  const handleMapIconClick = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Handle click on the favorite icon
  const handleFavoriteIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Toggle favorites
    if (isFavoriteBrewery) {
      if (typeof removeFromFavorites === "function" && brewery) {
        removeFromFavorites(brewery);
      }
    } else {
      if (typeof addToFavorites === "function" && brewery) {
        addToFavorites(brewery as Beer);
      }
    }
  };

  return (
    <ListItemButton onClick={handleListItemClick}>
      <ListItemAvatar>
        <Avatar>
          <SportsBarIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={brewery.name}
        secondary={`${brewery.brewery_type} - ${brewery.city}, ${brewery.state}, ${brewery.country}`}
      />
      {/* Map icon for opening Google Maps */}
      <IconButton
        color="primary"
        title="Open in Google Maps"
        onClick={handleMapIconClick}
      >
        <MapOutlinedIcon />
      </IconButton>
      {/* Favorite icon for adding/removing from favorites */}
      <IconButton
        color={isFavoriteBrewery ? "error" : "default"}
        title={isFavoriteBrewery ? "Remove from favorites" : "Add to favorites"}
        onClick={handleFavoriteIconClick}
      >
        {isFavoriteBrewery ? <FavouriteIcon /> : <FavoriteOutlinedIcon />}
      </IconButton>
    </ListItemButton>
  );
};

export default BreweryListItem;
