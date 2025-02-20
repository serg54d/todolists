import { Main } from "app/Main"
import { Page404 } from "common/components"
import { Login } from "features/auth/ui/login/Login"
import { Route, Routes } from "react-router"
import { ProtectedRoute } from "./ProtectedRoute"

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*",
} as const

export const Routing = () => {
    return (
        <Routes>
            <Route
                path={Path.Main}
                element={
                    <ProtectedRoute>
                        <Main />
                    </ProtectedRoute>
                }
            />

            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.NotFound} element={<Page404 />} />
        </Routes>
    )
}
