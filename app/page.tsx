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

import InitialIdentifiers from "@/data/initialIdentifiers.json";

const initialEnvironment: EquationEnvironment = {
  variables: InitialIdentifiers.variables.map(v => ({ code: v, type: "variable" })),
  functions: InitialIdentifiers.functions.map(f => ({ code: f, type: "function" })),
  constants: InitialIdentifiers.constants.map(c => ({ code: c, type: "constant" })),
  custom: [],
};

// Defines the width of each panel in %
const editorPanelWidth = 70;
const sidebarPanelWidth = 100 - editorPanelWidth;

export default function Home() {
  const [equations, setEquations] = useState<Equation[]>([]);
  const [environment, setEnvironment] = useState<EquationEnvironment>(initialEnvironment);

  const addEquation = () => {
    setEquations([...equations, { id: generateUUID(), lhs: "", rhs: "" }]);
  }

  const addCustomVariable = (identifier: string) => {
    if (environment.custom.some((x) => x.code === identifier)) return;
    const customIdentifiers = [
      ...environment.custom,
      { code: identifier, type: "customVariable" },
    ];
    setEnvironment((prev) => {
      return { ...prev, custom: customIdentifiers } as EquationEnvironment;
    });
  };

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
            <EditorPanel
              equations={equations}
              addEquation={addEquation}
              addCustomIdentifier={addCustomVariable}
              environment={environment}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={sidebarPanelWidth}>
            <SidebarPanel environment={environment} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
