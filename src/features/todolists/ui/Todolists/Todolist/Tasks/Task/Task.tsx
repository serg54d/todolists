import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { changeTodolistEntityStatusAC, DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components"
import { DomainTask, UpdateTaskDomainModel } from "features/todolists/api/tasksApi.types"
import { TaskStatus } from "features/todolists/lib/enums/enums"

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        // dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
        dispatch(removeTaskTC(task.id, todolist.id))
    }

    // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    //     dispatch(changeTaskStatusTC({ status, task: task }))
    // }

    // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    //     dispatch(changeTaskStatusTC({ taskId: task.id, status, todolistId: task.todoListId }))
    // }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

        const domainModel: UpdateTaskDomainModel = {
            status: status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        dispatch(updateTaskTC(task, domainModel))
    }

    const changeTaskTitleHandler = (title: string) => {
        // dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }))

        const domainModel: UpdateTaskDomainModel = {
            status: task.status,
            title: title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        dispatch(updateTaskTC(task, domainModel))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox
                    checked={task.status === TaskStatus.Completed}
                    onChange={changeTaskStatusHandler}
                    disabled={todolist.entityStatus === "loading"}
                />
                <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                    disabled={todolist.entityStatus === "loading"}
                />
            </div>
            <IconButton onClick={removeTaskHandler} disabled={todolist.entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
