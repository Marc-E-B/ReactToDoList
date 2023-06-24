import { FormTaskProps } from "../interface/interfaces";
import { v4 as uuidv4 } from "uuid";

export const FormTask: React.FC<FormTaskProps> = ({
  setTask,
  setText,
  text,
  task,
}) => {
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

  return (
    <form onSubmit={(e) => addTask(e)}>
      <label>New Task </label>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </form>
  );
};
