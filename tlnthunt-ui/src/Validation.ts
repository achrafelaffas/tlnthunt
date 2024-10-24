import z from "zod";

const createNumberSchema = (
  {
    minValue,
    maxValue,
  }: {
    minValue?: number;
    maxValue?: number;
  },
  customMessages?: {
    invalidType?: string;
    invalidNumber?: string;
    min?: string;
    max?: string;
  }
) => {
  return z
    .union([
      z.number().refine((value) => !isNaN(value), {
        message:
          customMessages?.invalidNumber || "Input must be a valid number",
      }),
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message:
            customMessages?.invalidNumber || "Input must be a valid number",
        })
        .transform((value) => Number(value)),
    ])
    .refine((value) => typeof value === "number", {
      message: customMessages?.invalidType || "Input must be a number",
    })
    .refine((value) => (minValue !== undefined ? value >= minValue : true), {
      message:
        customMessages?.min ||
        `Number must be greater than or equal to ${minValue}`,
    })
    .refine((value) => (maxValue !== undefined ? value <= maxValue : true), {
      message:
        customMessages?.max ||
        `Number must be less than or equal to ${maxValue}`,
    });
};

const priceSchema = createNumberSchema(
  { minValue: 50, maxValue: 10000 },
  {
    invalidNumber: "Please enter a valid price",
    min: `Price must be greater than or equal to ${50.0}`,
    max: `Price must be less than or equal to ${10000.0}`,
  }
);

const categoryIdSchema = createNumberSchema(
  {},
  {
    invalidNumber: "Please select a category",
    invalidType: "Please select a category",
  }
);

export const projectRequestSchema = z.object({
  categoryId: categoryIdSchema,
  description: z.string().min(200, { message: "minimum 200 characters." }),
  title: z.string().min(20, { message: "minimum 20 characters." }),
  price: priceSchema,
  level: z.string(),
  period: z.string(),
});

export const proposalResquestSchema = z.object({
  coverLetter: z.string().min(1, { message: "minimum 200 characters." }),
  price: priceSchema,
  period: z.string(),
});
