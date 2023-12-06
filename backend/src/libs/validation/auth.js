const { z } = require("zod");

const VSRegister = z.object({
  name: z.string({
    required_error: "name is required"
  }),
  email: z.string({
    required_error: "email is required"
  }).email("Email is invalid"),
  password: z
    .string({
      required_error: "password is required"
    })
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

const VSLogin = z.object({
  email: z.string({
    required_error: "email is required"
  }).email("Email is invalid"),
  password: z
    .string({
      required_error: "password is required"
    })
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
})

module.exports = {
  VSRegister,
  VSLogin
};
