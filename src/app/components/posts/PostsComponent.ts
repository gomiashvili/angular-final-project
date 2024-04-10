import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';


@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts!: Post[];
    users!: User[];
    hidden: boolean = false;
    postTitle!: string;
    postAuthor!: string;
    postBody!: string;
    post!: Post;


    constructor(private apiService: ApiService, private postService: PostService) { }
    showWindow() {
        this.hidden = !this.hidden;
    }
    ngOnInit() {
        this.apiService.getPosts().subscribe((posts) => {
            this.posts = posts;

        });

        this.apiService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
    getNameById(nameId: number) {
        return this.users?.find(obj => obj.id === nameId)?.name;
    }
    addPost() {
        this.post =
        {
            userId: Math.floor(Math.random() * 100),
            id: Math.floor(Math.random() * 100),
            title: this.postTitle,
            body: this.postBody
        }
        // ...this.posts,

        this.postAuthor = '';
        this.postBody = '';
        this.postTitle = '';
        this.hidden = !this.hidden;


        this.postService.sendPost(this.post).subscribe(
            response => {
                console.log('Data sent successfully!', response);

            },
            error => {
                console.error('Error while sending data:', error);

            }
        );
        // this.apiService.getPosts().subscribe((posts) => {
        //     this.posts = posts;

        // });
    }

}
