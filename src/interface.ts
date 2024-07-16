export interface Task {
  id: string;
  task: string;
  done: boolean;
}

export interface TaskDetails {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  startDate: string | Date;
  endDate: string | Date;
}

export interface Common {
  className?: string;
  children?: React.ReactNode;
}
