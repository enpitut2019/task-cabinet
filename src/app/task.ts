export interface Task {
  id: string;
  name: string;
  deadline: Date;
  estimate: number;
}

export interface TaskRequest {
  name: string;
  deadline: number;
  estimate: number;
}
