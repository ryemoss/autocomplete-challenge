import { Equation } from "@/lib/types/equation";
import { useState } from "react";
import AutocompleteInput from "@/components/ui/autocomplete";
import { Identifier } from "@/lib/types/identifiers";

interface EquationRowProps {
  equation: Equation;
  addCustomIdentifier: (identifer: string) => void;
  suggestions: Identifier[];
}

const EquationRow = (props: EquationRowProps) => {
  const { equation, addCustomIdentifier, suggestions } = props;
  const [lhs, setLhs] = useState<string>(equation.lhs);
  const [rhs, setRhs] = useState<string>(equation.rhs);

  function handleNewEquation() {
    if (lhs.length && rhs.length) {
      addCustomIdentifier(lhs);
    }
  }

  return (
    <div className="flex flex-row items-center gap-4 w-full">
      <AutocompleteInput
        className="min-w-12 max-w-[300px]"
        value={lhs}
        suggestions={suggestions}
        onChange={(val: string) => setLhs(val)}
        onBlur={handleNewEquation}
      />

      <span className="text-lg text-gray-500">=</span>

      <AutocompleteInput
        className="min-w-12 flex-1"
        value={rhs}
        suggestions={suggestions}
        onChange={(val: string) => setRhs(val)}
        onBlur={handleNewEquation}
      />
    </div>
  )
}

export default EquationRow;