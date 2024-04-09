import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Post } from "../interfaces/post.interface";
import { ApiService } from "../services/api.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class postResolver implements Resolve<Post> {
  constructor(private apiService: ApiService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> | Promise<Post> | Post {
    return this.apiService.getPostById(route.paramMap.get('id'));
  }
}