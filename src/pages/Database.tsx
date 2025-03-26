
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Database as DatabaseIcon, Play, Download, BarChart4, FileDown, Code } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sampleSQL = `-- Quais as 10 operadoras com maiores despesas em "EVENTOS/ SINISTROS 
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
LIMIT 10;`;

const sampleResults = [
  { razao_social: "BRADESCO SAUDE S.A.", despesa_eventos: "R$ 6.458.224.000,00" },
  { razao_social: "AMIL ASSISTENCIA MEDICA INTERNACIONAL S.A.", despesa_eventos: "R$ 5.123.768.000,00" },
  { razao_social: "NOTRE DAME INTERMEDICA SAUDE S.A.", despesa_eventos: "R$ 4.932.553.000,00" },
  { razao_social: "SUL AMERICA COMPANHIA DE SEGURO SAUDE", despesa_eventos: "R$ 3.876.421.000,00" },
  { razao_social: "UNIMED-BELO HORIZONTE COOPERATIVA DE TRABALHO MEDICO", despesa_eventos: "R$ 2.453.678.000,00" },
  { razao_social: "UNIMED-RIO COOPERATIVA DE TRABALHO MEDICO DO RIO DE JANEIRO", despesa_eventos: "R$ 2.345.789.000,00" },
  { razao_social: "UNIMED PORTO ALEGRE - COOPERATIVA MÉDICA LTDA", despesa_eventos: "R$ 2.123.456.000,00" },
  { razao_social: "HAPVIDA ASSISTENCIA MEDICA S.A.", despesa_eventos: "R$ 1.987.654.000,00" },
  { razao_social: "CENTRAL NACIONAL UNIMED - COOPERATIVA CENTRAL", despesa_eventos: "R$ 1.876.542.000,00" },
  { razao_social: "AMIL SAUDE LTDA.", despesa_eventos: "R$ 1.765.432.000,00" },
];

export default function DatabasePage() {
  const { toast } = useToast();
  const [sqlQuery, setSqlQuery] = useState(sampleSQL);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  
  const handleExecuteQuery = () => {
    if (!sqlQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Query vazia",
        description: "Por favor, insira uma consulta SQL para executar.",
      });
      return;
    }
    
    setIsExecuting(true);
    
    // Simulate query execution
    setTimeout(() => {
      setIsExecuting(false);
      setHasResults(true);
      toast({
        title: "Query executada com sucesso",
        description: "Os resultados estão disponíveis abaixo.",
      });
    }, 2000);
  };
  
  const handleDownloadResults = () => {
    toast({
      title: "Download iniciado",
      description: "Os resultados serão baixados em formato CSV.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <section className="container py-8 md:py-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-lg mb-4">Banco de Dados</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Execute queries SQL avançadas para análise de demonstrações contábeis e dados de operadoras.
            </p>
          </motion.div>
          
          <Tabs defaultValue="query" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="query">Query SQL</TabsTrigger>
              <TabsTrigger value="import">Importação</TabsTrigger>
              <TabsTrigger value="schema">Esquema</TabsTrigger>
            </TabsList>
            
            <TabsContent value="query" className="mt-0">
              <div className="space-y-8">
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
                        className="font-mono bg-transparent border-none focus-visible:ring-0 min-h-[200px] text-white"
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        placeholder="-- Escreva sua consulta SQL aqui"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={handleExecuteQuery} disabled={isExecuting}>
                        {isExecuting ? (
                          <>Executando...</>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" /> Executar Query
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        Limpar
                      </Button>
                      <Button variant="outline">
                        <Code className="mr-2 h-4 w-4" /> Formatar SQL
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {hasResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Resultados</CardTitle>
                          <CardDescription>
                            10 registros encontrados, mostrando todos os resultados
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleDownloadResults}>
                          <Download className="mr-2 h-4 w-4" /> Exportar CSV
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>RAZÃO SOCIAL</TableHead>
                                <TableHead>DESPESA EVENTOS</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sampleResults.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{row.razao_social}</TableCell>
                                  <TableCell>{row.despesa_eventos}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Visualização de Dados</CardTitle>
                        <CardDescription>
                          Representação gráfica dos resultados da consulta
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="p-6 border rounded-md flex items-center justify-center min-h-[400px]">
                          <div className="text-center">
                            <BarChart4 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <p className="text-muted-foreground">
                              Visualização será gerada automaticamente para consultas analíticas.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="import" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Importação de Dados</CardTitle>
                  <CardDescription>
                    Importe demonstrações contábeis e dados de operadoras para o banco de dados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Demonstrações Contábeis</h3>
                      <p className="text-muted-foreground mb-4">
                        Baixe automaticamente os arquivos dos últimos 2 anos do repositório público.
                      </p>
                      <Button>
                        <FileDown className="mr-2 h-4 w-4" /> Baixar Demonstrações Contábeis
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Operadoras de Planos de Saúde</h3>
                      <p className="text-muted-foreground mb-4">
                        Baixe os dados cadastrais das Operadoras Ativas na ANS no formato CSV.
                      </p>
                      <Button>
                        <FileDown className="mr-2 h-4 w-4" /> Baixar Dados de Operadoras
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Importar para Banco de Dados</h3>
                      <p className="text-muted-foreground mb-4">
                        Execute scripts SQL para estruturar tabelas e importar os dados baixados.
                      </p>
                      <Button variant="outline">
                        <DatabaseIcon className="mr-2 h-4 w-4" /> Executar Scripts de Importação
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schema" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Esquema do Banco de Dados</CardTitle>
                  <CardDescription>
                    Estrutura das tabelas e relacionamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tabela: operadoras</h3>
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>COLUNA</TableHead>
                              <TableHead>TIPO</TableHead>
                              <TableHead>DESCRIÇÃO</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">registro_ans</TableCell>
                              <TableCell>VARCHAR(20)</TableCell>
                              <TableCell>Registro da operadora na ANS (chave primária)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">cnpj</TableCell>
                              <TableCell>VARCHAR(14)</TableCell>
                              <TableCell>CNPJ da operadora</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">razao_social</TableCell>
                              <TableCell>VARCHAR(255)</TableCell>
                              <TableCell>Razão social da operadora</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">nome_fantasia</TableCell>
                              <TableCell>VARCHAR(255)</TableCell>
                              <TableCell>Nome fantasia da operadora</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">modalidade</TableCell>
                              <TableCell>VARCHAR(100)</TableCell>
                              <TableCell>Modalidade da operadora</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tabela: demonstracoes_contabeis</h3>
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>COLUNA</TableHead>
                              <TableHead>TIPO</TableHead>
                              <TableHead>DESCRIÇÃO</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">id</TableCell>
                              <TableCell>SERIAL</TableCell>
                              <TableCell>Identificador único (chave primária)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">registro_ans</TableCell>
                              <TableCell>VARCHAR(20)</TableCell>
                              <TableCell>Registro da operadora na ANS (chave estrangeira)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">data_demonstracao</TableCell>
                              <TableCell>DATE</TableCell>
                              <TableCell>Data da demonstração contábil</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">codigo_conta</TableCell>
                              <TableCell>VARCHAR(20)</TableCell>
                              <TableCell>Código da conta contábil</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">descricao</TableCell>
                              <TableCell>TEXT</TableCell>
                              <TableCell>Descrição da conta contábil</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">vl_saldo_inicial</TableCell>
                              <TableCell>NUMERIC(15,2)</TableCell>
                              <TableCell>Valor do saldo inicial</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">vl_saldo_final</TableCell>
                              <TableCell>NUMERIC(15,2)</TableCell>
                              <TableCell>Valor do saldo final</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
