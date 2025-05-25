import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dog',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.scss',
})
export class DogComponent {}
