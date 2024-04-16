import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  users!: User[];
  hidden: boolean = false;
  postTitle!: string;
  postAuthor!: string;
  postBody!: string;
  newPost!: Post;

  constructor(
    private apiService: ApiService,
    private postService: PostService,
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.apiService
      .getUsers()
      .subscribe((data) => (this.saveService.savedUsers = data));
    // if there is not new post or edited post, get data from jsonplaceholder, else use local data saved in services
    if (
      this.saveService.isChanged == false &&
      this.saveService.isPostChanged == false
    ) {
      this.apiService.getPosts().subscribe((posts) => {
        this.posts = posts;
      });

      this.apiService.getUsers().subscribe((users) => {
        this.users = users;
      });
    } else {
      this.posts = this.saveService.savedPosts;
      this.users = this.saveService.savedUsers;
    }
  }
  showWindow() {
    // open form for new post
    this.hidden = !this.hidden;
  }
  getNameById(nameId: number) {
    // get names for POST'S USER
    return this.users?.find((obj) => obj.id === nameId)?.name;
  }
  addPost() {
    this.saveService.isChanged = true; //variable to save changed data is service
    const newUserId = this.users.length + 1;
    const newPostId = this.posts.length + 1;

    this.users = [
      {
        id: newUserId,
        name: this.postAuthor,
        username: '',
        email: '',
      },
      ...this.users,
    ];
    this.newPost = {
      userId: newUserId,
      id: newPostId,
      title: this.postTitle,
      body: this.postBody,
    };
    this.posts = [this.newPost, ...this.posts];

    this.saveService.savedPosts = this.posts;
    this.saveService.savedUsers = this.users;

    this.hidden = !this.hidden; // hide form

    this.postTitle = ''; //empty input values
    this.postAuthor = '';
    this.postBody = '';

    //send data
    this.postService
      .sendPost(this.newPost)
      .pipe(
        tap((response) => {
          console.log('Post sent successfully!', response);
        }),
        catchError((error) => {
          console.error('Error while sending data:', error);
          return of(null);
        })
      )
      .subscribe();
    console.log(this.posts);
  }
}
