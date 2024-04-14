import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { Comment } from 'src/app/interfaces/comment.interface'
import { ApiService } from 'src/app/services/api.service';
import { CommentService } from 'src/app/services/comment.service';
import { SaveService } from 'src/app/services/save.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  currentPost!: Post;
  comments!: Comment[];
  newCommentName: string = '';
  newCommentBody: string = '';
  postNewTitle: string = '';
  postNewBody: string = '';
  newComment!: Comment;
  showEditWindow: boolean = false;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private commentService: CommentService,
    private saveService: SaveService, private postService: PostService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.scrollToBottom();
    if (this.saveService.isPostChanged === false) {
      this.route.data.subscribe(({ post }) => {
        this.currentPost = post;
      });
      this.apiService.getPosts().subscribe((data) =>
        this.saveService.savedPosts = data);
    } else {
      const currentId = Number(this.route?.snapshot.paramMap.get('id'));
      this.currentPost = this.saveService.savedPosts.find(f => f.id == currentId) ?? this.currentPost;
    }


    if (this.saveService.isNewComment === false) {
      this.route.data.subscribe(({ comments }) => {
        this.comments = comments;
      })
    } else {
      this.comments = this.saveService.savedComments;
    }

    // this.apiService.getCommentsById(this.currentPost?.id).subscribe((comments) => {
    //   this.comments = comments;
    //   console.log(this.currentPost?.id);
    // });
    // console.log(this.comments);


    // const postId = Number(this.route.snapshot.paramMap.get('id'));
    // console.log(postId)
    // this.currentPost = this.posts?.find(obj => obj.id == postId);

    // console.log(this.currentPost);
  }
  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.elementRef.nativeElement.querySelector('.comments');
      container.scrollTop = container.scrollHeight;
    });
  }
  addNewComment() {
    this.saveService.isNewComment = true;
    this.newComment = {
      postId: this.currentPost?.id,
      id: this.comments.length + 1,
      name: this.newCommentName,
      email: '',
      body: this.newCommentBody
    };
    this.comments = [
      ...this.comments,
      this.newComment,
    ];
    this.scrollToBottom();
    this.saveService.savedComments = this.comments;
    this.newCommentName = '';
    this.newCommentBody = '';

    this.commentService.sendData(this.newComment, this.currentPost?.id).subscribe(
      response => {
        console.log('Comment added successfully!');

      },
      error => {
        console.error('Error while adding comment', error);

      }
    );

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


    const index = this.saveService.savedPosts.findIndex(post => post.id === this.currentPost?.id);
    if (index != -1) {
      this.saveService.savedPosts[index] = this.currentPost;
    }
    this.postService.updatePost(this.currentPost).subscribe(
      response => {
        console.log('Current post updated successfully!');

      },
      error => {
        console.error('Error while updating data:', error);

      }
    );
  }
}
