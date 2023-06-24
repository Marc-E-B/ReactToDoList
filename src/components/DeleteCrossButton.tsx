import { DeleteCrossButtonProps } from "../interface/interfaces.js";

export function DeleteCrossButton(props: DeleteCrossButtonProps) {
  const { setTask, setCurrentTaskText, task, currentTaskText, id } = props;

  function deleteTask() {
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

  return (
    <button className="closeCross" onClick={() => deleteTask()}>
      X
    </button>
  );
}
