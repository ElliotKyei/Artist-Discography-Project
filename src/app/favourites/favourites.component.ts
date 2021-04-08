import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites!: Array<any>;
  private favouriteSub: any;
  
  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.favouriteSub = this.data.getFavourites().subscribe(data => this.favourites = data.tracks);
  }

  ngOnDestroy(){
    this.favouriteSub.unsubscribe();
  }

  removeFromFavourites(id: any){
    this.favouriteSub = this.data.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks);
  }
  

}
