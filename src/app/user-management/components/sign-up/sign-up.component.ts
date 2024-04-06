import {
	Component,
	inject,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { NewPasswordFormFieldComponent } from '../new-password-form-field/new-password-form-field.component';
import { SignUp, SignUpForm } from '../../models/sign-up-form.model';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NgClass } from '@angular/common';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { Devices } from '../../../core/models/devices';
import { MatDivider } from '@angular/material/divider';

@Component({
	selector: 'app-sign-up',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		NewPasswordFormFieldComponent,
		NgClass,
		MatDivider,
	],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
	private authService: AuthenticationService = inject(AuthenticationService);
	private responsiveService: ResponsiveService = inject(ResponsiveService);

	protected device: Signal<Devices> = this.responsiveService.device;
	protected readonly Devices = Devices;

	protected continue: WritableSignal<boolean> = signal(false);
	protected invalidSubmit: WritableSignal<boolean> = signal(false);

	protected signUpForm: FormGroup<SignUpForm> = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl(''),
	});

	protected setContinue(): void {
		const email = this.signUpForm.get('email');
		if (email?.valid) {
			this.continue.set(true);
		}
	}

	protected signUp(): void {
		if (this.signUpForm.valid) {
			const form: Partial<SignUp> = this.signUpForm.value;
			const email = form.email;
			const password = form.password;
			if (email && password) {
				this.authService.creatUser(email, password);
			}
		}
		if (this.continue()) {
			this.invalidSubmit.update(() => true);
		}
		this.setContinue();
	}
}
