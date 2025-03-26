
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data for API results
const sampleResults = [
  { 
    registro_ans: "335339", 
    cnpj: "02933479000190", 
    razao_social: "BRADESCO SAUDE S.A.", 
    nome_fantasia: "BRADESCO SAÚDE", 
    modalidade: "Seguradora Especializada em Saúde",
    relevance: 0.95
  },
  { 
    registro_ans: "326305", 
    cnpj: "47058856000188", 
    razao_social: "AMIL ASSISTENCIA MEDICA INTERNACIONAL S.A.", 
    nome_fantasia: "AMIL", 
    modalidade: "Medicina de Grupo",
    relevance: 0.92
  },
  { 
    registro_ans: "359017", 
    cnpj: "32613680000183", 
    razao_social: "NOTRE DAME INTERMEDICA SAUDE S.A.", 
    nome_fantasia: "INTERMEDICA", 
    modalidade: "Medicina de Grupo",
    relevance: 0.89
  },
  { 
    registro_ans: "006246", 
    cnpj: "02685924000119", 
    razao_social: "SUL AMERICA COMPANHIA DE SEGURO SAUDE", 
    nome_fantasia: "SUL AMÉRICA SAÚDE", 
    modalidade: "Seguradora Especializada em Saúde",
    relevance: 0.87
  },
  { 
    registro_ans: "343889", 
    cnpj: "42580568000109", 
    razao_social: "UNIMED-BELO HORIZONTE COOPERATIVA DE TRABALHO MEDICO", 
    nome_fantasia: "UNIMED BH", 
    modalidade: "Cooperativa Médica",
    relevance: 0.84
  }
];

export const ApiInterface = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState(sampleResults);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        variant: "destructive",
        title: "Termo de busca vazio",
        description: "Por favor, insira um termo para realizar a busca.",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulação de busca usando a API
    setTimeout(() => {
      setIsSearching(false);
      setHasResults(true);
      // Filtrar resultados para simular a busca
      const filtered = sampleResults.filter(
        item => item.razao_social.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.nome_fantasia.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : sampleResults);
      
      toast({
        title: "Busca concluída",
        description: `Encontrado(s) ${filtered.length > 0 ? filtered.length : 5} resultado(s) para "${searchTerm}"`,
      });
    }, 1500);
  };

  return (
    <>
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle>Busca de Operadoras</CardTitle>
          <CardDescription>
            Realize buscas textuais na lista de operadoras ativas na ANS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite o nome da operadora..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                </>
              ) : (
                <>Buscar</>
              )}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <button 
              onClick={() => setSearchTerm("bradesco")}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              bradesco
            </button>
            <button 
              onClick={() => setSearchTerm("unimed")}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              unimed
            </button>
            <button 
              onClick={() => setSearchTerm("amil")}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              amil
            </button>
            <button 
              onClick={() => setSearchTerm("sul america")}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              sul america
            </button>
          </div>
        </CardContent>
      </Card>
      
      {hasResults && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
            <CardDescription>
              Exibindo {results.length} operadoras mais relevantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>REGISTRO ANS</TableHead>
                    <TableHead>RAZÃO SOCIAL</TableHead>
                    <TableHead>NOME FANTASIA</TableHead>
                    <TableHead>MODALIDADE</TableHead>
                    <TableHead>RELEVÂNCIA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.registro_ans}</TableCell>
                      <TableCell>{result.razao_social}</TableCell>
                      <TableCell>{result.nome_fantasia}</TableCell>
                      <TableCell>{result.modalidade}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${result.relevance * 100}%` }}
                            ></div>
                          </div>
                          <span>{Math.round(result.relevance * 100)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
