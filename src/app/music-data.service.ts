import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient, private route: ActivatedRoute) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    })); 
  }

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    })); 
  }

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    })); 
  }

  searchArtists(searchString: String): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    })); 
  }//&type=artist&limit=50

  addToFavourites(id: any): Observable<[String]> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
   return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
  })); 
  }
  
  removeFromFavourites(id: any): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      if (favouritesArray.length > 0){
        return  this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=`+favouritesArray.join(), { headers: { "Authorization": `Bearer ${token}` } });
        })); 
      }
      else
      return new Observable(o=>o.next({tracks: []}));
    }));
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      if (favouritesArray){
        console.log("FAV LIST ", Object.values(favouritesArray).join())
        return  this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${Object.values(favouritesArray).join()}`, { headers: { "Authorization": `Bearer ${token}` } });
        })); 
      }
      else
      return new Observable(o=>o.next({tracks: []}));
    }));
  }
}