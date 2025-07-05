import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';
import { AuthService } from '../../core/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { AccountService } from '../../core/services/account.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService, LocalStorageService, TokenStorageService, AccountService, NotificationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  returnUrl!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field!.invalid && field!.touched;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    await firstValueFrom(
      await this.authenticationService.login(
        this.f['email'].value,
        this.f['password'].value
      )
    ).then(() => {
      const userRole = this.authenticationService.userRole;
      let landingPageUrl = '/claims/assigned-claims';
      if(userRole == 'Customer'){
        landingPageUrl = '/claims/my-claims';
      }
      this.router.navigate([landingPageUrl]);
    });
  }

  // getter for easy access to form fields
  private get f() {
    return this.loginForm.controls;
  }
}
