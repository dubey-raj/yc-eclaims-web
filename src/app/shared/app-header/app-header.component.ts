import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../core/services/account.service';
import { User } from '../../core/models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  user: User|null = null;
  constructor(private authService: AuthService){}

  async ngOnInit() {
    if(this.authService.currentUser){
      this.user = this.authService.currentUser;
    }
  }
  logout(){
    this.authService.logout();
  }
}
