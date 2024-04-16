import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { Comment } from 'src/app/interfaces/comment.interface';
import { ApiService } from 'src/app/services/api.service';
import { CommentService } from 'src/app/services/comment.service';
import { SaveService } from 'src/app/services/save.service';
import { PostService } from 'src/app/services/post.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  currentPost!: Post;
  comments!: Comment[]; //current post comments
  newCommentName: string = ''; //ngModel name for name of new comment
  newCommentBody: string = ''; //ngModel name for body of new comment
  postNewTitle: string = ''; //ngModel name for edited post title
  postNewBody: string = ''; //ngModel name for edited post body
  newComment!: Comment;
  showEditWindow: boolean = false;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private saveService: SaveService,
    private postService: PostService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.scrollToBottom();
    const currentId = Number(this.route?.snapshot.paramMap.get('id'));
    //if there is no new post, get data from api, else from service
    if (this.saveService.isPostChanged === false) {
      this.route.data.subscribe(({ post }) => {
        this.currentPost = post;
      });
      this.apiService
        .getPosts()
        .subscribe((data) => (this.saveService.savedPosts = data));
    } else {
      this.currentPost =
        this.saveService.savedPosts.find((f) => f.id == currentId) ??
        this.currentPost;
    }

    //if there is no new commment, get data from api, else from service
    if (
      this.saveService.isNewComment.find((f) => f.id == currentId)?.changed ==
        false ||
      this.saveService.isNewComment.find((f) => f.id == currentId)?.changed ==
        undefined
    ) {
      this.route.data.subscribe(({ comments }) => {
        this.comments = comments;
      });
    } else {
      this.comments = this.saveService.allComments[currentId];
    }
  }
  private scrollToBottom(): void {
    setTimeout(() => {
      const container =
        this.elementRef.nativeElement.querySelector('.comments');
      container.scrollTop = container.scrollHeight;
    });
  }
  goBack() {
    window.history.back();
  }
  addNewComment() {
    this.saveService.isNewComment.push({
      id: this.currentPost.id,
      changed: true,
    }); //comments array for current post is changed
    this.newComment = {
      postId: this.currentPost?.id,
      id: this.comments.length + 1,
      name: this.newCommentName,
      email: '',
      body: this.newCommentBody,
    };
    this.comments = [...this.comments, this.newComment];
    this.saveService.allComments[this.currentPost.id] = this.comments; //saved updated comment array

    console.log(this.saveService.allComments);

    this.saveService.savedComments = this.comments;

    this.scrollToBottom();
    this.newCommentName = '';
    this.newCommentBody = '';

    this.commentService
      .sendData(this.newComment, this.currentPost?.id)
      .pipe(
        tap(() => console.log('Comment added successfully!')),
        catchError((error) => {
          console.error('Error while adding comment:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  editPost() {
    this.showEditWindow = true;
  }
  closeWindow() {
    this.showEditWindow = false;
  }
  updatePost() {
    this.showEditWindow = false;
    this.saveService.isPostChanged = true;
    this.currentPost.title = this.postNewTitle;
    this.currentPost.body = this.postNewBody;

    const index = this.saveService.savedPosts.findIndex(
      (post) => post.id === this.currentPost?.id
    );
    if (index != -1) {
      this.saveService.savedPosts[index] = this.currentPost;
    }

    this.postService
      .updatePost(this.currentPost)
      .pipe(
        tap(() => console.log('Current post updated successfully!')),
        catchError((error) => {
          console.error('Error while updating data:', error);
          return of(null); // Return an observable to prevent errors from propagating
        })
      )
      .subscribe();
    console.log(this.currentPost);
  }
}
