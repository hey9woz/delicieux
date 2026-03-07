export const recipeCopy = {
  form: {
    namePlaceholder: "Enter recipe name",
    mainPhotoPlaceholder: "Main photo",
    ingredientPlaceholder: "Ingredient",
    quantityPlaceholder: "Quantity",
    notesPlaceholder: "Notes",
    stepPlaceholder: (index: number) => `Step ${index + 1}`,
    saveButton: {
      create: "Create recipe",
      saveChanges: "Save changes",
    },
  },
  imagePicker: {
    actionsheet: {
      change: "Change",
      remove: "Remove",
      chooseFromLibrary: "Choose from library",
      takePhoto: "Take photo",
      cancel: "Cancel",
    },
    permissionRequired: "Permission is required to access the camera or photo library.",
  },
  recipeDelete: {
    headerTitle: "Delete recipe",
    confirmMessage: "Are you sure you want to delete this recipe?",
    buttons: {
      cancel: "Cancel",
      delete: "Delete",
    },
    toast: {
      success: "Recipe deleted.",
      failure: "Failed to delete recipe.",
    },
  },
  recipeDetailHeader: {
    menu: {
      edit: "Edit recipe",
      delete: "Delete recipe",
    },
  },
} as const;
