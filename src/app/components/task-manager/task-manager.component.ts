import { Component, OnInit } from '@angular/core';

import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop'

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [NgIf, NgFor, DragDropModule, TaskComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent implements OnInit {
  protected todo!: Task[];
  protected inProgress: Task[] = [];
  protected done: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.todo = this.taskService.todos
  }

  protected editTask(list: string, task: Task): void { }

  protected drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }


}
