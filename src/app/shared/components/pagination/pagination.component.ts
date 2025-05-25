import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  setPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i);
  }

  get visiblePages(): number[] {
    const pageCountToShow = 4;
    const visiblePages = [];

    // Always show the first page
    visiblePages.push(0);

    // First central page visible
    let firstPage = Math.max(
      1,
      this.currentPage - Math.floor(pageCountToShow / 2),
    );
    let lastPage = Math.min(
      this.totalPages - 2,
      firstPage + pageCountToShow - 1,
    );

    // Adjust first and last if close to the end
    if (lastPage >= this.totalPages - 2) {
      firstPage = Math.max(1, this.totalPages - pageCountToShow - 1);
      lastPage = this.totalPages - 2;
    }

    // If theres space between first and central pages, show "..."
    if (firstPage > 1) {
      visiblePages.push(-1); // Representa o "..."
    }

    // Add central pages
    for (let i = firstPage; i <= lastPage; i++) {
      visiblePages.push(i);
    }

    // If theres space between central and last pages, show "..."
    if (lastPage < this.totalPages - 2) {
      visiblePages.push(-1); // Representa o "..."
    }

    // Always show the last page
    if (this.totalPages > 1) {
      visiblePages.push(this.totalPages - 1);
    }

    return visiblePages;
  }
}
