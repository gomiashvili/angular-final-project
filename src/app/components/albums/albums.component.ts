import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
import { Photos } from 'src/app/interfaces/photos.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums!: Album[];
  users!: User[];
  albumLength!: [];
  total: number[] = []
  totalAlbums!: number;
  photos!: Photos[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAlbums().subscribe((albums) => {
      this.albums = albums;
      const totalAlbums = albums.length;
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.apiService.getPhotos().subscribe((photos) => {
      this.photos = photos;
    })
    // for (let i: number = 0; i < 100; i++) {
    //   let currentAlbum = JSON.stringify(this.apiService.getAlbumById(i));
    //   this.total.push(currentAlbum.length);
    // }
    console.log(this.total)
  }
  getNameById(nameId: number) {
    return this.users?.find(obj => obj.id === nameId)?.name;
  }

  getPhotosNumber(albumId: number) {
    return this.photos?.filter((photo) => photo.albumId === albumId).length;
  }
  // getAlbumLength() {
  //   for (let i = 0; i < this.totalAlbums; i++) {
  //     let currentAlbum = this.apiService.getAlbumById(i).subscribe;
  //     this.total.push(currentAlbum.length);
  //   }
  // }

}
