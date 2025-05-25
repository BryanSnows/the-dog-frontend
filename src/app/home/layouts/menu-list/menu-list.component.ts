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
    this.userName = 'Usuário';
    this.userRole = 'ADMIN';
    this.userImage = userImagePath;
  }

  goToModule(menu: string) {
    this.router.navigate([`${menu}`]);
  }
}
