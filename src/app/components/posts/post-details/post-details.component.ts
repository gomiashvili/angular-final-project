import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { Comment } from 'src/app/interfaces/comment.interface'
import { ApiService } from 'src/app/services/api.service';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  currentPost?: Post;
  comments!: Comment[];
  newCommentName: string = '';
  newCommentBody: string = '';
  comment!: Comment;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private postService: PostServiceService) { }

  ngOnInit() {
    this.route.data.subscribe(({ post }) => {
      this.currentPost = post;
    })
    this.route.data.subscribe(({ comments }) => {
      this.comments = comments;
    })

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
  addNewComment() {
    this.comment = {
      postId: Math.floor(Math.random() * 100),
      id: Math.floor(Math.random() * 100),
      name: this.newCommentName,
      email: '',
      body: this.newCommentBody
    },
      this.newCommentName = '';
    this.newCommentBody = '';

    this.postService.sendData(this.comment, this.currentPost?.id).subscribe(
      response => {
        console.log('Data sent successfully!');

      },
      error => {
        console.error('Error while sending data:', error);

      }
    );
    this.apiService.getCommentsById(this.currentPost?.id).subscribe((comments) => {
      this.comments = comments;
    })
  }
}
