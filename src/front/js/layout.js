import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import Register from "./pages/Register.jsx";
// import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Login from "./pages/Login.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import ResetPass from "./pages/ResetPass.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ResetPass />} path="/recuperar-contrasenia" />
                        <Route element={< UpdatePassword/>} path="/actualizar-contrasenia/:token"/>
                        {/* <Route element={<Single />} path="/single/:theid" /> */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
