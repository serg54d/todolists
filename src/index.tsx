import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
// import {App} from "./app/App";
import { store } from "./app/store"
import { App } from "app/App"
import { BrowserRouter, Route, Routes } from "react-router"
import { Login } from "features/auth/ui/login/Login"



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Provider>
    </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
