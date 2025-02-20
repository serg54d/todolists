import { v1 } from "uuid"
import { Todolist } from "../api/todolistsApi.types"
import { AppDispatch } from "app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "../lib/enums/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { fetchTasksTC } from "./tasks-reducer"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        }

        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            const todolist = action.payload.todolist
            const newTodolist: DomainTodolist = {
                id: todolist.id,
                title: todolist.title,
                filter: "all",
                addedDate: "",
                order: 0,
                entityStatus: "idle",
            }
            return [...state, newTodolist]
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
        }

        case "CHANGE-TODOLIST-FILTER": {
            return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
        }

        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((tl) =>
                tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
            )
        }

        case "CLEAR-TODOS-DATA": {
			return []
        }

        default:
            return state
    }
}

// Action creators
export const removeTodolistAC = (id: string) => {
    return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (todolist: DomainTodolist) => {
    return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
    return { type: "SET-TODOLISTS", todolists } as const
}

export const clearTodosDataAC = () => {
    return { type: "CLEAR-TODOS-DATA" } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | changeTodolistEntityStatusActionType
	| ClearTodosDataActionType

// Thunks

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
        .getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
            return res.data
        })
        .then((todos) => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id))
            })
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))

    todolistsApi
        .createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(addTodolistAC({ ...res.data.data.item, filter: "all", entityStatus: "idle" }))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
    todolistsApi
        .deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "failed" }))
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
            dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "failed" }))
        })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))

    todolistsApi
        .updateTodolist({ id: arg.id, title: arg.title })
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(changeTodolistTitleAC({ id: arg.id, title: arg.title }))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
    return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}
