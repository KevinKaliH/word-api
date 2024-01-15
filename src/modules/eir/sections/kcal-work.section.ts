//page number 12

import {
  AlignmentType,
  PageBreak,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
} from "docx";
import { getValue } from "../../../utils/json.util";
import { Content_Keys, Header_Titles } from "../utils/kCal.utils";

export function determinateAreasKCalSection(dataObject: any) {
  const fila_kCal = getValue("Fila_kcal", dataObject) as Array<any> | null;
  if (!fila_kCal) return [];

  const titleSection = new Paragraph({
    children: [
      new PageBreak(),
      new TextRun({
        text: "DETERMINACIÓN DE AREAS Y PUESTOS DE TRABAJO Y CARGA METABOLICA\n\n",
        bold: true,
        break: 1,
      }),
      new PageBreak(),
    ],
    alignment: AlignmentType.CENTER,
  });

  const headerCell: TableCell[] = [];
  Header_Titles.forEach((header, index) => {
    let widthItem = 0;
    let typeWidth: "auto" | "nil" | "dxa" | "pct" | undefined = "auto";

    if (index < 2) {
      widthItem = 100;
      typeWidth = "auto";
    } else if (index > 1 && index < 10) {
      widthItem = 5;
      typeWidth = "pct";
    } else {
      widthItem = 100;
    }

    headerCell.push(
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: header, size: 12, bold: true })],
            alignment: "center",
          }),
        ],

        shading: ![0, 1].includes(index)
          ? {
              fill: "7791ba",
              type: ShadingType.SOLID,
              color: "auto",
            }
          : undefined,
        width: {
          size: widthItem,
          type: typeWidth,
        },
        verticalAlign: VerticalAlign.CENTER,
      })
    );
  });

  const contentTable: TableRow[] = [];

  fila_kCal.forEach((item) => {
    //cells
    const cellItem: TableCell[] = [];

    for (let i = 0; i < Header_Titles.length; i++) {
      const valueText = item[Content_Keys[i]];

      let widthItem = 0;
      let typeWidth: "auto" | "nil" | "dxa" | "pct" | undefined = "auto";

      if (i < 2) {
        widthItem = 100;
        typeWidth = "auto";
      } else if (i > 1 && i < 10) {
        widthItem = 5;
        typeWidth = "pct";
      } else {
        widthItem = 100;
      }

      cellItem.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: valueText?.toString() ?? "", size: 12 }),
              ],
              alignment: "center",
            }),
          ],
          width: {
            size: widthItem,
            type: typeWidth,
          },
          verticalAlign: VerticalAlign.CENTER,
        })
      );
    }

    // rows
    contentTable.push(
      new TableRow({
        children: cellItem,
      })
    );
  });

  const tableSection = new Table({
    rows: [
      new TableRow({
        children: headerCell,
      }),
      ...contentTable,
    ],
  });

  return [titleSection, tableSection];
}
