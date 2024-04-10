import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
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
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAlbums().subscribe((albums) => {
      this.albums = albums;

    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  getNameById(nameId: number) {
    return this.users?.find(obj => obj.id === nameId)?.name;
  }

}
