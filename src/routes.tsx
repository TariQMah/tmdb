import { Routes, Route } from "react-router-dom";
import HomePageComponent from "./pages/Home/HomePage";
import DetailsPageComponent from "./pages/Details/DetailsPage";
import StatsPageComponent from "./pages/Stats/StatsPage";
import SearchPageComponent from "./pages/Search/SearchPage";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageComponent />} />
      <Route path="/movie/:id" element={<DetailsPageComponent />} />
      <Route path="/stats" element={<StatsPageComponent />} />
      <Route path="/search" element={<SearchPageComponent />} />
    </Routes>
  );
};
