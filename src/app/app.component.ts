import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  title = 'angularDataHub-frontend';
  loading = false;
  routeActive: string = '';
  theme!: string;

  constructor(
    private readonly router: Router,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    router.events.subscribe(() => {
      this.routeActive = this.router.url;
    });
  }

  ngOnInit() {
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
