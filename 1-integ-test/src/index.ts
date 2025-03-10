import express, { type Request, type Response } from "express";
import prismaClient from "./db";
export const app = express();
app.use(express.json());

app.post("/sum", async (req: Request, res: Response) => {
  const { a, b } = req.body;
  if (a > 100000 || b > 100000) {
    res.status(400).json({ message: "Sorry we dont support big numbers" });
    return;
  }
  const result = a + b;

  const response = await prismaClient.request.create({
    data: {
      a,
      b,
      answer: result,
      type: "ADD",
    },
  });

  res.json({ answer: result, id: response.id }).status(200);
  return;
});

app.post("/multiply", async (req: Request, res: Response) => {
  const { a, b } = req.body;
  if (a > 1000000 || b > 1000000) {
    res.status(400).json({ message: "Sorry we dont support big numbers" });
    return;
  }
  const result = a * b;
  const response = await prismaClient.request.create({
    data: {
      a,
      b,
      answer: result,
      type: "MUL",
    },
  });
  res.json({ answer: result, id: response.id }).status(200);
  return;
});
