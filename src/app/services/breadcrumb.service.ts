import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  breadcrumbs = this._breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if (route.data["breadcrumb"]) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/'),
          isUltimo: true
        };
        breadcrumbs.forEach( x => x.isUltimo == false )
        breadcrumbs.push(breadcrumb);
      }
      if (route.firstChild) {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
      }
    }
  }

  private getLabel(data: Data) {
    return typeof data["breadcrumb"] === 'function' ? data["breadcrumb"](data) : data["breadcrumb"];
  }

}

export class Breadcrumb {
  label!: string
  url!: string
  isUltimo!: boolean
}
