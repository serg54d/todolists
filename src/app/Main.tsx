import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import React, { useEffect } from "react"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { addTodolistAC, addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "features/auth/authSelectors"
import { Path } from "common/routing/Routing"
import { useNavigate } from "react-router"

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate(Path.Login)
    //     }
    // }, [isLoggedIn])

    return (
        <Container fixed>
            <Grid container sx={{ mb: "30px" }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>

            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}
