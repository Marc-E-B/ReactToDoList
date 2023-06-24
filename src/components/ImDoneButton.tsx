import { ImDoneButtonProps } from "../interface/interfaces.js";

export function ImDoneButton(props: ImDoneButtonProps) {
  const {
    task,
    setTask,
    currentTaskText,
    setCurrentTaskText,
    setCurrentTask,
    id,
  } = props;
  function changeState() {
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

  return (
    <button className="rocket" onClick={() => changeState()}>
      I'm done &#128640;
    </button>
  );
}
