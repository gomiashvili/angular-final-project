import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/PostsComponent';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { postResolver } from './guards/post-resolve.guard';
import { CommentsResolver } from './guards/comments-resolve.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  {
    path: 'posts/:id', component: PostDetailsComponent,
    resolve: { post: postResolver, comments: CommentsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
