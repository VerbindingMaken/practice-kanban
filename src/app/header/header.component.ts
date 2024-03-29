import { Component, Signal, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { LoginDialogComponent } from '../authentication/components/login-dialog/login-dialog.component';
import { Credentials } from '../authentication/models/credentials.interface';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService: AuthenticationService = inject(AuthenticationService);
  private matDialog: MatDialog = inject(MatDialog);

  protected isLoggedIn: Signal<boolean> = this.authService.isLoggedIn

  protected openLoginDialog(): void {
    const loginDialogRef: MatDialogRef<LoginDialogComponent> = this.matDialog.open(LoginDialogComponent)

    loginDialogRef.afterClosed().subscribe((user: Credentials | null) => {
      if (user) {
        this.authService.login(user.email, user.password);
      }
    })
  }

  protected logout(): void {

    this.authService.logout();
  }
}
