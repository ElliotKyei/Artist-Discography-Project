import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service'

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any;
  artist: any;
  private id: any;
   private albumSub: any;
   private artistSub: any;
   private sub: any;

  constructor(private data: MusicDataService, private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.sub =this.route.params.subscribe(params => {
      this.id = params['id'];
  
     this.artistSub = this.data.getArtistById(this.id).subscribe(data => {this.artist = data; });
      this.albumSub = this.data.getAlbumsByArtistId(this.id).subscribe(data => { 
        const newData: any = [];
        let allAlbums = "";
       
        data.items.forEach((element: any) => {
          
          if (allAlbums.includes(element.name) === false) {
          newData.push(element)
          allAlbums = allAlbums + element.name +  ", ";
          }

        });

        this.albums = newData;
      });
   });  
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.artistSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

}
