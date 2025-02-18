import { TaskPriority, TaskStatus } from "features/todolists/lib/enums/enums"
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
} from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"

let startState: TasksStateType

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "123313",
                deadline: "21313",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "4144144",
                description: "13",
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "123313",
                deadline: "21313",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "4144144",
                description: "13",
            },
            {
                id: "3",
                title: "React",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "123313",
                deadline: "21313",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "4144144",
                description: "13",
            },
        ],
        todolistId2: [
            {
                id: "1",
                title: "bread",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "123313",
                deadline: "21313",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "4144144",
                description: "13",
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: "123313",
                deadline: "21313",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "4144144",
                description: "13",
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: "123313",
                deadline: "21313",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "4144144",
                description: "13",
            },
        ],
    }
})

test("correct task should be deleted from correct array", () => {
    const endState = tasksReducer(
        startState,
        removeTaskAC({
            taskId: "2",
            todolistId: "todolistId2",
        }),
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false },
        ],
    })
})

test("correct task should be added to correct array", () => {
    const task = {
        id: "1",
        title: "juce",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "123313",
        deadline: "21313",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "4144144",
        description: "13",
    }
    const endState = tasksReducer(startState, addTaskAC({ task }))

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
    const task = {
        id: "2",
        title: "juce",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "123313",
        deadline: "21313",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "4144144",
        description: "13",
    }
    const endState = tasksReducer(startState, changeTaskStatusAC({ task }))

    expect(endState["todolistId2"][1].status).toBe(TaskStatus.New)
    expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed)
})

test("title of specified task should be changed", () => {
    const task = {
        id: "2",
        title: "coffee",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "123313",
        deadline: "21313",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "4144144",
        description: "13",
    }
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            task,
        }),
    )

    // taskId: '2',
    // 	title: 'coffee',
    // 	todolistId: 'todolistId2'

    expect(endState["todolistId2"][1].title).toBe("coffee")
    expect(endState["todolistId1"][1].title).toBe("JS")
})

// test("new array should be added when new todolist is added", () => {
//     const endState = tasksReducer(startState, addTodolistAC("new todolist"))

//     const keys = Object.keys(endState)
//     const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
//     if (!newKey) {
//         throw Error("new key should be added")
//     }

//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })

test("property with todolistId should be deleted", () => {
    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    // or
    expect(endState["todolistId2"]).toBeUndefined()
})
