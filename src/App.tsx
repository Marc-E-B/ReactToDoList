import "./App.css";
import { useState, useEffect } from "react";
import { FormTask } from "./components/FormTask";
import { DeleteCrossButton } from "./components/DeleteCrossButton";
import { ProgressBarComponent } from "./components/ProgressBar";
import { ImDoneButton } from "./components/ImDoneButton";

export interface Task {
  id: string;
  text: string;
  state: boolean;
}

export default function App() {
  //We initialize task as un parsed version of "save" where save is "taskList" in the localStorage.
  //if there is no "taskList created yet, we initialize task as an empty array.
  const [task, setTask] = useState<Task[]>(() => {
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

  const [currentTask, setCurrentTask] = useState<Task>();

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(task)); //On fait stringify car le localStorage ne prend que les string
  }, [task]);

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

  return (
    <>
      <h1>To Do List</h1>
      <div className="lr">
        <div className="left">
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
                <DeleteCrossButton
                  setTask={setTask}
                  setCurrentTaskText={setCurrentTaskText}
                  task={task}
                  currentTaskText={currentTaskText}
                  id={element.id}
                ></DeleteCrossButton>
              </div>
            </ul>
          ))}
          <div className="NTandPGB">
            <FormTask
              setTask={setTask}
              setText={setText}
              task={task}
              text={text}
            ></FormTask>
            <ProgressBarComponent task={task}></ProgressBarComponent>
          </div>
        </div>
        <div className="right">
          <h2>Currently doing</h2>
          <p className="taskText">{currentTaskText}</p>
          <ImDoneButton
            task={task}
            setTask={setTask}
            currentTaskText={currentTaskText}
            setCurrentTaskText={setCurrentTaskText}
            setCurrentTask={setCurrentTask}
            id={currentTask?.id}
          ></ImDoneButton>
        </div>
      </div>
    </>
  );
}
