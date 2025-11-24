import { RouterProvider } from "react-router-dom";
import routerConfigure from "./router";
import "./App.css";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfigure}></RouterProvider>
    </div>
  );
}

export default App;
