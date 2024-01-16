import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import { Beer } from "../../types";

interface BreweryCardProps {
  brewery?: Beer;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapView: React.FC<BreweryCardProps> = ({ brewery, open, setOpen }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        onClose={handleClose}
      >
        <DialogTitle>{brewery?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {!!brewery?.latitude && !!brewery?.longitude && (
              <div>
                {!isLoaded ? (
                  <h1>Loading map...</h1>
                ) : (
                  <GoogleMap
                    zoom={20}
                    mapContainerClassName="map-container"
                    center={{
                      lat: Number(brewery?.latitude),
                      lng: Number(brewery?.longitude),
                    }}
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                  >
                    <MarkerF
                      position={{
                        lat: Number(brewery?.latitude),
                        lng: Number(brewery?.longitude),
                      }}
                    />
                  </GoogleMap>
                )}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MapView;
