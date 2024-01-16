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
  Object_Keys_Table,
  SecondRowPartOne,
  SecondRowPartTwo,
  TableRowOne,
} from "../utils/area-risk.utils";
import { header } from "./header";
import { footer } from "./footer";

export function areaRiskProbabilitySection(dataObject: any): ISectionOptions[] {
  const data = getValue("REPETICION_POR_AREA", dataObject) as Array<any> | null;
  if (!data) return [];

  const templateObjects: ISectionOptions[] = [];

  data.forEach((item) => {
    templateObjects.push(generateHeader(item, dataObject));
  });

  return templateObjects;
}

function generateHeader(data: any, allDataObject: any): ISectionOptions {
  return {
    headers: {
      default: header(),
    },
    footers: {
      default: footer(allDataObject),
    },
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
      new Paragraph({
        children: [new TextRun({ text: "\n", bold: true, break: 1 })],
        alignment: "center",
      }),
      headerDetail(data),
      new Paragraph({
        children: [new TextRun({ text: "\n", bold: true, break: 1 })],
        alignment: "center",
      }),
      tableContent(data),
    ],
  };
}

function tableContent(data: any) {
  const tableValues = data["FILA_RIESGO_AREA"] as Array<any>;

  return new Table({
    rows: [
      new TableRow({
        children: TableRowOne,
      }),
      new TableRow({
        children: [...SecondRowPartOne, ...SecondRowPartTwo],
      }),
      ...tableValues.map(
        (item) =>
          new TableRow({
            children: Object_Keys_Table.map((key) => {
              let value = item[key];
              if (key == "PORCENTAJE" && value)
                value = (Number(value) * 100).toString();

              return new TableCell({ children: [new Paragraph(value ?? "")] });
            }),
          })
      ),
    ],
  });
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
                style: BorderStyle.DASH_DOT_STROKED,
                space: 5,
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
