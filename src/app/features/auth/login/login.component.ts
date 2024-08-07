import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { Role } from '../../dashboard/users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  roles = Object.values(Role);

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    // @Inject(APP_CONFIG) private appConfig: any
  ) {
    this.loginForm = this.fb.group({
      email: ['test@mail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      role: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('El formulario no es valido');
    } else {
      const data = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        role: this.loginForm.get('role')?.value
      };
      this.authService.login(data);
    }
  }
  
}
