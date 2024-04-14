import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interfaces/album.interface';
import { Photos } from 'src/app/interfaces/photos.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit {
  photos!: Photos[];
  currentAlbum!: Album;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ photos }) => {
      this.photos = photos;
      console.log(this.photos);
    })

    // this.apiService.getAlbumById(this.currentAlbum.id).subscribe((photos) => {
    //   this.photos = photos;
    // });
  }

}
