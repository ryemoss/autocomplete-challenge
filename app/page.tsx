"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useEffect, useState } from "react";
import { Equation } from "@/lib/types/equation";
import Header from "@/components/web/header";
import SidebarPanel from "@/components/web/sidebar-panel";
import EditorPanel from "@/components/web/editor-panel";
import { generateUUID } from "@/lib/utils";
import { EquationEnvironment } from "@/lib/types/identifiers";

// Feel free to change these! They're just for testing, and meant to mimic
// the IDE environment in which a user would be writing equations.
const initialIdentifiers = {
  variables: [
    "x",
    "y",
    "Foo",
    "Bar",
    "Baz",
    "UpperCamelCaseVariable",
    "lowerCamelCaseVariable",
    "snake_case_variable",
    "Inlet.mixture.T",
    "Inlet.mixture.P",
    "Inlet.mixture.rho_mass",
    "Inlet.mixture.h_mass",
    "Inlet.rate.m",
    "Inlet.rate.v",
    "Outlet.mixture.T",
    "Outlet.mixture.P",
    "Outlet.mixture.rho_mass",
    "Outlet.mixture.h_mass",
    "Outlet.rate.m",
    "Outlet.rate.v",
  ],
  functions: [
    "SQRT",
    "LOG",
    "EXP",
    "SIN",
    "COS",
    "TAN",
    "ROUND",
    "CEIL",
    "FLOOR",
    "ABS",
    "SIGN",
    "POW",
    "MOD",
  ],
  constants: [
    "pi",
    "e",
    "c",
    "MagicConstant",
    "T_STP",
    "P_STP",
  ],
}

const initialEnvironment: EquationEnvironment = {
  variables: initialIdentifiers.variables.map(v => ({ code: v, type: "variable" })),
  functions: initialIdentifiers.functions.map(f => ({ code: f, type: "function" })),
  constants: initialIdentifiers.constants.map(c => ({ code: c, type: "constant" })),
}

// Defines the width of each panel in %
const editorPanelWidth = 70;
const sidebarPanelWidth = 100 - editorPanelWidth;

export default function Home() {
  const [equations, setEquations] = useState<Equation[]>([]);
  const [environment, setEnvironment] = useState<EquationEnvironment>(initialEnvironment);

  const addEquation = () => {
    setEquations([...equations, { id: generateUUID(), lhs: "", rhs: "" }]);
  }

  // Ensure that at least one equation is present when the page loads.
  useEffect(() => {
    if (equations.length === 0) {
      addEquation();
    }
  }, [equations, addEquation]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col h-screen">
        <Header />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={editorPanelWidth}>
            <EditorPanel equations={equations} addEquation={addEquation} environment={environment} />
          </ResizablePanel> 
          <ResizableHandle withHandle/>
          <ResizablePanel defaultSize={sidebarPanelWidth}>
            <SidebarPanel environment={environment} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
