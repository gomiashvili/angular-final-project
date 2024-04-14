import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { Comment } from '../interfaces/comment.interface';
import { Album } from '../interfaces/album.interface';
import { Photos } from '../interfaces/photos.interface';
import { ToDos } from '../interfaces/todos.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users!: User[];
  posts!: Post[];
  comments!: Comment[];
  photos!: Photos;
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
  }
  getAlbumById(id: number): Observable<Photos[]> {
    return this.http.get<Photos[]>(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
  }
  getNameById(nameId: number) {
    return this.users?.find(obj => obj.id === nameId)?.name;
  }
  getPostById(postId: any) {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
  getCommentsById(postId: any) {
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  }
  getToDos(): Observable<ToDos[]> {
    return this.http.get<ToDos[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
