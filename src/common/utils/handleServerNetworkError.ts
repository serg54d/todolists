import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { AppDispatch } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const handleServerNetworkError = (err: {message: string}, dispatch: AppDispatch) => {
	
    dispatch(setAppErrorAC(err.message))
    dispatch(setAppStatusAC("failed"))
}
