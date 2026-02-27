import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class BreadcrumbService {
    buildBreadcrumb(currentItem: any): any[] {
        const path: any[] = [];

        let node= currentItem;

        while (node) {
            path.unshift({
                label: node.label,
                routerLink: node.routerLink
            });

            node = node.parent;
        }

        return path;
    }
}