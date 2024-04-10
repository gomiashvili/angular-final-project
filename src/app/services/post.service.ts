import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrlForPost = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  sendPost(data: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrlForPost}`, data);

  }
}
