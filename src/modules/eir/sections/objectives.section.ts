import { HeadingLevel, Paragraph } from "docx";

export function objectivesSection() {
  return [
    new Paragraph({
      text: "Objetivos Generales",
      heading: HeadingLevel.HEADING_2,
      pageBreakBefore: true,
    }),
    new Paragraph(
      "Desarrollar estudio en materia de prevención de riesgos laborales de las instalaciones de la empresa Tropigas de Nicaragua S.A., Plantel León, que permitan la implementación de herramientas que mejoren el rendimiento de los trabajadores, de acuerdo a lo establecido en el artículo 18, numeral 4 y 5, artículo 114 de la Ley general de Higiene y Seguridad del Trabajo."
    ),
    new Paragraph({
      text: "Objetivos Específicos",
      heading: HeadingLevel.HEADING_2,
    }),
    ...specificObjectives.map(
      (i, index) =>
        new Paragraph({
          text: i,
          numbering: { level: 0, reference: "myObjectiveNumbers" },
        })
    ),
  ];
}

const specificObjectives = [
  "Lograr un diagnóstico real y actual de las condiciones de seguridad y salud ocupacional y mapa de riesgo del plantel.",
  "Obtener recomendaciones que permita corregir y reducirlos riesgos en materia de Higiene, seguridad y Salud Ocupacional.",
];
