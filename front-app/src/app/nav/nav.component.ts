import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
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
