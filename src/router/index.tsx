import { lazy, Suspense, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Offline from "../views/Offline";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

const Home = lazy(() => import("../views/Home"));
const BreweryList = lazy(() => import("../views/BreweryList"));
const Brewery = lazy(() => import("../views/Brewery"));
const NotFound = lazy(() => import("../views/404"));

const Router = () => (
  <BrowserRouter>
    <Menu>
      <Offline />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="brewery">
            <Route index element={<BreweryList />} />
            <Route path=":id" element={<Brewery />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Menu>
  </BrowserRouter>
);

export default Router;
