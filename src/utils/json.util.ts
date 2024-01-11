const getValue = (propertyName: string, object: any): any | null =>
  propertyName in object && object[propertyName];

export { getValue };
