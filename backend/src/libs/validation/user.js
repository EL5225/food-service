const { z } = require("zod");

const UpdateProfileSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

module.exports = {
  UpdateProfileSchema
}