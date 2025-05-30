import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-results',
  standalone: true,
  imports: [],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.scss',
})
export class NoResultsComponent {
  @Input() titleMessage!: string;
  @Input() secMessage!: string;
}
