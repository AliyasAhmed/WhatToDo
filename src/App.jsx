import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(true);
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)

    }

  }, []);
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const togglefinished = () => {
    setfinished(!finished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS()
  };
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS()
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    settodo("");
    saveToLS()
  };
  const handlechange = (e) => {
    settodo(e.target.value);
    saveToLS()
  };
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    settodos(newTodos);
    saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-slate-800 text-xl text-white p-5 min-h-[80dvh] md:w-1/2">
        <h1 className="font-normal text-center md:text-4xl">What To Do - Keep Track Of your tasks</h1>
        <div className="addtodo my-5 flex flex-col gap-5">
          <h2 className="">Add a Todo</h2>
          <input
            onChange={handlechange}
            value={todo}
            className="text-white bg-[#7777773b] rounded-md w-full p-3 py-1 transition-all"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className={`bg-slate-700 hover:bg-slate-500 p-3 py-2 rounded-md flex justify-center transition-all ${todo.length <= 3 ? 'bg-slate-600' : 'border-none'}`}
          >
            <BiSolidMessageSquareAdd />
          </button>

        </div>
        <input className="my-4" onChange={togglefinished} type="Checkbox" checked={finished} /> Show Finished
        <div className="h-[1px] bg-slate-600 opacity-50 mx-auto"></div>
        <h1 className="md:text-lg">Do-List</h1>
        <div className="todos sm:flex-col sm:justify-center md:flex-col md:justify-center">
          {todos.length === 0 && <div className="m-5">No Todos To Display</div>}
          {todos.map((item) => {
            // (finished || !item.iscompleted) This line when checked show Finished todos
            return (finished || !item.iscompleted) && (
              <div
                key={item.id}
                className="todo md:flex my-5 justify-between"
              >
                <div className="fex gap-2">
                  <input className=""
                    name={item.id}
                    onChange={handlecheckbox}
                    type="checkbox"
                    checked={item.iscompleted}
                    id=""
                  />
                </div>
                <div className={item.iscompleted ? "line-through " : ""}>
                  {item.todo}
                </div>
                <div className="buttons flex md:pl-[20%]">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-slate-700 hover:bg-slate-500 p-3 py-1 rounded-md mx-1 transition-all"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-slate-700 hover:bg-slate-500 p-3 py-1 rounded-md mx-1 transition-all"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
