import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user = {
    userName: "",
    password: "",
    _id: null,
  }

  warning: any;
  loading: boolean = false;

  private sub: any;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){

    if (this.user.userName !== "" && 
    this.user.password !== ""){

      this.loading = true;

      this.sub = this.auth.login(this.user).subscribe(success => {
        this.loading = false;
        localStorage.setItem('access_token', success.token);
        this.router.navigate(['/newReleases']);
      },
      (err) => {
        this.warning = err.error.error;
        this.loading = false
      });
    }
    }


}
