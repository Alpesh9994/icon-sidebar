import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  routerLink: string | null;
  children: MenuItem[];
  parent?: MenuItem;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuTree = new BehaviorSubject<MenuItem[]>([]);
  menu$ = this.menuTree.asObservable();

  constructor(private http: HttpClient) {}

  loadMenu() {

    this.http.get<any[]>('assets/sidemenu.json')
      .subscribe(res => {

        const filtered = res
          .filter(a => a.moduleType === 1 && a.isShownAsMenu === true)
          .sort((a, b) => a.moduleIndex - b.moduleIndex);

        const map = new Map<string, MenuItem>();

        filtered.forEach(m => {
          map.set(m.moduleId, {
            id: m.moduleId,
            label: m.displayName,
            icon: m.icon || '',
            routerLink: m.routerLink,
            children: []
          });
        });

        const root: MenuItem[] = [];

        filtered.forEach(m => {
          const item = map.get(m.moduleId)!;

          if (m.parentModuleId && map.has(m.parentModuleId)) {
            const parent = map.get(m.parentModuleId)!;
            item.parent = parent; // 🔥 parent tracking
            parent.children.push(item);
          } else {
            root.push(item);
          }
        });

        this.menuTree.next(root);
      });
  }

  getMenuTree(): MenuItem[] {
    return this.menuTree.value;
  }
}