// https://github.com/vojtechhabarta/typescript-generator/wiki/Type-Mapping
const typeMapping: Record<string, string> = {
  byte: 'number',
  Byte: 'number',
  short: 'number',
  Short: 'number',
  int: 'number',
  Integer: 'number',
  long: 'number',
  Long: 'number',
  float: 'number',
  Float: 'number',
  double: 'number',
  Double: 'number',
  boolean: 'boolean',
  Boolean: 'boolean',
  bool: 'boolean',
  char: 'string',
  Character: 'string',
  String: 'string',
  BigDecimal: 'number',
  BigInteger: 'number',
  Date: 'string',
  UUID: 'string',
  Enum: 'Enum',
  List: 'Array',
  Collection: 'Array',
  Map: 'Record',
  Object: 'any',
};

export const convertTypes = (type: string = ''): string => {
  // 泛型类型递归解析，如: List<List<String>> -> Array<Array<string>>
  if (/^([\w\d_]+)<(.+)>$/g.test(type)) {
    return type.replace(/^([\w\d_]+)<(.+)>$/g, (match, g1, g2) => {
      const key = g1?.trim();
      const temp = typeMapping[key] || key;

      return `${temp}<${convertTypes(g2)}>`;
    });
  } else if (/([\w\d_]+),\s*(.+\s*)/g.test(type)) {
    // 'Map<String, List<String>>' -> 'Record<string, <Array<string>>>'
    // 'Map<String, Map<String, List<String>>>' -> 'Record<string, Record<string, Array<string>>>'
    return type.replace(/([\w\d_]+),\s*(.+\s*)/g, (match, g1, g2) => {
      const key = g1?.trim();
      const temp = typeMapping[key] || key;

      return `${temp}, ${convertTypes(g2)}`;
    });
  } else {
    // 不是泛型直接解析，如: String -> string
    return typeMapping[type?.trim()] || type?.trim();
  }
};

/**
 * 将 Java DTO 转换成 TypeScript Interface
*/
export const javaDtoToTypeScriptInterface = (javaText?: string) => {
  return javaText?.replace(/(public)\s+(class)/g, (match, classModifier, classDeclaration) => {
    return 'export interface';
  }).replace(/(public|private)\s+([\w\s\[\]<>,]+)\s+(.+);/g, (match, modifier, type, variable) => {
    const tsType = convertTypes(type);
    return `${variable}?: ${tsType};`;
  });
};
