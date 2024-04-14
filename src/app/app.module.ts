import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './components/posts/PostsComponent';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { TodosComponent } from './components/todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    PostDetailsComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    TodosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
