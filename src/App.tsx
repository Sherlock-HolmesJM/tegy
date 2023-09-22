// import reactLogo from "./assets/react.svg"; // import from assets
// import viteLogo from "/vite.svg"; // public import
import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./widgets/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
