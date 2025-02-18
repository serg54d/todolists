import axios from "axios"
import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/components/instance/instance"
import { DomainTask, GetTasksResponse, UpdateTaskDomainModel, UpdateTaskModel, UpdateTaskResponse } from "./tasksApi.types"
import { ChangeEvent } from "react"

export const tasksApi = {
    getTasks: (id: string) => {
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
    },
    createTask: (title: string, id: string) => {
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${id}/tasks`, { title })
    },
    deleteTask: (id: string, todolistId: string) => {
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    updateTask: (task: DomainTask, model: UpdateTaskDomainModel) => {
        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    },
    // changeTaskTitle: (title: string, task: DomainTask, model: UpdateTaskDomainModel) => {
    //     return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    // },
}
