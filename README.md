WhatToDo is a Todo App which is made with tailwindCss and ReactJs. We can write our daily tasks and track them.

# Explination

### 1. **State Variables** - Managing Pieces of Data
```js
const [todo, settodo] = useState("");
const [todos, settodos] = useState([]);
const [finished, setfinished] = useState(true);
```
- **What this does**: 
  - React uses `useState` to store and manage values within the component.
  - Think of each `useState` as a **variable** in React that can change over time.

- **Breakdown**:
  - `todo`: Holds the current task you're typing into the input box (e.g., "Buy milk"). Initially, it's an empty string (`""`).
  - `todos`: An array that stores **all your tasks**. It's like a **to-do list** where each task is an object (with properties like `id`, `todo`, and `iscompleted`). Initially, it’s an empty array (`[]`).
  - `finished`: This is a **boolean** (true or false). It acts as a switch to toggle between showing **completed** or **unfinished tasks**. By default, it's `true`, meaning the list will show finished tasks.

### 2. **useEffect Hook** - Load the Todos When the Page Loads
```js
useEffect(() => {
  let todostring = localStorage.getItem("todos");
  if (todostring) {
    let todos = JSON.parse(todostring);
    settodos(todos);
  }
}, []);
```
- **What this does**: 
  - This part of the code runs **once** when the component is first loaded (like when the page is opened). It checks if there are any saved tasks in `localStorage` and loads them into the app.
  
- **Breakdown**:
  - `localStorage.getItem("todos")`: It looks into the browser's **local storage** (like a small storage box in the browser) to see if there is anything saved under the key `"todos"`.
  - `if (todostring)`: If there's something saved in `localStorage` (it's not `null`), it goes inside this block.
  - `JSON.parse(todostring)`: It **converts** the stored string back into a JavaScript array (because `localStorage` only saves data as strings).
  - `settodos(todos)`: Once the tasks are retrieved, they are loaded into the state by updating the `todos` array using `settodos(todos)`.

- **Why this matters**: 
  - This ensures that **even if you refresh the page**, you don’t lose your tasks. They are stored and reloaded from `localStorage`.

### 3. **Saving Tasks to Local Storage**
```js
const saveToLS = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}
```
- **What this does**: 
  - This function saves the current list of tasks (`todos`) to `localStorage`.

- **Breakdown**:
  - `localStorage.setItem("todos", JSON.stringify(todos))`: It **converts** the `todos` array (which could have tasks like `[{ id: 1, todo: 'Buy milk', iscompleted: false }]`) into a string and stores it in `localStorage` under the key `"todos"`.
  
- **Why this matters**:
  - Anytime the list of tasks (`todos`) is changed (like when you add or delete a task), this function is called to save the updated list to the browser’s storage.

### 4. **Toggle the Finished Status**
```js
const togglefinished = () => {
  setfinished(!finished);
}
```
- **What this does**: 
  - This function **switches** the value of `finished` between `true` and `false`.

- **Breakdown**:
  - `setfinished(!finished)`: If `finished` is `true`, it becomes `false`, and if it’s `false`, it becomes `true`. This flips the state.
  
- **Why this matters**:
  - It helps control which tasks are shown on the screen — **either only completed tasks** (when `finished` is true) or **incomplete tasks** (when `finished` is false).

### 5. **Editing a Task**
```js
const handleEdit = (e, id) => {
  let t = todos.filter(i => i.id === id);
  settodo(t[0].todo);
  let newTodos = todos.filter((item) => {
    return item.id !== id;
  });
  settodos(newTodos);
  saveToLS();
};
```
- **What this does**: 
  - This function allows you to **edit** a specific task in your list.

- **Breakdown**:
  - `todos.filter(i => i.id === id)`: It **finds the task** with the matching `id` (each task has a unique `id`).
  - `settodo(t[0].todo)`: It puts the **text of the task** into the `todo` input box, so you can see what you’re editing.
  - `todos.filter(item => item.id !== id)`: It **removes** the task from the list so you can later re-add the updated task.
  - `settodos(newTodos)`: It **updates** the `todos` array with the filtered tasks (excluding the one you’re editing).
  - `saveToLS()`: It saves the updated list to `localStorage`.

- **Why this matters**:
  - It enables users to **modify existing tasks**. When you want to edit, you’re temporarily removing the task, allowing you to re-add the edited version later.

