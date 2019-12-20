export interface Task {
  id: string;
  name: string;
  deadline: Date;
  finishedAt: Date | null;
  estimate: number;
}

export interface TaskRequest {
  name: string;
  deadline: number;
  estimate: number;
}
