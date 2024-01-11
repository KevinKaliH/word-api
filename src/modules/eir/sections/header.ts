import {
  Header,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { readFileSync } from "fs";

export function header() {
  return new Header({
    children: [
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: readFileSync(
                          "C:/Users/kalit/Documents/projects/word-api/src/assets/logo-header.png"
                        ),
                        // data: readFileSync("../../../assets/logo-header.png"),
                        transformation: { height: 200, width: 200 },
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "EVALUACIÓN INICIAL DE RIESGOS DE LA EMPRESA",
                      }),
                      new TextRun({
                        text: "TROPIGAS DE NICARAGUA S.A., PLANTEL LEÓN",
                        break: 1,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
