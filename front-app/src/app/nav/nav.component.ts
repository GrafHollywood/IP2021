import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user = null;
  constructor(private authService: AuthService, private router: Router) {
    authService.changedUser((user) => {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }
  async signOut() {
    try {
      await this.authService.doLogOut();
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error);
    }
  }
}
