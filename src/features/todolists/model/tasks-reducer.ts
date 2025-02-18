import { v1 } from "uuid"
import { AddTodolistActionType, changeTodolistEntityStatusAC, RemoveTodolistActionType } from "./todolists-reducer"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode, TaskPriority, TaskStatus } from "../lib/enums/enums"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "common/utils"

export type TasksStateType = {
    [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = { ...state }
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    (t) => t.id !== action.payload.taskId,
                ),
            }
        }

        case "ADD-TASK": {
            const newTask: DomainTask = action.payload.task
            return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
        }

        // case "CHANGE_TASK_STATUS": {
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
        //             t.id === action.payload.taskId
        //                 ? {
        //                       ...t,
        //                       status: action.payload.status,
        //                   }
        //                 : t,
        //         ),
        //     }
        // }

        // case "CHANGE_TASK_STATUS": {
        //     const task = action.payload.task
        //     return {
        //         ...state,
        //         [task.todoListId]: state[task.todoListId].map((t) =>
        //             t.id === task.id
        //                 ? {
        //                       ...t,
        //                       status: task.status,
        //                   }
        //                 : t,
        //         ),
        //     }
        // }

        // case "CHANGE_TASK_TITLE": {
        //     const task = action.payload.task
        //     return {
        //         ...state,
        //         [task.todoListId]: state[task.todoListId].map((t) =>
        //             t.id === task.id
        //                 ? {
        //                       ...t,
        //                       title: task.title,

        //                   }
        //                 : t,
        //         ),
        //     }
        // }

        case "UPDATE-TASK": {
            const task = action.payload.task
            return {
                ...state,
                [task.todoListId]: state[task.todoListId].map((t) =>
                    t.id === task.id
                        ? {
                              ...t,
                              title: task.title,
                              status: task.status,
                          }
                        : t,
                ),
            }
        }

        case "ADD-TODOLIST":
            return { ...state, [action.payload.todolist.id]: [] }

        case "REMOVE-TODOLIST": {
            let copyState = { ...state }
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}

export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
    return {
        type: "CHANGE_TASK_STATUS",
        payload,
    } as const
}

// export const changeTaskStatusAC = (payload: { taskId: string; status: TaskStatus; todolistId: string }) => {
//     return {
//         type: "CHANGE_TASK_STATUS",
//         payload,
//     } as const
// }

export const changeTaskTitleAC = (payload: { task: DomainTask }) => {
    return {
        type: "CHANGE_TASK_TITLE",
        payload,
    } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: "SET-TASKS",
        payload,
    } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: "UPDATE-TASK",
        payload,
    } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | UpdateTaskActionType

// Thunks

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        tasksApi
            .getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC({ todolistId, tasks }))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "loading" }))
    dispatch(setAppStatusAC("loading"))
    tasksApi
        .deleteTask(taskId, todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTaskAC({ taskId, todolistId }))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "failed" }))
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
            dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "failed" }))
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
        .createTask(title, todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(addTaskAC({ task: res.data.data.item }))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTaskTC = (task: DomainTask, domainModel: UpdateTaskDomainModel) => (dispatch: AppDispatch) => {
    // const domainModel: UpdateTaskDomainModel = {
    //     status: arg.updateData.status ?? arg.task.status,
    //     title: arg.updateData.title ?? arg.task.title,
    //     deadline: arg.task.deadline,
    //     description: arg.task.description,
    //     priority: arg.task.priority,
    //     startDate: arg.task.startDate,
    // }

    // if (arg.updateData.status !== undefined) {
    //     tasksApi.changeTaskStatus(arg.task, domainModel).then((res) => {
    //         dispatch(updateTaskAC({ task: res.data.data.item }))
    //     })
    // }

    // if (arg.updateData.title !== undefined) {
    //     tasksApi.changeTaskTitle(arg.task.title, arg.task, domainModel).then((res) => {
    //         dispatch(updateTaskAC({ task: res.data.data.item }))
    //     })
    // }
    dispatch(setAppStatusAC("loading"))
    tasksApi
        .updateTask(task, domainModel)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(updateTaskAC({ task: res.data.data.item }))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
