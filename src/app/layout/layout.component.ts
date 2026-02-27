import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  

  isMobileSidebarOpen = false;
  isMobileView = window.innerWidth <= 1024;

  toggleSidebar() {
    if (this.isMobileView) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    }
  }

  closeSidebar() {
    this.isMobileSidebarOpen = false;
  }

  @HostListener('window:resize')
  onResize() {

    const wasMobile = this.isMobileView;
    this.isMobileView = window.innerWidth <= 1024;

    if (wasMobile !== this.isMobileView) {
      this.isMobileSidebarOpen = false;
    }

  }


}
