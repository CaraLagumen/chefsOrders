import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable() //ALLOWS shopping-list.service TO WORK HERE
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>(); //TRANSFERRED FROM recipe-item.component
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   "Spaghetti",
    //   "Pasta, pasta sauce, and meatballs",
    //   "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
    //   [
    //     new Ingredient("pasta", 1),
    //     new Ingredient("pasta sauce", 1),
    //     new Ingredient("meatballs", 3)
    //   ]
    // ),
    // new Recipe(
    //   "Mac & Cheese",
    //   "Macaronni and cheese",
    //   "https://storage.googleapis.com/gen-atmedia/3/2015/09/e73344b9cdfdedc315f380c25d0c9e89cdad696f.jpeg",
    //   [new Ingredient("macaronni", 1), new Ingredient("cheese", 2)]
    // )
  ];

  //NECESSARY FOR shopping-list.service
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); //RETURN ARR COPY WITH SLICE
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
