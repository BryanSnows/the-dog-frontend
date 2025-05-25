import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { AlertSnackbarComponent } from '../../../shared/components/alert-snackbar/alert-snackbar.component';
import { DogService } from '../../../shared/services/dog.service';

@Component({
  selector: 'app-dog-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
})
export class DogListComponent implements OnInit {
  dogs: any[] = [];
  isLoading = false;
  searchTimeout: any;
  currentPage = 0;
  totalPages = 1;
  filters: any = {};
  titleMessage: string = 'general.no-result-title';
  secMessage: string = 'general.no-result-message';

  constructor(
    private readonly dogService: DogService,
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDogs(this.currentPage);
  }

  setPage(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    this.loadDogs(this.currentPage);
    this.isLoading = false;
  }

  searchDogs(searchTerm: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filters.search = searchTerm;
      this.loadDogs(0);
    }, 500);
  }

  deleteDog(dog: any) {
    this.dogService.delete(dog.id).subscribe(() => {
      this.dogs = this.dogs.filter((d) => d.id !== dog.id);
      this.showSnackbar('dog.deleted', 'dog.deleted-success', 'success');
    });
  }

  loadDogs(page: number) {
    const search = this.filters.search || '';
    this.dogService.findAll(5, page, search).subscribe({
      next: (response) => {
        this.dogs = Array.isArray(response) ? response : response.slice();
        this.totalPages = Math.ceil(this.dogs.length / 5);
        if (this.dogs.length === 0) this.showEmptyResult();
      },
      error: () => {
        this.showSnackbar('error.error', 'error.load-error', 'error');
      },
    });
  }

  openConfirmationDialog(dog: any): void {
    const title = 'Excluir usuário' + '?';
    const message =
      'Tem certeza que deseja excluir este dog? Essa ação não poderá ser desfeita.';
    const iconPath = '../../../../assets/images/delete-modal-icon.svg';
    const buttonClass = 'btn-modal-delete';
    const buttonAction = 'Excluir';

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: { title, message, iconPath, buttonClass, buttonAction },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteDog(dog);
    });
  }

  showSnackbar(title: string, subtitle: string, type: string) {
    this.snackBar.openFromComponent(AlertSnackbarComponent, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [`${type}-snackbar`],
      data: { title, subtitle, type },
    });
  }

  showEmptyResult() {
    this.titleMessage = 'Não há resultados para essa busca';
    this.secMessage =
      'Verifique se há algum erro de digitação e tente novamente';
  }
}
