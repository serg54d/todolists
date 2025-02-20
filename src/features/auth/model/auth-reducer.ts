import { AppDispatch } from "app/store"
import { Inputs } from "../ui/login/Login"
import { setAppStatusAC } from "app/app-reducer"
import { Dispatch } from "redux"
import { authApi } from "../api/authApi"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { ResultCode } from "features/todolists/lib/enums/enums"
import { clearTodosDataAC } from "features/todolists/model/todolists-reducer"

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_IS_LOGGED_IN":
            return { ...state, isLoggedIn: action.payload.isLoggedIn }
        case "SET_IS_INITIALIZED": {
            return { ...state, isInitialized: action.payload.isInitialized }
        }
        default:
            return state
    }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

const setIsInitializedAC = (isInitialized: boolean) => {
    return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi
        .login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setIsLoggedInAC(true))
                localStorage.setItem("sn-token", res.data.data.token)
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi
        .logout()
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setIsLoggedInAC(false))
                localStorage.removeItem("sn-token")
				dispatch(clearTodosDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const authMeTC = () => (dispatch: Dispatch) => {
 
    dispatch(setAppStatusAC("loading"))
    authApi
        .me()
        .then((res) => {
            
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setIsLoggedInAC(true))
                dispatch(setIsInitializedAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
				dispatch(setIsInitializedAC(true))
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
			
        })
}
