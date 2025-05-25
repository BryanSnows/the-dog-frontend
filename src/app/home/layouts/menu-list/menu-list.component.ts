import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
})
export class MenuListComponent implements OnInit, OnDestroy {
  userImage = '';
  userName = '';
  userRole: any = '';
  isMobile: boolean = false;
  isEditing: boolean = false;
  routeActive!: string;
  formHasChanged: any;
  inspectionInProgress: any;
  private readonly subscriptions = new Subscription();

  @Input() menuOpen!: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth >= 768 ? false : true;
  }

  constructor(private readonly router: Router, public dialog: MatDialog) {
    router.events.subscribe(() => {
      this.routeActive = this.router.url;
      this.isEditing = this.routeActive.includes('/edit/');
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getUserData() {
    const userImagePath = './../../../assets/images/icons/profile-icon.svg';

    this.userName = 'ADMIN';
    this.userRole = 'ADMIN';
    this.userImage = userImagePath;
  }

  goToModule(menu: string) {
    if (
      this.routeActive.includes('/inspections/new') &&
      this.inspectionInProgress
    ) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '400px',
        data: {
          title: 'Deseja sair da página?',
          message:
            'Ao voltar para a lista, sua inspeção continuará em progresso.',
          iconPath: '../../../../assets/images/modal-icon.svg',
          buttonClass: 'btn-modal-confirm',
          buttonAction: 'Confirmar',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([`${menu}`]);
        }
      });
    } else if (!this.isEditing || (this.isEditing && !this.formHasChanged)) {
      this.router.navigate([`${menu}`]);
    } else {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '400px',
        data: {
          title: 'Cancelar ação?',
          message:
            'Tem certeza que deseja cancelar? Os dados alterados não serão salvos.',
          iconPath: '../../../../assets/images/modal-icon.svg',
          buttonClass: 'btn-modal-confirm',
          buttonAction: 'Confirmar',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([`${menu}`]);
        }
      });
    }
  }
}