### 6. **Deleting a Task**
```js
const handleDelete = (e, id) => {
  let newTodos = todos.filter((item) => item.id !== id);
  settodos(newTodos);
  saveToLS();
};
```
- **What this does**: 
  - This function allows you to **delete** a task from the list.

- **Breakdown**:
  - `todos.filter(item => item.id !== id)`: It **creates a new list** by excluding the task with the matching `id` (it removes the task you want to delete).
  - `settodos(newTodos)`: It **updates the state** with the new list of tasks (without the deleted task).
  - `saveToLS()`: It saves the updated list to `localStorage`.

- **Why this matters**:
  - It lets you **permanently remove** a task from your to-do list.

### 7. **Adding a New Task**
```js
const handleAdd = () => {
  settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
  settodo("");
  saveToLS();
};
```
- **What this does**: 
  - This function lets you **add a new task** to your list.

- **Breakdown**:
  - `uuidv4()`: This generates a **unique id** for the new task. Each task has its own `id` so it can be identified (used for editing/deleting later).
  - `{ id: uuidv4(), todo, iscompleted: false }`: This creates a **new task object**. It takes the current `todo` (what you're typing) and marks it as not completed (`iscompleted: false`).
  - `settodos([...todos, newTask])`: It **adds the new task** to the existing list of tasks by spreading the current `todos` array and appending the new task at the end.
  - `settodo("")`: This clears the input box after the task is added, so it’s ready for a new task.
  - `saveToLS()`: It saves the updated list with the new task to `localStorage`.

- **Why this matters**:
  - It allows you to **add new tasks** to the list and keep them saved.

### 8. **Handling Changes in the Input Box**
```js
const handlechange = (e) => {
  settodo(e.target.value);
}
```
- **What this does**: 
  - This function updates the `todo` state as you type in the input box.

- **Breakdown**:
  - `e.target.value`: This takes the **value** from the input box (the text you’re typing).
  - `settodo(e.target.value)`: This **sets the value** in the `todo` state (the piece of data that holds the current task you’re typing).

- **Why this matters**:
  - It ensures that what you type is **immediately captured** and stored in the `todo` state, so you can later add it to your list.

### 9. **Marking a Task as Completed**
```js
const handlecheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex((item) => item.id === id);
  let newTodos = [...todos];
  newTodos[index].iscompleted = !newTodos[index].iscompleted;
  settodos(newTodos);
  saveToLS();
};
```
- **What this does**: 
  - This function **marks a task as completed** when you click the checkbox.

- **Breakdown**:
  - `e.target.name`: This gets the `id` of the task from the checkbox (each checkbox is linked to a specific

 task via the `id`).
  - `todos.findIndex(item => item.id === id)`: It finds the **position** (index) of the task in the array with the matching `id`.
  - `newTodos[index].iscompleted = !newTodos[index].iscompleted`: It **toggles** the `iscompleted` value of that task (marks it as done or undone).
  - `settodos(newTodos)`: It updates the `todos` state with the modified task list.
  - `saveToLS()`: It saves the updated list to `localStorage`.

- **Why this matters**:
  - This lets users mark tasks as **done or not done**, which helps keep track of progress on the to-do list.

---

**In Summary**:
- This app manages tasks using **React's state** and saves them in the browser's `localStorage`.
- You can **add, edit, delete**, and **mark tasks as done**.
- `localStorage` is like a desk drawer where your tasks are saved, so even when you refresh the page, they stay there.


# ...todo Explination

### Key Differences:

1. **`console.log(todo)`**:
   - **Type**: Logs the array as it is.
   - **Output Format**: Shows the entire array with brackets and commas.
   - **Example Output**: `['todo1', 'todo2', 'todo3']`
   - **Usage**: Useful when you want to see the structure of the array.

2. **`console.log(...todo)`**:
   - **Type**: Unpacks the elements of the array and logs them as individual values.
   - **Output Format**: Displays the elements without brackets, as a space-separated string.
   - **Example Output**: `todo1 todo2 todo3`
   - **Usage**: Useful for logging items in a more readable format, especially when you want to emphasize the individual elements.

### Summary
- **`todo`** returns the array as an object.
- **`...todo`** spreads the elements, essentially converting them to separate arguments in the log, making them appear as a single line of text. 

So, yes, in practical terms, `...todo` gives you a more "string-like" appearance when logged, while `todo` maintains the array structure.
