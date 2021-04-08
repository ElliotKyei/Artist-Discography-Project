import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  private id: any;
  private sub: any;
  private albumSub: any;
  constructor(public snackBar: MatSnackBar, private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.albumSub = this.data.getAlbumById(this.id).subscribe(data => this.album = data)
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.albumSub.unsubscribe();
  }

  addToFavourites(trackId: any){
    this.data.addToFavourites(trackId).subscribe(data => {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      console.log('the data is ', data)
    },
    (err) => {
      this.snackBar.open("Unable to add songs to favourites");
    });
  }

}
