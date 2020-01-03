import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: `app-header`,
  templateUrl: `./header.component.html`
})
export class HeaderComponent implements OnInit, OnDestroy {
  //CREATE PROP EVENTEMITTER AND EMIT TO PARENT (APP COMPONENT)
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   //EMITTING RECIPE OR SHOPPING LIST TO PARENT ONCE CLICKED (IN HTML)
  //   this.featureSelected.emit(feature);
  // }

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //!user ? false : true;
      // console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
