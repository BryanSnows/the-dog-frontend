import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [TranslateModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @ViewChild('searchBtn') searchBtn!: ElementRef;
  @Input() set isDisabled(disable: boolean) {
    this.disableBtn = disable;
  }

  searchTerm: string = '';
  isPressed: boolean = false;
  disableBtn: boolean = false;
  @Input() placeholder!: string;
  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    if (this.searchBtn && this.searchBtn.nativeElement) {
      this.searchBtn.nativeElement.classList.add('clicked');
      this.searchBtn.nativeElement.blur();
    }

    this.search.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }
}
