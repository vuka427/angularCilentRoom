import { Injectable, inject } from "@angular/core";
import { SystemConstants } from "../common/system.constants";
import { UrlConstants } from "../common/url.constants";
import { Router } from "@angular/router";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthenService } from "../services/authen.service";

export const AuthGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService: AuthenService = inject(AuthenService);
    const router: Router = inject(Router);
  
    if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
        return true;
    }
    else {
        router.navigate([UrlConstants.LOGIN], {
            queryParams: {
                returnUrl: state.url
            }
        });
        return false;
    }
  };
