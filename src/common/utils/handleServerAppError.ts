import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { AppDispatch } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { BaseResponse } from "common/types"

export const handleServerAppError = (data: BaseResponse, dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("failed"))
    dispatch(setAppErrorAC(data.messages[0]))
}
