import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuService } from '../../service/menu.service';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: MenuItem[] = [];
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {

    // 🔥 Subscribe to menu
    this.menuService.menu$.subscribe(menu => {
      this.menuItems = menu;
      this.updateBreadcrumb();
    });

    // 🔥 Listen to route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  private updateBreadcrumb(): void {
    const url = this.router.url;
    this.breadcrumbs = this.findBreadcrumb(url, this.menuItems);
  }

  private findBreadcrumb(url: string, items: MenuItem[]): MenuItem[] {

    for (let item of items) {

      if (item.routerLink && ('/' + item.routerLink) === url) {
        return this.buildParentPath(item);
      }

      if (item.children?.length) {
        const result = this.findBreadcrumb(url, item.children);
        if (result.length) return result;
      }
    }

    return [];
  }

  private buildParentPath(item: MenuItem): MenuItem[] {

    const path: MenuItem[] = [];
    let current: MenuItem | undefined = item;

    while (current) {
      path.unshift(current);
      current = current.parent;
    }

    return path;
  }

}
