import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    usernameControl: new FormControl('hello@test.com', [Validators.required]),
    passwordControl: new FormControl('', [Validators.required]),
  });

  submitted: boolean = false;
  loading: boolean = false;
  forwardUrl: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.forwardUrl = this.route.snapshot.queryParams['forwardUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.signInForm.invalid) {
    //   return;
    // }

    this.loading = true;

    const credentials = btoa(
      `${this.signInForm.controls.usernameControl.value}:${this.signInForm.controls.passwordControl.value}`
    );

    this.authenticationService
      .signIn(credentials)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.forwardUrl]);
        },
        (error) => {
          // this.error = error;
          this.loading = false;
        }
      );
  }
}
