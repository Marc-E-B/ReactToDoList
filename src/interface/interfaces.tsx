export interface Task {
  id: string;
  text: string;
  state: boolean;
}

export interface DeleteCrossButtonProps {
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  setCurrentTaskText: React.Dispatch<React.SetStateAction<string>>;
  currentTaskText: string;
  task: Task[];
  id: string;
}

export interface FormTaskProps {
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  task: Task[];
}

export interface ProgressBarProps {
  task: Task[];
}

export interface ImDoneButtonProps {
  task: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  currentTaskText: string;
  setCurrentTaskText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  id: string | undefined;
}
