export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, themeMode: action.payload.themeMode }
        case "SET_STATUS":
            return { ...state, status: action.payload.status }
        case "SET_ERROR":
            return { ...state, error: action.payload.error }

        default:
            return state
    }
}

// Action creators
export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: "CHANGE_THEME",
        payload: { themeMode },
    } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
    return {
        type: "SET_STATUS",
        payload: { status },
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: "SET_ERROR",
        payload: { error },
    } as const
}


// Actions types

type ActionsType =
    | ReturnType<typeof changeThemeAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
