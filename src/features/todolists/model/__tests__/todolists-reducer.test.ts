import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    DomainTodolist,
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer,
} from "../todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "12313", order: 0, entityStatus: "idle" },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "12313", order: 0, entityStatus: "idle" },
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    const filter: FilterValuesType = "all"
    let newTodo: DomainTodolist
    newTodo = {
        id: "123",
        title: "132",
        addedDate: "12313",
        order: 0,
        filter,
        entityStatus: "idle",
    }

    const endState = todolistsReducer(startState, addTodolistAC(newTodo))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("132")
})

test("correct todolist should change its name", () => {
    const newTitle = "New Todolist"

    const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title: newTitle }))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
    const newFilter = "completed"

    const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter: newFilter }))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
