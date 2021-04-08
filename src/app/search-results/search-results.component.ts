import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  results: any;
  searchQuery: any;
  private searchSub: any;
  private resultSub: any;
  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchSub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || 0;

      this.resultSub= this.data.searchArtists(this.searchQuery).subscribe(data => { 
        
        function validateImg(artist: any){
         return artist.images.length > 0
        }

        let validArtists = data.artists.items.filter(validateImg)
        this.results = validArtists;
      
      });
    });
  }

  
  ngOnDestroy(){
    this.searchSub.unsubscribe();
    this.resultSub.unsubscribe();
  }

}
