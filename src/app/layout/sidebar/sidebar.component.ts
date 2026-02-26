import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


interface MenuItem {
  id: string;
  label: string;
  icon: string;
  routerLink: string | null;
  children: MenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  hasSubmenu?: boolean;
  submenu?: SubSubMenuItem[];
}

interface SubSubMenuItem {
  id: string;
  label: string;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit,OnChanges {

  @Input() isMobileOpen = false;
  @Input() isMobileView = false;
  
  @Output() close = new EventEmitter<void>();

  @ViewChild('pixelGrid') pixelGrid!: ElementRef<HTMLDivElement>;

  expandedMenu = '';
  // expandedSubmenu = '';
  // expandedMap: { [key: string]: boolean } = {};
  expandedByLevel: { [level: number]: string } = {};
  

  isSearchOpen = false;
  searchTerm = '';
  flatMenuList: { label: string; routerLink: string }[] = [];
  filteredMenuList: { label: string; routerLink: string }[] = [];

  menuItems: MenuItem[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  ngOnChanges(changes: SimpleChanges): void {

  // 🔥 If sidebar closed
    if (changes['isMobileOpen'] && !changes['isMobileOpen'].currentValue) {
      this.resetSidebarState();
    }

    // 🔥 If switching between web <-> mobile
    if (changes['isMobileView'] && !changes['isMobileView'].firstChange) {
      this.resetSidebarState();
    }
  }

  private resetSidebarState(): void {

    this.expandedMenu = '';
    this.expandedByLevel = {};

    this.isSearchOpen = false;
    this.searchTerm = '';
    this.filteredMenuList = [];
  }
  // ngOnChanges(changes: SimpleChanges): void {

  //   if (changes['isMobileOpen'] && !changes['isMobileOpen'].currentValue) {

  //     // Reset submenu state
  //     this.closeAllMenusState();

  //     // 🔥 Reset search state
  //     this.isSearchOpen = false;
  //     this.searchTerm = '';
  //     this.filteredMenuList = [];
  //   }
  // }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.createPixels();
    });
  }

  private closeAllMenusState(): void {
    this.expandedMenu = '';
    this.expandedByLevel = {};
  }

  createPixels() {

    const grid = this.pixelGrid.nativeElement;

    grid.innerHTML = ''; // clear if already exists

    const total = 10 * 10;

    for (let i = 0; i < total; i++) {

      const pixel = document.createElement('div');
      pixel.classList.add('pixel');

      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;

      pixel.style.setProperty('--x', `${x}px`);
      pixel.style.setProperty('--y', `${y}px`);

      pixel.style.backgroundColor = '#4A6CF7';
      pixel.style.animationDelay = `${Math.random() * 1.5}s`;

      grid.appendChild(pixel);
    }
  }

  dynamicSort(property: string) {
    return function (a: any, b: any) {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    };
  }

  loadMenu(parentModuleId: any = 0) {
    // ✔ Default parent (your root group ID)
    if (parentModuleId === 0) {
      parentModuleId = '66uuPQfhZlCKLjHGm2CMwA==';
    }

    this.http.get<any[]>('assets/sidemenu.json').subscribe((res) => {
      // 1️⃣ Filter and sort according to your rules
      const filtered = res
        .filter((a) => a.moduleType === 1 && a.isShownAsMenu === true)
        .sort(this.dynamicSort('moduleIndex'));

      console.log('Filtered menu:', filtered);

      // 2️⃣ Create map for lookup
      const menuMap = new Map<string, MenuItem>();

      filtered.forEach((m) => {
        menuMap.set(m.moduleId, {
          id: m.moduleId,
          label: m.displayName,
          icon: m.icon || 'alert-circle-outline',
          routerLink: m.routerLink,
          children: [],
        });
      });

      // 3️⃣ Build final hierarchy
      const rootMenu: MenuItem[] = [];

      filtered.forEach((m) => {
        const item = menuMap.get(m.moduleId)!;

        // If parent exists → assign as child
        if (m.parentModuleId && menuMap.has(m.parentModuleId)) {
          menuMap.get(m.parentModuleId)!.children.push(item);
        }
        // Otherwise → this is root-level menu
        else if (m.parentModuleId === parentModuleId) {
          rootMenu.push(item);
        }
      });

      this.menuItems = rootMenu;
      this.flatMenuList = this.flattenMenu(this.menuItems);
    });
  }

  flattenMenu(items: MenuItem[]): { label: string; routerLink: string }[] {

    let result: { label: string; routerLink: string }[] = [];

    for (let item of items) {

      if (item.routerLink) {
        result.push({
          label: item.label,
          routerLink: item.routerLink
        });
      }

      if (item.children?.length) {
        result = result.concat(this.flattenMenu(item.children));
      }
    }

    return result;
  }

  toggleSearch(): void {

    const wasOpen = this.isSearchOpen;

    if (wasOpen) {

      // 🔥 Closing search
      this.isSearchOpen = false;

      // If mobile → close whole sidebar
      if (this.isMobileOpen) {
        this.close.emit();
      }

    } else {

      // 🔥 Opening search
      this.isSearchOpen = true;

      // Close submenu panels
      this.closeAllMenusState();
    }

    this.searchTerm = '';
    this.filteredMenuList = [];
  }

  onSearchChange(): void {

    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredMenuList = [];
      return;
    }

    this.filteredMenuList = this.flatMenuList.filter(menu =>
      menu.label.toLowerCase().includes(term)
    );
  }

  handleSearchItemClick(): void {

    // Close search panel
    this.isSearchOpen = false;

    // Reset submenu state
    this.closeAllMenusState();

    // Close sidebar in mobile
    if (this.isMobileOpen) {
      this.close.emit();
    }
  }

  toggleSubmenu(id: string): void {

    if (this.isSearchOpen) {
      this.isSearchOpen = false;
    }

    const wasOpen = this.expandedMenu === id;

    if (wasOpen) {
      this.expandedMenu = '';

      // 🔥 Reset all deeper levels
      this.expandedByLevel = {};

      if (this.isMobileOpen) {
        this.close.emit();
      }

    } else {
      this.expandedMenu = id;

      // 🔥 Reset deeper levels when switching main icon
      this.expandedByLevel = {};
    }
  }



  isSubmenuExpanded(id: string): boolean {
    return this.expandedMenu === id;
  }


  toggleDynamicSubmenu(id: string, level: number): void {

    const current = this.expandedByLevel[level];

    if (current === id) {
      // Close current
      delete this.expandedByLevel[level];

      // 🔥 Clear deeper levels
      this.clearDeeperLevels(level);
    } else {
      // Open this and close sibling automatically
      this.expandedByLevel[level] = id;

      // 🔥 Clear deeper levels (switching branch)
      this.clearDeeperLevels(level);
    }
  }

  private clearDeeperLevels(level: number): void {
    Object.keys(this.expandedByLevel).forEach(l => {
      if (+l > level) {
        delete this.expandedByLevel[+l];
      }
    });
  }
  closeAllMenus(): void {
    this.closeAllMenusState();

    this.isSearchOpen = false;

    if (this.isMobileOpen) {
      this.close.emit();
    }
  }

  isActive(link: string | null): boolean {
    if (!link || link === '') return false;
    const fullLink = '/' + link;
    return (
      this.router.url === fullLink || this.router.url.startsWith(fullLink + '/')
    );
  }

  hasActiveDescendant(item: MenuItem): boolean {
    if (item.routerLink && this.isActive(item.routerLink)) return true;
    for (let child of item.children) {
      if (this.hasActiveDescendant(child)) return true;
    }
    return false;
  }
}
