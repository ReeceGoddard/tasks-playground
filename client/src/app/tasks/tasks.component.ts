import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task/task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskForm = new FormGroup({
    usernameControl: new FormControl('', [Validators.required]),
  });

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe((task) => {
      if (id == task._id) {
        this.tasks = this.tasks.filter((a) => a._id !== id);
      }
    });
  }

  setTaskComplete(id: string, done: boolean) {
    this.taskService.setTaskComplete(id, done).subscribe((task) => {
      if (id == task._id) {
        this.tasks = this.tasks.map((mapTask) =>
          mapTask._id === id ? { ...mapTask, done: task.done } : mapTask
        );
      }
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.newTaskForm.invalid) {
      return;
    }

    const task: Task = {
      label: this.newTaskForm.controls.labelControl.value,
    };

    const newTask = this.taskService.newTask(task);

    // this.authenticationService
    //   .signIn(credentials)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.router.navigate([this.forwardUrl]);
    //     },
    //     (error) => {
    //       // this.error = error;
    //       this.loading = false;
    //     }
    //   );
  }
}
