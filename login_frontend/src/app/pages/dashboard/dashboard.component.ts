import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { ButtonComponent } from '../../shared/ui/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private auth = inject(AuthService);

  // PUBLIC_INTERFACE
  user() {
    return this.auth.getUser();
  }

  // PUBLIC_INTERFACE
  logout() {
    this.auth.logout();
  }
}
