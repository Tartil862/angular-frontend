import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipegen',
  templateUrl: './recipegen.component.html',
  styleUrls: ['./recipegen.component.css'],
})
export class RecipegenComponent implements OnInit {
  recipeForm: FormGroup;
  ingredients: Ingredient[] = [
    {
      name: 'Chicken',
      category: 'Meat',
      imageUrl: '../../../assets/image1.jpg',
    },
    {
      name: 'Beef',
      category: 'Meat',
      imageUrl: '../../../assets/image2.jpg',
    },
    {
      name: 'Salmon',
      category: 'Seafood',
      imageUrl: '../../../assets/image3.jpg',
    },
    {
      name: 'Shrimp',
      category: 'Seafood',
      imageUrl: '../../../assets/image4.jpg',
    },
    {
      name: 'Tomato',
      category: 'Vegetable',
      imageUrl: '../../../assets/image5.jpg',
    },
    {
      name: 'Potato',
      category: 'Vegetable',
      imageUrl: '../../../assets/image6.jpg',
    },
    {
      name: 'Carrot',
      category: 'Vegetable',
      imageUrl: '../../../assets/image7.jpg',
    },
    {
      name: 'Broccoli',
      category: 'Vegetable',
      imageUrl: '../../../assets/image8.jpg',
    },
    {
      name: 'Spinach',
      category: 'Vegetable',
      imageUrl: '../../../assets/image9.jpg',
    },
    {
      name: 'Cheese',
      category: 'Dairy',
      imageUrl: '../../../assets/image10.jpg',
    },
    {
      name: 'Milk',
      category: 'Dairy',
      imageUrl: '../../../assets/image11.jpg',
    },
    {
      name: 'Eggs',
      category: 'Dairy',
      imageUrl: '../../../assets/image14.jpg',
    },
    {
      name: 'Rice',
      category: 'Grain',
      imageUrl: '../../../assets/image15.jpg',
    },
    {
      name: 'Pasta',
      category: 'Grain',
      imageUrl: '../../../assets/image16.jpg',
    },
    {
      name: 'Bread',
      category: 'Grain',
      imageUrl: '../../../assets/image17.jpg',
    },
    {
      name: 'Quinoa',
      category: 'Grain',
      imageUrl: '../../../assets/image18.jpg',
    },
    {
      name: 'Oats',
      category: 'Grain',
      imageUrl: '../../../assets/image19.jpg',
    },
    {
      name: 'Apple',
      category: 'Fruit',
      imageUrl: '../../../assets/image20.jpg',
    },
    {
      name: 'Banana',
      category: 'Fruit',
      imageUrl: '../../../assets/image21.jpg',
    },
    {
      name: 'Orange',
      category: 'Fruit',
      imageUrl: '../../../assets/image22.jpg',
    },
    {
      name: 'Strawberry',
      category: 'Fruit',
      imageUrl: '../../../assets/image23.jpg',
    },
    {
      name: 'Blueberry',
      category: 'Fruit',
      imageUrl: '../../../assets/image24.jpg',
    },
    {
      name: 'Onion',
      category: 'Vegetable',
      imageUrl: '../../../assets/image25.jpg',
    },
    {
      name: 'Garlic',
      category: 'Vegetable',
      imageUrl: '../../../assets/image26.jpg',
    },
    {
      name: 'Bell Pepper',
      category: 'Vegetable',
      imageUrl: '../../../assets/image27.jpg',
    },
    {
      name: 'Cucumber',
      category: 'Vegetable',
      imageUrl: '../../../assets/image28.jpg',
    },
    {
      name: 'Zucchini',
      category: 'Vegetable',
      imageUrl: '../../../assets/image29.jpg',
    },
    {
      name: 'Mushroom',
      category: 'Vegetable',
      imageUrl: '../../../assets/image30.jpg',
    }



    
  ];
  selectedIngredients: string[] = [];
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;

  dishTypes = ['Main Course', 'Dessert', 'Appetizer'];
  recipeTypes = ['Italian', 'Mexican', 'Indian', 'Chinese'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.recipeForm = this.fb.group({
      dishType: ['Main Course'],
      recipeType: ['Italian'],
    });
  }

  ngOnInit(): void {}

  onIngredientChange(ingredientName: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const isChecked = target.checked;
      if (isChecked) {
        this.selectedIngredients.push(ingredientName);
      } else {
        this.selectedIngredients = this.selectedIngredients.filter(
          (name) => name !== ingredientName
        );
      }
    }
  }
  

  generateRecipes(): void {
    const dishType = this.recipeForm.value.dishType;
    const recipeType = this.recipeForm.value.recipeType;

    this.http
      .post<Recipe[]>('https://spring-backend-production-bbb4.up.railway.app/api/recipes', {
        dishType,
        recipeType,
        ingredients: this.selectedIngredients,
      })
      .subscribe(
        (data) => {
          this.recipes = data;
        },
        (error) => {
          console.error('Error fetching recipes:', error);
        }
      );
  }

  toggleRecipeDetails(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  closeRecipeDetails(): void {
    this.selectedRecipe = null;
  }
}