import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuListComponent } from './layouts/menu-list/menu-list.component';
import { MatSidenav } from '@angular/material/sidenav';
import { FullscreenService } from '../shared/services/fullscreen.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule, MenuListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  routeActive: string = '';
  mainRouteActive: string = '';
  menuOpen: boolean = false;
  isMobile: boolean = false;
  isFullscreen: boolean = true;
  sidenavWidth: any;
  loggedUser: any = {};

  @ViewChild(MenuListComponent) menuList!: MenuListComponent;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth >= 768 ? false : true;
  }

  constructor(
    private readonly router: Router,
    private readonly fullscreenService: FullscreenService
  ) {
    router.events.subscribe(() => {
      this.routeActive = this.router.url;
      this.mainRouteActive = this.routeActive
        .replace(/^\//, '')
        .replace(/\/.*/, '');
    });

    this.fullscreenService.fullscreen$.subscribe((value: boolean) => {
      this.isFullscreen = value;
    });

    this.menuOpen = false;
  }

  ngOnInit(): void {
    this.loggedUser = 'Usuário';
  }

  ngAfterViewInit() {
    this.getMenuWidth();

    window.addEventListener('resize', () => {
      this.getMenuWidth();
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    setTimeout(() => {
      this.getMenuWidth();
    });
  }

  getMenuWidth() {
    this.sidenavWidth = this.sidenav._getWidth();
    const buttonPosition = this.sidenavWidth + 24 - 15;
    document.documentElement.style.setProperty(
      '--left-value',
      `${buttonPosition}px`
    );
  }
}
