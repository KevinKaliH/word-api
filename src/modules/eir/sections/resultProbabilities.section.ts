import {
  HeadingLevel,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
} from "docx";
import { getValue } from "../../../utils/json.util";

export function resultProbabilities(dataObject: any) {
  const dataProbabilities = getValue(
    "FilaProbabilidad",
    dataObject
  ) as Array<any> | null;

  if (!dataProbabilities) return [];

  return [
    new Paragraph({
      text: "Interpretación de los resultados",
      pageBreakBefore: true,
      heading: HeadingLevel.HEADING_2,
    }),
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("RIESGOS")],
              verticalAlign: "center",
              rowSpan: 2,
              shading: shadingA,
            }),
            new TableCell({
              children: [new Paragraph("PROBABILIDAD DE RIESGO")],
              columnSpan: 3,
              verticalAlign: "bottom",
              shading: shadingA,
            }),
          ],
        }),
        new TableRow({
          children: TitleProbabilities.map(
            (i, index) =>
              new TableCell({
                children: [new Paragraph(i.a)],
                shading: {
                  color: "auto",
                  fill: i.c,
                  type: ShadingType.SOLID,
                },
              })
          ),
        }),
        ...dataProbabilities?.map((i, index) => {
          const shading = {
            color: "auto",
            type: ShadingType.SOLID,
          };
          return new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(i.Riesgo)] }),
              new TableCell({
                children: [new Paragraph(i.ProbabilidadBaja)],
                shading: { ...shading, fill: TitleProbabilities[0].c },
              }),
              new TableCell({
                children: [new Paragraph(i.ProbabilidadMedia)],
                shading: { ...shading, fill: TitleProbabilities[1].c },
              }),
              new TableCell({
                children: [new Paragraph(i.ProbabilidadAlta)],
                shading: { ...shading, fill: TitleProbabilities[2].c },
              }),
            ],
          });
        }),
      ],
    }),
  ];
}

const TitleProbabilities = [
  { a: "BAJO", c: "33b52a" },
  { a: "MEDIO", c: "c91221" },
  { a: "ALTO", c: "db9d30" },
];

const shadingA = {
  color: "auto",
  fill: "b5b2ac",
  type: ShadingType.SOLID,
};
