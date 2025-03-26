
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Play, Code } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const SqlEditor = ({ onExecuteQuery }: { onExecuteQuery: () => void }) => {
  const { toast } = useToast();
  const [sqlQuery, setSqlQuery] = useState(`-- Quais as 10 operadoras com maiores despesas em "EVENTOS/ SINISTROS 
-- CONHECIDOS OU AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR" 
-- no último trimestre?

SELECT 
  o.razao_social,
  COALESCE(d.vl_saldo_final, 0) as despesa_eventos
FROM 
  operadoras o
LEFT JOIN demonstracoes_contabeis d ON o.registro_ans = d.registro_ans
WHERE 
  d.data_demonstracao = '2022-12-31'  -- último trimestre disponível
  AND d.descricao = 'EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR'
ORDER BY 
  despesa_eventos DESC
LIMIT 10;`);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const handleExecute = () => {
    if (!sqlQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Query vazia",
        description: "Por favor, insira uma consulta SQL para executar.",
      });
      return;
    }
    
    setIsExecuting(true);
    
    // Simulação de execução de query
    setTimeout(() => {
      setIsExecuting(false);
      onExecuteQuery();
      toast({
        title: "Query executada com sucesso",
        description: "Os resultados estão disponíveis abaixo.",
      });
    }, 2000);
  };
  
  const handleClear = () => {
    setSqlQuery("");
  };
  
  const handleFormat = () => {
    // Simulação simples de formatação SQL
    const formattedQuery = sqlQuery
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ", ")
      .replace(/\s*=\s*/g, " = ")
      .replace(/SELECT/gi, "SELECT\n  ")
      .replace(/FROM/gi, "\nFROM\n  ")
      .replace(/WHERE/gi, "\nWHERE\n  ")
      .replace(/ORDER BY/gi, "\nORDER BY\n  ")
      .replace(/LIMIT/gi, "\nLIMIT ")
      .replace(/AND/gi, "\n  AND ")
      .replace(/JOIN/gi, "\nJOIN ");
    
    setSqlQuery(formattedQuery);
    toast({
      title: "SQL formatado",
      description: "A consulta foi formatada para melhor legibilidade.",
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Editor SQL</CardTitle>
        <CardDescription>
          Escreva sua consulta SQL para analisar os dados das operadoras e demonstrações contábeis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-950 rounded-md p-4 mb-4">
          <Textarea
            className="font-mono bg-transparent border-none focus-visible:ring-0 min-h-[200px] text-white resize-y"
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            placeholder="-- Escreva sua consulta SQL aqui"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleExecute} disabled={isExecuting}>
            {isExecuting ? "Executando..." : (
              <>
                <Play className="mr-2 h-4 w-4" /> Executar Query
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Limpar
          </Button>
          <Button variant="outline" onClick={handleFormat}>
            <Code className="mr-2 h-4 w-4" /> Formatar SQL
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
