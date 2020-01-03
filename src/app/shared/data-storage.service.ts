import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put("https://shoprecipes.firebaseio.com/recipes.json", recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    //ADD TOKEN TO OUTGOING REQUESTS
    //FETCH WHILE LOGGED IN

    return this.http
      .get<Recipe[]>("https://shoprecipes.firebaseio.com/recipes.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );

    // console.log(this.authService.user);
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>(
    //       "https://shoprecipes.firebaseio.com/recipes.json",
    //       {
    //         params: new HttpParams().set("auth", user.token)
    //       }
    //     );
    //   }),
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : []
    //       };
    //     });
    //   }),
    //   tap(recipes => {
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );

    // return this.http
    //   .get<Recipe[]>("https://shoprecipes.firebaseio.com/recipes.json")
    //   .pipe(
    //     map(recipes => {
    //       return recipes.map(recipe => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : []
    //         };
    //       });
    //     }),
    //     tap(recipes => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   );
    //   .subscribe(recipes => {
    //     this.recipeService.setRecipes(recipes);
    //   });
  }
}
