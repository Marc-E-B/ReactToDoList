import { ProgressBarProps } from "../interface/interfaces";

export function ProgressBarComponent(props: ProgressBarProps) {
  const { task } = props;
  function progressBarCompletion() {
    const newTask = [...task];
    const tabTaskTrue = newTask.filter((elem) => elem.state == true);

    return tabTaskTrue.length;
  }

  return (
    <div className="PGBdiv">
      <label>Progression </label>
      <progress
        id="file"
        max={task.length}
        value={progressBarCompletion()}
      ></progress>
    </div>
  );
}
