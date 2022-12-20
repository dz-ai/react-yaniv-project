import './App.css'
import {OpenGamePage} from "./pages/openGamePage";
import {createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider, Routes} from "react-router-dom";
import {GameComponent} from "./components/gameComponent/gameComponent";
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
            element={<GameComponent/>}
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
