export interface Task {
  id: string;
  name: string;
  deadline: Date;
  finishedAt: Date | null;
  estimate: number;
}
