import { Equation } from "@/lib/types/equation";
import { Input } from "../ui/input";
import { useState } from "react";

interface EquationRowProps {
  equation: Equation;
}

const EquationRow = (props: EquationRowProps) => {
  const { equation } = props;
  const [lhs, setLhs] = useState<string>(equation.lhs);
  const [rhs, setRhs] = useState<string>(equation.rhs);

  return (
    <div className="flex flex-row items-center gap-4 w-full">
      {/* TODO: Get rid of the annoying focus outline! */}
      <Input className="min-w-12 max-w-[300px] font-mono" value={lhs} onChange={(e) => setLhs(e.target.value)} />
      <span className="text-lg text-gray-500">=</span>
      <Input className="min-w-12 font-mono" value={rhs} onChange={(e) => setRhs(e.target.value)} />
    </div>
  )
}

export default EquationRow;