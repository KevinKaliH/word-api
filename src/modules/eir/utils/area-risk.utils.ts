import { Paragraph, ShadingType, TableCell, TextRun } from "docx";

export const Header_Title_Evaluation = [
  ["EMPRESA", "FECHA DE EVALUACIÓN"],
  ["DIRECCIÓN", "EVALUACIÓN REALIZADA POR"],
  ["DEPARTAMENTO/LOCALIDAD", "AREA SUJETA A EVALUACIÓN"],
  ["EVALUACIÓN COORDINADA POR", "PUESTOS DE TRABAJO A EVALUAR"],
];

export const Header_Keys_Evaluation = [
  ["EMPRESA", "FECHA"],
  ["DIRECCION", "ELABORADOR"],
  ["DEPARTAMENTO", "AREAEVALUADA"],
  ["COORDINADOR", "PUESTOS"],
];

export const TableRowOne: TableCell[] = [
  new TableCell({
    children: [new Paragraph("PARÁMETROS DE EVALUACIÓN")],
    columnSpan: 4,
  }),
  new TableCell({
    children: [
      new Paragraph("ESTIMACIÓN DE PROBABILIDAD DE RIESGO (VER TABLA 1 Y 2)"),
    ],
    columnSpan: 12,
  }),
  new TableCell({
    children: [new Paragraph("SEVERIDAD (VER TABLA 3)")],
    columnSpan: 3,
  }),
  new TableCell({
    children: [new Paragraph("RIESGO ESTIMADO (VER TABLA 4 Y 5)")],
    columnSpan: 5,
  }),
];

export const SecondRowPartOne: TableCell[] = [
  "PELIGROS",
  "FACTORES DE RIESGO",
  "RIESGOS",
  "PARÁMETROS OPERACIONALES",
].map(
  (i) =>
    new TableCell({
      children: [new Paragraph(i)],
    })
);

export const SecondRowPartTwo: TableCell[] = [
  ...["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
    (i) => new TableCell({ children: [new Paragraph(i)] })
  ),
  ...generateCells(),
];

function generateCells() {
  const cellTitles = [
    "Total (%)",
    "NIVEL DE PROBABILIDAD",
    "BAJA",
    "MEDIA",
    "ALTA",
    "TRIVIAL",
    "TOLERABLE",
    "MODERADO",
    "IMPORTANTE",
    "SEVERO",
  ];

  return cellTitles.map((val, i) => {
    let shadingColor = undefined;
    if (i < 2) shadingColor = "8696b0";
    else if (i > 1 && i < 5) shadingColor = "4287f5";
    else if (i > 4 && i < 7) shadingColor = "bf3255";
    else shadingColor = "40cf23";

    return new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: val })],
          alignment: "right",
        }),
      ],
      verticalAlign: "center",
      textDirection: "lrTb",
      shading: {
        fill: shadingColor,
        type: ShadingType.SOLID,
        color: "auto",
      },
    });
  });
}

export const Object_Keys_Table = [
  "PELIGRO",
  "FACTOR",
  "RIESGO",
  "PARAMETRO",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "PORCENTAJE",
  "PROBABILIDAD",
  "BAJA",
  "MEDIA",
  "ALTA",
  "TRIVIAL",
  "TOLERABLE",
  "MODERADO",
  "IMPORTANTE",
  "SEVERO",
];
