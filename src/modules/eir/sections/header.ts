import {
  BorderStyle,
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
                width: { size: 20, type: "pct" },
                verticalAlign: "center",
                children: [
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: readFileSync(
                          "C:/Users/kalit/Documents/projects/word-api/src/assets/logo-header.png"
                        ),
                        transformation: { height: 80, width: 210 },
                      }),
                    ],
                  }),
                ],
                borders: {
                  bottom: {
                    style: "thickThinLargeGap",
                    color: "auto",
                    size: 3,
                  },
                  top: {
                    style: "none",
                    size: 0,
                    color: "FFFFFF",
                  },
                  left: {
                    style: "none",
                    size: 0,
                    color: "FFFFFF",
                  },
                  right: {
                    style: "none",
                    size: 0,
                    color: "FFFFFF",
                  },
                },
              }),
              new TableCell({
                width: { size: 60, type: "pct" },
                verticalAlign: "center",
                children: [
                  new Paragraph({
                    alignment: "center",
                    children: [
                      new TextRun({
                        text: "EVALUACIÓN INICIAL DE RIESGOS DE LA EMPRESA\nTROPIGAS DE NICARAGUA S.A., PLANTEL LEÓN",
                      }),
                    ],
                  }),
                ],
                borders: {
                  bottom: {
                    style: "thickThinLargeGap",
                    color: "auto",
                    size: 3,
                  },
                  top: {
                    style: "none",
                    size: 0,
                    color: "FFFFFF",
                  },
                  left: {
                    style: "none",
                    size: 0,
                    color: "FFFFFF",
                  },
                  right: {
                    style: "none",
                    size: 0,
                    color: "FFFFFF",
                  },
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
