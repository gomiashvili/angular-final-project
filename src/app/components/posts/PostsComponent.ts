import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts!: Post[];
    users!: User[];
    hidden: boolean = false;

    constructor(private apiService: ApiService) { }
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

}
