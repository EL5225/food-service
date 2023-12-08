const { z } = require("zod");


const VSResep = z.object({
    name: z.string({
      required_error: "Name is required"
    }),
    description: z.string({
      required_error: "Description is required"
    }),
    history: z.string({
      required_error: "History is required"
    }),
    culture: z.string({
      required_error: "Culture is required"
    }),
    ingredients: z.string({
      required_error: "Ingredients is required"
    }),
    alternatifIngredient: z.string().optional()
  });

  const VSUpdateResep = z.object({
    name: z.string({
      required_error: "Name is required"
    }).optional(),
    description: z.string({
      required_error: "Description is required"
    }).optional(),
    history: z.string({
      required_error: "History is required"
    }).optional(),
    culture: z.string({
      required_error: "Culture is required"
    }).optional(),
    ingredients: z.string({
      required_error: "Ingredients is required"
    }).optional(),
    alternatifIngredient: z.string().optional()
  });

module.exports = {
    VSResep,
    VSUpdateResep
}