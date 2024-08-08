import App from "./Components/App";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Favorites from "./pages/favorites";
import EditBook from "./pages/editBook";

const RoutesComponent = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<App />} />
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/editing/:id" element={<EditBook />} />

            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent