import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Ingredient } from "../shared/ingredient.model";
import { DataStorageService } from "../shared/data-storage.service";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({ providedIn: "root" })
export class ShoppingListResolver implements Resolve<Ingredient[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const shoppingList = this.shoppingListService.getIngredients();
    if (shoppingList.length === 0) {
      return this.dataStorageService.fetchShoppingList();
    } else if (shoppingList === null) {
      this.dataStorageService.storeShoppingList();
    } else {
      return shoppingList;
    }
  }
}
