import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../interfaces/comment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  constructor(private http: HttpClient) { }
  sendData(data: Comment, postId: any): Observable<Comment> {
    let apiUrlForComment = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
    return this.http.post<Comment>(`${apiUrlForComment}`, data);
  }


  // postId!: string;
  // private apiUrlForComment = `https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`;
  // constructor(private http: HttpClient) { }
  // sendData(data: Comment): Observable<Comment> {
  //   return this.http.post<Comment>(`${this.apiUrlForComment}/endpoint`, data);
  // }
}
