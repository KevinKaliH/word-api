import express, { Request, Response } from "express";
import { x } from "./utils/temp";
import EirDocx from "./modules/eir";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.get("/eir", async (req: Request, res: Response) => {
  const docx = new EirDocx();
  docx.setData(x[0]);
  const response = await docx.generate();

  res.setHeader("Content-Disposition", "attachment; filename=testing.docx");
  res.send(Buffer.from(response, "base64"));
});

app.listen(port, () => {
  console.log("running server on port " + port);
});
