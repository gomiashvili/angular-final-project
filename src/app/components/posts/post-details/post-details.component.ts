import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  currentPost?: Post;
  comments!: any[];

  constructor(private apiService: ApiService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data.subscribe(({ post }) => {
      this.currentPost = post;
    })
    this.route.data.subscribe(({ comments }) => {
      this.comments = comments;
      console.log(this.comments);
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

}
