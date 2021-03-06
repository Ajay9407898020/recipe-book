import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class DataStorageService{
    constructor(private http : HttpClient, private recipeService : RecipeService){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-4d826-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response=>{
                // console.log(response);
                
            })
    }

    fetchRecipes(){
        this.http
        .get<Recipe[]>('https://recipe-book-4d826-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }))
            .subscribe(recipes=>{
                this.recipeService.setRecipes(recipes)
                
            }) 
    }
}