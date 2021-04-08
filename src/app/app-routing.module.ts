import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { SearchResultsComponent } from './search-results/search-results.component'
import { FavouritesComponent } from './favourites/favourites.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService] },
  { path: 'newReleases', component: NewReleasesComponent, canActivate: [GuardAuthService] },
  { path: 'album/:id', component: AlbumComponent, canActivate: [GuardAuthService] },
  { path: 'artist/:id', component: ArtistDiscographyComponent, canActivate: [GuardAuthService] },
  { path: "search", component: SearchResultsComponent, canActivate: [GuardAuthService]},
  { path: "favourites", component: FavouritesComponent, canActivate: [GuardAuthService]},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: '', component: NewReleasesComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
