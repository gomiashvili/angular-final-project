import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  savedPosts: Post[] = [];
  savedComments: Comment[] = [];
  savedUsers: User[] = [];
  isChanged: boolean = false;

  // saveData = {

  //   post: {
  //     userId: 0,
  //     id: 0,
  //     title: '',
  //     body: '',

  //   },
  //   album: {
  //     userId: 0,
  //     id: 0,
  //     title: '',

  //   }
  //   ,
  //   comment: {
  //     postId: 0,
  //     id: 0,
  //     name: '',
  //     email: '',
  //     body: '',
  //   },
  //   user: {
  //     id: 0,
  //     name: '',
  //     username: '',
  //     email: '',
  //   },
  //   photos: {
  //     albumId: 0,
  //     id: 0,
  //     title: '',
  //     url: '',
  //     thumbnailUrl: '',
  //   }
  // }
  constructor() { }
}
