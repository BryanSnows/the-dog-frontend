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

    visiblePages.push(0);

    let firstPage = Math.max(
      1,
      this.currentPage - Math.floor(pageCountToShow / 2)
    );
    let lastPage = Math.min(
      this.totalPages - 2,
      firstPage + pageCountToShow - 1
    );

    if (lastPage >= this.totalPages - 2) {
      firstPage = Math.max(1, this.totalPages - pageCountToShow - 1);
      lastPage = this.totalPages - 2;
    }

    if (firstPage > 1) {
      visiblePages.push(-1);
    }

    for (let i = firstPage; i <= lastPage; i++) {
      visiblePages.push(i);
    }

    if (lastPage < this.totalPages - 2) {
      visiblePages.push(-1);
    }

    if (this.totalPages > 1) {
      visiblePages.push(this.totalPages - 1);
    }

    return visiblePages;
  }
}
