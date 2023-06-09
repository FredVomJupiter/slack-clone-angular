import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isPasswordVisible: boolean = false;
  visibiltyIcon: string = 'visibility';
  tokenName = 'logged-token';
  minLengthPassword: number = 6;
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.authService.signIn(
      this.form.value.email,
      this.form.value.password
    ).subscribe({
      next: () => {
        localStorage.setItem(this.tokenName, 'logged-token');
        this.router.navigate(['dashboard'])
      },
      error: error => {
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    })
  }

  guestLogin() {
    localStorage.setItem(this.tokenName, 'guest-login');
    this.router.navigate(['dashboard']);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  /**
   * This function toggles the visibility of password
   * in login component and change the eye icon
   * @param passwordInput get password input element of html
   */
  togglePwVisibility(passwordInput: HTMLInputElement) {
    this.isPasswordVisible = !this.isPasswordVisible;
    passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
    this.visibiltyIcon = this.isPasswordVisible ? 'visibility_off' : 'visibility';
  }

}
