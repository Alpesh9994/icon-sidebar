import { Component, OnInit } from '@angular/core';
import { MenuService } from './shared/service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'new-sidebar';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.loadMenu(); // 🔥 load once globally
  }
}
