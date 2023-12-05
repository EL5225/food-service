const { z } = require("zod");

const VSRegister = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

module.exports = {
  VSRegister,
};
