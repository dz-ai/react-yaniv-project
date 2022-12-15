import './App.css'
import {OpenGamePage} from "./pages/openGamePage";
import {createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider, Routes} from "react-router-dom";
import {GamePage} from "./pages/gamePage";
import ErrorPage from "./pages/errorPage";


function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            <Route
            path="/"
            element={<OpenGamePage/>}
            />
            <Route
            path="/gamePage"
            element={<GamePage/>}
            />
        </Route>
    ));

    return (
        <div className="App">
            <RouterProvider router={router}/>
    </div>
  )
}

export default App
