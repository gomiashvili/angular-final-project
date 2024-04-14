import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/PostsComponent';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { postResolver } from './guards/post-resolve.guard';
import { CommentsResolver } from './guards/comments-resolve.guard';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { PhotosResolveGuard } from './guards/photos-resolve.guard';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  {
    path: 'posts/:id', component: PostDetailsComponent,
    resolve: { post: postResolver, comments: CommentsResolver }
  },
  { path: 'albums', component: AlbumsComponent },
  {
    path: 'albums/:id', component: AlbumDetailsComponent,
    resolve: { photos: PhotosResolveGuard }
  },
  { path: 'todos', component: TodosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
