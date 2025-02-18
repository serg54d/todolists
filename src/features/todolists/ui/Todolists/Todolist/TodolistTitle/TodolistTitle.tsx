import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import {
    changeTodolistTitleAC,
    removeTodolistAC,
    DomainTodolist,
    removeTodolistTC,
    updateTodolistTitleTC,
} from "../../../../model/todolists-reducer"
import s from "./TodolistTitle.module.css"

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { title, id, entityStatus } = todolist

    const dispatch = useAppDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(updateTodolistTitleTC({ id: id, title: title }))
    }

    return (
        <div className={s.container}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
            </h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
