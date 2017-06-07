import { Component, OnInit } from '@angular/core';
import { UserManager } from "app/bl/user-manager";
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  template: `
    <div class="ui vertical segment">
      <div class="ui container">
        <div class="ui secondary menu">
          <a *ngIf="userManager.user" class="ui item" [routerLink]="'/home'" [routerLinkActive]="'active'">
            <h3 class="ui orange header">Texas Hold'em</h3>
          </a>
          <div *ngIf="!userManager.user" class="ui item">
            <h3 class="ui orange header">Texas Hold'em</h3>
          </div>
          <div class="right menu" *ngIf="!userManager.user">
            <a class="item" [routerLink]="'/login'" [routerLinkActive]="'active'">
              <i class="sign in icon"></i>
              Login
            </a>
          </div>
          <div class="right menu" *ngIf="userManager.user">
            <div class="item">
              Welcome: 
              &nbsp;
              <b>{{userManager.user.displayName}} ({{userManager.user.email}})</b>
            </div>
            <a class="item" (click)="logout()">
              <i class="sign out icon"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NavComponent {
  constructor(public userManager: UserManager, private router: Router) {}

  logout() {
    this.userManager
      .logout()
      .then(x => {
        this.router.navigateByUrl('/login');
      });
  }
}
