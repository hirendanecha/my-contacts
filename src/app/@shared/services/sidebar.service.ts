import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnDestroy {

  destroyed = new Subject<void>();
  renderer!: Renderer2;

  isOpen = false;
  body!: HTMLBodyElement;

  constructor(
    private rendererFactory: RendererFactory2,
    private breakpointObserver: BreakpointObserver
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.body = document.getElementById('main-body') as HTMLBodyElement;

    this.breakpointObserver
      .observe([
        '(max-width: 574px)',
        '(min-width: 575px) and (max-width: 992px)'
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        if (result.matches) {
          this.hideSidebar();
        } else {
          this.showSidebar();
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  showSidebar(): void {
    this.renderer.addClass(this.body, 'show-sidebar');
    this.isOpen = true;
  }

  hideSidebar(): void {
    this.renderer.removeClass(this.body, 'show-sidebar');
    this.isOpen = false;
  }

  toggleSidebar(): void {
    if (this.isOpen) {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  }
}
