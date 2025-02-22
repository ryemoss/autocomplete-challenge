export interface Identifier {
  code: string;
  type: "variable" | "function" | "constant" | "customVariable";
}

export interface EquationEnvironment {
  variables: Identifier[];
  functions: Identifier[];
  constants: Identifier[];
  custom: Identifier[];
}