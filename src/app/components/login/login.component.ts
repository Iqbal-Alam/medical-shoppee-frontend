import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Form Submitted!', this.loginForm.value);
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: (response) => {
                    console.log('login response',response);
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    console.log('this.error',error);
                    this._snackBar.open(error.error.message, 'Close', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000
                    });
                }
            });
        } else {
            this._snackBar.open('Form is not valid', 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5000
            });
        }
    }


}