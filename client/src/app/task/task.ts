import { Person } from '../people/person';

export interface Task {
  _id?: string;
  label?: string;
  done?: boolean;
  assignees?: Person[];
  due?: Date;
}
