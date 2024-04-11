import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';
import { SaveService } from 'src/app/services/save.service';


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


    constructor(private apiService: ApiService, private postService: PostService, private saveService: SaveService) { }
    showWindow() {
        this.hidden = !this.hidden;
    }
    ngOnInit() {
        if (this.saveService.isChanged == false) {
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
    getNameById(nameId: number) {
        return this.users?.find(obj => obj.id === nameId)?.name;
    }
    addPost() {
        this.saveService.isChanged = true;
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
        ]
        this.posts = [
            {
                userId: newUserId,
                id: newPostId,
                title: this.postTitle,
                body: this.postBody
            },
            ...this.posts,
        ];
        // const newUser: User = {
        //     id: newUserId,
        //     name: this.postAuthor,
        //     username: '',
        //     email: ''
        // };
        // const newPost: Post = {
        //     userId: newUserId,
        //     id: newPostId,
        //     title: this.postTitle,
        //     body: this.postBody
        // };
        // this.users.unshift(newUser);
        // this.posts.unshift(newPost);
        this.saveService.savedPosts = this.posts;
        this.saveService.savedUsers = this.users;
        this.hidden = !this.hidden;


        this.postTitle = '';
        this.postAuthor = '';
        this.postBody = '';


        this.postService.sendPost(this.post).subscribe(
            response => {
                console.log('Data sent successfully!', response);

            },
            error => {
                console.error('Error while sending data:', error);

            }
        );
    }


}
