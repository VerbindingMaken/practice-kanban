import { Component, Signal, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ResponsiveService } from '../../core/services/responsive.service';
import { Devices } from '../../core/models/devices';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-welcome',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, NgClass, RouterLink],
	templateUrl: './welcome.component.html',
	styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
	private responsiveService: ResponsiveService = inject(ResponsiveService);
	protected device: Signal<Devices> = this.responsiveService.device;
	protected readonly Devices = Devices;
}
