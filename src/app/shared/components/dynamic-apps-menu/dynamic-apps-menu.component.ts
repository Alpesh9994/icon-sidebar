
import { Component, Input, OnInit } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { HttpService } from '../../service/http.service';
// import { BaseService } from '../../service/base.service';
// import { storageConst } from '../../helper/common';

// interface DynamicAppMenuItem {
//   appName: string;
//   uiAppLogoId: string;
//   uiAppLogoPath: string;
//   uiAppUrl?: string;
//   displayName?: string;
// }

@Component({
  selector: 'app-dynamic-apps-menu',
  templateUrl: './dynamic-apps-menu.component.html',
  styleUrls: ['./dynamic-apps-menu.component.css']
})
export class DynamicAppsMenuComponent {
//   appMenuItems: DynamicAppMenuItem[] = [];

//   @Input() get menuItemSource() {
//     return this.appMenuItems;
//   }
//   set menuItemSource(val) {
//     this.appMenuItems = val;
//   }

//   constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private baseService: BaseService) {
//   }

//   ngOnInit(): void {
//   }

//   openApp(item: DynamicAppMenuItem) {
//    window.open(item.uiAppUrl, '_blank');
//   }
//   // openApp(item: DynamicAppMenuItem) {
//   //   // const accessToken = localStorage.getItem('access_token');
//   //   let accessToken = this.baseService.getLocalData(storageConst.accessToken);
//   //   //const url = `${item.uiAppUrl}?access_token=${encodeURIComponent(accessToken!)}`;
//   //   const url = item.uiAppUrl.replace('{accesstoken}', encodeURIComponent(accessToken!));
//   //   window.open(url, '_blank');
//   // }

//  setIconUrl(imagePath: string | null): any {
//     let urlPath = '';
//     if(imagePath) {
//       if (imagePath.toLowerCase().indexOf('svg') !== -1) {
//         return this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
//       } else {
//         urlPath = imagePath;
//       }
//     }
//     return urlPath;
//   }
  
}

