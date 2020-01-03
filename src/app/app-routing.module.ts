import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ShoppingListResolver } from "./shopping-list/shopping-list-resolver.service";

//MOUNTING ROUTES
const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  //LAZY LOADING
  { path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule" },
  {
    path: "shopping-list",
    loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule",
    resolve: [ShoppingListResolver]
  },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
