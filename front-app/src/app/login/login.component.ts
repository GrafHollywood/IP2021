import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async onLogin() {
    if (this.loginForm.invalid) { return }

    const values = this.loginForm.value;
    try {
      await this.authService.doLoginEmail(values.email, values.password);
      alert('Вы вошли в учетную запись администратора');
      this.router.navigateByUrl('valve');
    } catch (error) {
      alert(error.message);
    }
  }
}
