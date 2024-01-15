import {
  Footer,
  ImageRun,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { readFileSync } from "fs";
import { getValue } from "../../../utils/json.util";

export function footer(dataObject: any) {
  const creator = getValue("Elaborador", dataObject);

  return new Footer({
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
                    alignment: "left",
                    children: [
                      new TextRun(`Informe Técnico Elaborado por:`),
                      new TextRun({ text: creator, break: 1 }),
                    ],
                  }),
                ],
                borders: {
                  top: {
                    style: "thickThinLargeGap",
                    color: "auto",
                    size: 3,
                  },
                  bottom: {
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
                width: { size: 20, type: "pct" },
                children: [
                  new Paragraph({
                    alignment: "right",
                    children: [
                      new TextRun({
                        children: ["Página ", PageNumber.CURRENT],
                      }),
                    ],
                  }),
                ],
                borders: {
                  top: {
                    style: "thickThinLargeGap",
                    color: "auto",
                    size: 3,
                  },
                  bottom: {
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
