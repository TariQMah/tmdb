import { RoutesComponent } from "./routes";
import "./App.scss";
import TopNav from "./components/TopNav";
import { login } from "./redux/auth";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <TopNav />
        <RoutesComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
