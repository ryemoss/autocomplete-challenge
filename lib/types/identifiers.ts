export interface Identifier {
  code: string;
  type: "variable" | "function" | "constant";
}

export interface EquationEnvironment {
  variables: Identifier[];
  functions: Identifier[];
  constants: Identifier[];
}