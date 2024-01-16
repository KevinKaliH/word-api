import {
  BorderStyle,
  ISectionOptions,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { getValue } from "../../../utils/json.util";
import {
  Header_Keys_Evaluation,
  Header_Title_Evaluation,
} from "../utils/area-risk.utils";

export function areaRiskProbabilitySection(dataObject: any): ISectionOptions[] {
  const data = getValue("REPETICION_POR_AREA", dataObject) as Array<any> | null;
  if (!data) return [];

  const templateObjects: ISectionOptions[] = [];

  data.forEach((item) => {
    templateObjects.push(generateHeader(item));
  });

  return templateObjects;
}

function generateHeader(data: any): ISectionOptions {
  return {
    properties: {
      page: {
        size: {
          orientation: "landscape",
        },
      },
    },
    children: [
      new Paragraph({
        children: [new TextRun({ text: "EVALUACIÓN DE RIESGOS.", bold: true })],
        alignment: "center",
      }),
      headerDetail(data),
    ],
  };
}

function headerDetail(data: any) {
  const borders = {
    top: {
      style: BorderStyle.NIL,
    },
    bottom: {
      style: BorderStyle.NIL,
    },
    left: {
      style: BorderStyle.NIL,
    },
    right: {
      style: BorderStyle.NIL,
    },
  };

  return new Table({
    rows: Header_Title_Evaluation.map((headerValue, rowIndex) => {
      const cells: TableCell[] = [];

      for (let colIndex = 0; colIndex < 2; colIndex++) {
        const propertyValue = headerValue[colIndex];
        const keyData = Header_Keys_Evaluation[rowIndex][colIndex];

        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: propertyValue,
                    bold: true,
                  }),
                ],
                alignment: "end",
              }),
            ],
            width: {
              size: 20,
              type: "pct",
            },
            borders: {
              ...borders,
              right: {
                style: BorderStyle.NONE,
                size: 30,
                color: "FFFFFF",
              },
            },
          })
        );

        cells.push(
          new TableCell({
            children: [new Paragraph(data[keyData])],
            width: {
              size: 30,
              type: "pct",
            },
            borders,
          })
        );
      }

      return new TableRow({
        children: cells,
      });
    }),
    width: {
      size: 100,
      type: "pct",
    },
  });
}
