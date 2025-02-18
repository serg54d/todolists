import { TaskPriority, TaskStatus } from "../lib/enums/enums"
import { FieldError } from "./todolistsApi.types"

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: DomainTask[]
}

export type DomainTask = {
	description: string
	title: string
	status: TaskStatus
	priority: TaskPriority
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type CreateTaskResponse = {
	resultCode: number
	messages: string[]
	fieldsErrors: FieldError[]
	data: {
		item: DomainTask
	}
}

export type DeleteTaskResponse = {
	resultCode: number
	messages: string[]
	fieldsErrors: FieldError[]
	data: {}
}

export type UpdateTaskModel = {
	title: string;
	description: string;
	status: number;
	priority: number;
	startDate: string;
	deadline: string;
};

export type UpdateTaskResponse = {
	resultCode: number
	messages: string[]
	fieldsErrors: FieldError[]
	data: {
		item: DomainTask
	}
}

// UpdateTaskDomainModel это такой же тип как и UpdateTaskModel,
// только все свойства в нем являются необязательными
export type UpdateTaskDomainModel = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}