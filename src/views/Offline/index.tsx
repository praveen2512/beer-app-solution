import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";

const Offline = () => {
  const [isOnline, setIsOnline] = useState(true);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);
    };
  }, []);

  return isOnline ? null : (
    <article>
      <section>
        <header>
          <h1>You are offline</h1>
        </header>
        <main>
          <Grid container alignItems={"center"} direction={"column"} marginBottom={3} >
            <WifiOffOutlinedIcon sx={{ fontSize: 200 }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              You are offline
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              App needs internet to start working
            </Typography>
          </Grid>
        </main>
      </section>
    </article>
  );
};

export default Offline;
