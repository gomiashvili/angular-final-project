import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.interface';
import { IsNewComment } from '../interfaces/commentChanges';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  savedPosts: Post[] = [];
  savedComments: Comment[] = [];
  allComments: Comment[][] = new Array(50).fill([]);
  savedUsers: User[] = [];
  isChanged: boolean = false;
  isNewComment: IsNewComment[] = [{ id: 0, status: false }];
  isPostChanged: boolean = false;

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
