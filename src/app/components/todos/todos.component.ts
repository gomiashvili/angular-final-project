import { Component, OnInit } from '@angular/core';
import { ToDos } from 'src/app/interfaces/todos.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos!: ToDos[];
  isCompleted?: boolean[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const isCompleted = [];
    this.apiService.getToDos().subscribe((todos) => {
      this.todos = todos;
      console.log(todos);
    });
  }

}
