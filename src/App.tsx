import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  id: string;
  text: string;
  state: boolean;
}

export default function App() {
  //We initialize task as un parsed version of "save" where save is "taskList" in the localStorage.
  //if there is no "taskList created yet, we initialize task as an empty array.
  const [task, setTask] = useState<Props[]>(() => {
    const save = localStorage.getItem("taskList");

    if (save) {
      const initialValue = JSON.parse(save);
      return initialValue;
    } else {
      return [];
    }
  });

  //We initialize text as an empty string
  const [text, setText] = useState<string>("");

  //We initialize currenTaskText as "Not currenlty doing anything"
  const [currentTaskText, setCurrentTaskText] = useState<string>(
    "Not currenlty doing anything"
  );

  const [currentTask, setCurrentTask] = useState<Props>();

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(task));
  }, [task]);

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTask([
      {
        //Here we generate an random id with the package uuid.
        id: uuidv4(),
        text: text,
        state: false,
      },
      ...task,
    ]);

    setText("");
  }

  function deleteTask(id: string) {
    const removeTask = task.filter((elemOfTask) => elemOfTask.id != id);

    const newTask = [...task];
    const taskToUpdate = newTask.filter((Elem) => Elem.id == id)[0];
    const index = newTask.indexOf(taskToUpdate);
    if (newTask[index].text == currentTaskText) {
      let copyCurrentTaskText = "";
      copyCurrentTaskText = "Not currenlty doing anything";
      setCurrentTaskText(copyCurrentTaskText);
    }

    setTask(removeTask);
  }

  function changeState(id: string) {
    console.log(task);
    const newTask = [...task];
    const taskToUpdate = newTask.filter((Elem) => Elem.id == id)[0];
    const index = newTask.indexOf(taskToUpdate);
    newTask[index].state = !newTask[index].state;

    setTask(newTask);

    if (newTask[index].state == true) {
    }

    let copyCurrentTaskText = "";

    if (newTask[index].text == currentTaskText) {
      copyCurrentTaskText = "Not currenlty doing anything";
      setCurrentTaskText(copyCurrentTaskText);

      // I set currentTask to undefined to unable the rocket button to re-activate the task linked
      setCurrentTask(undefined);

      // if(currentTaskText != 'Not currenlty doing anything'){

      // }
    }
  }

  function doNow(id: string) {
    const newTask = [...task];
    const taskToUpdate = newTask.filter((Elem) => Elem.id == id)[0];
    const index = newTask.indexOf(taskToUpdate);
    let copyCurrentTaskText = "";
    if (newTask[index].state == false) {
      copyCurrentTaskText = newTask[index].text;
    }

    setCurrentTaskText(copyCurrentTaskText);

    setCurrentTask(taskToUpdate);
  }

  function progressBarCompletion() {
    const newTask = [...task];
    const tabTaskTrue = newTask.filter((elem) => elem.state == true);

    return tabTaskTrue.length;
  }

  return (
    <>
      <h1>To Do List</h1>
      {task.map((element) => (
        <ul className="taskAndCross" key={element.id}>
          <input
            type="checkbox"
            className="checkbox"
            checked={element.state}
            onChange={() => changeState(element.id)}
          />
          <li>{element.text}</li>
          <div className="btns">
            {!element.state && (
              <button className="doNow" onClick={() => doNow(element.id)}>
                Do now
              </button>
            )}
            <button
              className="closeCross"
              onClick={() => deleteTask(element.id)}
            >
              X
            </button>
          </div>
        </ul>
      ))}
      <div className="NTandPGB">
        <form onSubmit={(e) => addTask(e)}>
          <label>New Task </label>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </form>
        <div className="PGBdiv">
          <label>Progression </label>
          <progress
            id="file"
            max={task.length}
            value={progressBarCompletion()}
          ></progress>
        </div>
      </div>
      <h2>Currently doing</h2>
      <p className="taskText">{currentTaskText}</p>
      <button className="rocket" onClick={() => changeState(currentTask.id)}>
        I'm done &#128640;
      </button>
    </>
  );
}
