import * as React from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useSelector } from "react-redux"
import { selectError } from "app/appSelectors"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { setAppErrorAC } from "app/app-reducer"

export function ErrorSnackbar() {
	

	
    const error = useSelector(selectError)
	const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return
        }

        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error != null} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
                {error}
            </Alert>
        </Snackbar>
    )
}
