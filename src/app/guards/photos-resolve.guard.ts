import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../interfaces/photos.interface';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosResolveGuard implements Resolve<Photos[]> {
  constructor(private apiService: ApiService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Photos[]> | Promise<Photos[]> | Photos[] {
    return this.apiService.getAlbumById(Number(route.paramMap.get('id')));
  }

}
