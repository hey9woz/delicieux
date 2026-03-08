import { Ingredient, Recipe, Step } from "@/types/interface";
import { logger } from "@/utils/logger";

const STUB_USER_ID = "stbUserId";

export function getStubUserRecipes(userId: string): Recipe[] {
  return [
    {
      id: "1",
      name: "Leek Tart",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A perfect warm starter for winter",
      steps: [
        {
          id: 1,
          text: "Prepare the pastry dough and place it in a mold.",
          image: null,
        },
        {
          id: 2,
          text: "Slice the leeks and sauté in a pan.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour the leeks onto the pastry and add the quiche mixture.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 4,
          text: "Bake in a preheated oven at 350°F (180°C) for 25 minutes.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Pastry dough", quantity: "1" },
        { id: 2, text: "Leeks", quantity: "3" },
        { id: 3, text: "Heavy cream", quantity: "100 ml" },
        { id: 4, text: "Eggs", quantity: "2" },
        { id: 5, text: "Salt and pepper", quantity: "to taste" },
      ],
      userId: userId,
    },
    {
      id: "2",
      name: "Ratatouille",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A classic Provençal dish, ideal as a side for any meal",
      steps: [
        { id: 1, text: "Dice the vegetables.", image: null },
        {
          id: 2,
          text: "Sauté each vegetable separately.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Mix all the vegetables and simmer with herbs de Provence.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Eggplants", quantity: "2" },
        { id: 2, text: "Zucchinis", quantity: "2" },
        { id: 3, text: "Red bell peppers", quantity: "1" },
        { id: 4, text: "Tomatoes", quantity: "3" },
        { id: 5, text: "Onions", quantity: "1" },
        { id: 6, text: "Herbs de Provence", quantity: "1 tbsp" },
      ],
      userId: userId,
    },
    {
      id: "3",
      name: "Bouillabaisse",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Traditional fish soup from Marseille",
      steps: [
        { id: 1, text: "Prepare the fish and seafood.", image: null },
        {
          id: 2,
          text: "Make a fish stock with fish heads.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Add the fish and vegetables to the stock and simmer gently.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Mixed fish", quantity: "2.2 lbs (1 kg)" },
        { id: 2, text: "Seafood", quantity: "1.1 lbs (500 g)" },
        { id: 3, text: "Potatoes", quantity: "3" },
        { id: 4, text: "Tomatoes", quantity: "2" },
        { id: 5, text: "Onions", quantity: "1" },
        { id: 6, text: "Saffron", quantity: "a pinch" },
      ],
      userId: userId,
    },
    {
      id: "4",
      name: "Coq au Vin",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Chicken braised with wine, mushrooms and bacon",
      steps: [
        { id: 1, text: "Brown the chicken pieces.", image: null },
        {
          id: 2,
          text: "Add bacon, mushrooms, and onions and cook.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour in red wine and simmer until tender.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Chicken", quantity: "1" },
        { id: 2, text: "Red wine", quantity: "750 ml" },
        { id: 3, text: "Bacon", quantity: "150 g" },
        { id: 4, text: "Mushrooms", quantity: "200 g" },
        { id: 5, text: "Onions", quantity: "12" },
      ],
      userId: userId,
    },
    {
      id: "5",
      name: "French Onion Soup",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Slow-cooked onions topped with cheese and toasted bread",
      steps: [
        { id: 1, text: "Slice onions thinly and cook slowly.", image: null },
        {
          id: 2,
          text: "Add stock and simmer.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Top with bread and cheese and broil.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Onions", quantity: "6" },
        { id: 2, text: "Beef stock", quantity: "1.5 L" },
        { id: 3, text: "Butter", quantity: "3 tbsp" },
        { id: 4, text: "Gruyère", quantity: "200 g" },
        { id: 5, text: "Baguette", quantity: "1" },
      ],
      userId: userId,
    },
    {
      id: "6",
      name: "Crêpes",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Thin pancakes perfect for sweet or savory fillings",
      steps: [
        { id: 1, text: "Mix flour, eggs, and milk.", image: null },
        {
          id: 2,
          text: "Cook in a hot pan until golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Flour", quantity: "250 g" },
        { id: 2, text: "Eggs", quantity: "3" },
        { id: 3, text: "Milk", quantity: "500 ml" },
        { id: 4, text: "Butter", quantity: "50 g" },
        { id: 5, text: "Salt", quantity: "a pinch" },
      ],
      userId: userId,
    },
    {
      id: "7",
      name: "Quiche Lorraine",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Classic quiche with bacon and cheese",
      steps: [
        { id: 1, text: "Prepare the crust.", image: null },
        {
          id: 2,
          text: "Mix eggs and cream, add bacon and cheese.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until set.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Pie crust", quantity: "1" },
        { id: 2, text: "Bacon", quantity: "200 g" },
        { id: 3, text: "Eggs", quantity: "3" },
        { id: 4, text: "Cream", quantity: "200 ml" },
        { id: 5, text: "Cheese", quantity: "150 g" },
      ],
      userId: userId,
    },
    {
      id: "8",
      name: "Tarte Tatin",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Caramelized upside-down apple tart",
      steps: [
        { id: 1, text: "Caramelize sugar and butter in a pan.", image: null },
        {
          id: 2,
          text: "Arrange apples and cover with pastry.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake and invert to serve.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Apples", quantity: "6" },
        { id: 2, text: "Sugar", quantity: "150 g" },
        { id: 3, text: "Butter", quantity: "100 g" },
        { id: 4, text: "Puff pastry", quantity: "1" },
      ],
      userId: userId,
    },
    {
      id: "9",
      name: "Cassoulet",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Slow-cooked stew with beans and meat",
      steps: [
        { id: 1, text: "Soak beans overnight.", image: null },
        {
          id: 2,
          text: "Cook meats and beans together slowly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until a crust forms on top.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "White beans", quantity: "500 g" },
        { id: 2, text: "Pork sausage", quantity: "4" },
        { id: 3, text: "Duck confit", quantity: "2 legs" },
        { id: 4, text: "Pork belly", quantity: "200 g" },
      ],
      userId: userId,
    },
    {
      id: "10",
      name: "Boeuf Bourguignon",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Beef stew braised in red wine",
      steps: [
        { id: 1, text: "Brown beef cubes.", image: null },
        {
          id: 2,
          text: "Add wine and simmer slowly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Add mushrooms and onions and cook until tender.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Beef", quantity: "1 kg" },
        { id: 2, text: "Red wine", quantity: "750 ml" },
        { id: 3, text: "Carrots", quantity: "3" },
        { id: 4, text: "Onions", quantity: "2" },
        { id: 5, text: "Mushrooms", quantity: "200 g" },
      ],
      userId: userId,
    },
    {
      id: "11",
      name: "Croque Monsieur",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Ham and cheese sandwich with béchamel sauce",
      steps: [
        { id: 1, text: "Make béchamel sauce.", image: null },
        {
          id: 2,
          text: "Assemble ham and cheese sandwiches.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Top with béchamel and bake until golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Bread", quantity: "8 slices" },
        { id: 2, text: "Ham", quantity: "4 slices" },
        { id: 3, text: "Cheese", quantity: "200 g" },
        { id: 4, text: "Butter", quantity: "50 g" },
      ],
      userId: userId,
    },
    {
      id: "12",
      name: "Chocolate Mousse",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Light and airy chocolate dessert",
      steps: [
        { id: 1, text: "Melt chocolate and cool slightly.", image: null },
        {
          id: 2,
          text: "Whip cream and fold into chocolate.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Chill before serving.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Dark chocolate", quantity: "200 g" },
        { id: 2, text: "Eggs", quantity: "3" },
        { id: 3, text: "Sugar", quantity: "50 g" },
        { id: 4, text: "Cream", quantity: "200 ml" },
      ],
      userId: userId,
    },
    {
      id: "13",
      name: "Nicoise Salad",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Fresh salad with tuna, eggs and vegetables",
      steps: [
        { id: 1, text: "Prepare vegetables and boil eggs.", image: null },
        {
          id: 2,
          text: "Arrange everything with tuna and dressing.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Tuna", quantity: "1 can" },
        { id: 2, text: "Eggs", quantity: "2" },
        { id: 3, text: "Tomatoes", quantity: "2" },
        { id: 4, text: "Green beans", quantity: "200 g" },
      ],
      userId: userId,
    },
    {
      id: "14",
      name: "Madeleines",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Small sponge cakes with a buttery flavor",
      steps: [
        { id: 1, text: "Mix batter and chill.", image: null },
        {
          id: 2,
          text: "Bake in molds until puffed.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Flour", quantity: "200 g" },
        { id: 2, text: "Butter", quantity: "150 g" },
        { id: 3, text: "Eggs", quantity: "3" },
        { id: 4, text: "Sugar", quantity: "150 g" },
      ],
      userId: userId,
    },
    {
      id: "15",
      name: "Gratin Dauphinois",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Sliced potatoes baked in cream and garlic for a golden crust",
      steps: [
        {
          id: 1,
          text: "Slice potatoes thinly and layer in a buttered dish.",
          image: null,
        },
        {
          id: 2,
          text: "Mix cream, garlic, and nutmeg and pour over the potatoes.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until the potatoes are tender and the top is golden and bubbly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Potatoes", quantity: "2 lbs" },
        { id: 2, text: "Heavy cream", quantity: "2 cups" },
        { id: 3, text: "Garlic", quantity: "2 cloves" },
        { id: 4, text: "Nutmeg", quantity: "a pinch" },
        { id: 5, text: "Butter", quantity: "to grease" },
      ],
      userId: userId,
    },
  ];
}

/**
 * レシピデータの登録スタブ
 * @param userId ユーザーID
 * @param name レシピ名
 * @param ingredients 材料リスト
 * @param steps 手順リスト
 * @param memo メモ
 * @param image 画像URL
 * @returns 登録したレシピのIDを返します
 */
export async function saveStubRecipe(
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string,
  image: string | null
): Promise<string> {
  logger.info("レシピを保存しました:", name);
  // ランダムなIDを返しておく
  return `recipe_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * 指定されたレシピの削除スタブ
 * @param {string} recipeId 削除するレシピのドキュメントID
 */
export async function deleteStubRecipe(recipeId: string): Promise<void> {
  logger.info("レシピを削除しました:", recipeId);
}

function toRecipeMap(recipes: Recipe[]): Record<string, Recipe> {
  return recipes.reduce<Record<string, Recipe>>((acc, recipe) => {
    acc[recipe.id] = recipe;
    return acc;
  }, {});
}

const STUB_RECIPES_BY_ID = toRecipeMap(getStubUserRecipes(STUB_USER_ID));

function cloneRecipe(recipe: Recipe): Recipe {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((i) => ({ ...i })),
    steps: recipe.steps.map((s) => ({ ...s })),
  };
}

export function getStubRecipeById(recipeId: string): Recipe | null {
  const recipe = STUB_RECIPES_BY_ID[recipeId];
  return recipe ? cloneRecipe(recipe) : null;
}

export function fetchStubUserRecipes(userId: string): Promise<Recipe[]> {
  const stubRecipes = getStubUserRecipes(userId);
  return new Promise<Recipe[]>((resolve) => {
    setTimeout(() => {
      if (__DEV__) {
        logger.info("スタブデータのレシピが見つかりました");
      }
      resolve(stubRecipes);
    }, 500); // 0.5秒後にレスポンスを模擬
  });
}

export function fetchStubRecipeByRecipeId(recipeId: string): Promise<Recipe | null> {
  const recipeData = getStubRecipeById(recipeId);
  return new Promise<Recipe | null>((resolve) => {
    setTimeout(() => {
      if (recipeData) {
        logger.info("レシピが見つかりました: ", recipeData.name);
        resolve(recipeData);
      } else {
        logger.info("レシピが見つかりませんでした");
        resolve(null);
      }
    }, 1000); // 1秒後にレスポンスを模擬
  });
}
