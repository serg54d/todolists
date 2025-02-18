import { Main } from "app/Main"
import { Login } from "features/auth/ui/login/Login"
import { Route, Routes } from "react-router"

export const Path = {
    Main: "/",
    Login: "login",
} as const

export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.Main} element={<Main />} />
            <Route path={Path.Login} element={<Login />} />
        </Routes>
    )
}
