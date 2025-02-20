import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { selectIsLoggedIn } from "features/auth/authSelectors"
import { Path } from "common/routing/Routing"


type ProtectedRouteProps = {
	children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={Path.Login} replace />
    }

    return children
}
