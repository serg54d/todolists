import { tasksReducer, TasksStateType } from "../tasks-reducer"
import { addTodolistAC, todolistsReducer, DomainTodolist, FilterValuesType, addTodolistTC } from "../todolists-reducer"

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: DomainTodolist[] = []
    const filter: FilterValuesType = 'all'
    const todolist = {
        id: "123",
        title: "132",
        addedDate: "12313",
        order: 0,
        filter,
    }

	
    const action = addTodolistAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
