import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser = {
    userName: "",
    password: "",
    password2: "",
  }
  
  warning: any;

  success: boolean = false;
  loading: boolean = false;

  private sub: any;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.registerUser.userName !== "" && (this.registerUser.password !== "" && this.registerUser.password2 !== "") &&
    this.registerUser.password === this.registerUser.password2) {

      this.loading = true;

      this.sub = this.auth.register(this.registerUser).subscribe(() => {
        this.success = true;
        this.warning = null;
        this.loading = false
        console.log("success is " +this.success)
      },
      (err) => {
        this.success = false;
        this.warning = err.error.error;
        this.loading = false
      });
    }

    if (this.registerUser.userName !== "" && (this.registerUser.password !== "" && this.registerUser.password2 !== "") &&
    this.registerUser.password !== this.registerUser.password2) {

      this.loading = true;

      this.sub = this.auth.register(this.registerUser).subscribe(() => {},
      (err) => {
        this.success = false;
        this.warning = err.error.error;
        this.loading = false
      });
    }
  }

  setSuccess(s: boolean) {
    this.success = s;
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }
}
