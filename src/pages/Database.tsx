
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Database as DatabaseIcon, Download, BarChart4, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SqlEditor } from "@/components/database/SqlEditor";
import { SqlSampleCode } from "@/components/database/SqlSamples";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const sampleResults = [
  { razao_social: "BRADESCO SAUDE S.A.", despesa_eventos: 6458224000 },
  { razao_social: "AMIL ASSISTENCIA MEDICA INTERNACIONAL S.A.", despesa_eventos: 5123768000 },
  { razao_social: "NOTRE DAME INTERMEDICA SAUDE S.A.", despesa_eventos: 4932553000 },
  { razao_social: "SUL AMERICA COMPANHIA DE SEGURO SAUDE", despesa_eventos: 3876421000 },
  { razao_social: "UNIMED-BELO HORIZONTE COOPERATIVA DE TRABALHO MEDICO", despesa_eventos: 2453678000 },
  { razao_social: "UNIMED-RIO COOPERATIVA DE TRABALHO MEDICO DO RIO DE JANEIRO", despesa_eventos: 2345789000 },
  { razao_social: "UNIMED PORTO ALEGRE - COOPERATIVA MÉDICA LTDA", despesa_eventos: 2123456000 },
  { razao_social: "HAPVIDA ASSISTENCIA MEDICA S.A.", despesa_eventos: 1987654000 },
  { razao_social: "CENTRAL NACIONAL UNIMED - COOPERATIVA CENTRAL", despesa_eventos: 1876542000 },
  { razao_social: "AMIL SAUDE LTDA.", despesa_eventos: 1765432000 },
];

// Formatar os valores para melhor visualização
const formatValue = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)} bi`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} mi`;
  }
  return value.toString();
};

// Preparar os dados para o gráfico
const chartData = sampleResults.map(item => ({
  name: item.razao_social.split(' ')[0], // Usa apenas a primeira palavra para eixo X mais limpo
  despesa: item.despesa_eventos,
  fullName: item.razao_social
}));

// Configuração para o gráfico
const chartConfig = {
  despesa: {
    label: "Despesa com Eventos",
    theme: {
      light: "#8B5CF6",
      dark: "#9b87f5"
    }
  }
};

export default function DatabasePage() {
  const { toast } = useToast();
  const [hasResults, setHasResults] = useState(false);
  const [activeChartType, setActiveChartType] = useState<'bar' | 'horizontal'>('bar');
  
  const handleExecuteQuery = () => {
    setHasResults(true);
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
            <h1 className="heading-lg mb-4">Teste de Banco de Dados</h1>
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
                <SqlEditor onExecuteQuery={handleExecuteQuery} />
                
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
                                  <TableCell>{formatValue(row.despesa_eventos)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Visualização de Dados</CardTitle>
                          <CardDescription>
                            Representação gráfica dos resultados da consulta
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant={activeChartType === 'bar' ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setActiveChartType('bar')}
                          >
                            Barras
                          </Button>
                          <Button 
                            variant={activeChartType === 'horizontal' ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setActiveChartType('horizontal')}
                          >
                            Horizontal
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-md p-4">
                          <ChartContainer className="h-[400px]" config={chartConfig}>
                            {activeChartType === 'bar' ? (
                              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  dataKey="name" 
                                  angle={-45} 
                                  textAnchor="end" 
                                  height={70} 
                                  interval={0} 
                                />
                                <YAxis tickFormatter={(value) => formatValue(value)} />
                                <Tooltip 
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-background border p-2 rounded-md shadow-md">
                                          <p className="font-medium">{payload[0].payload.fullName}</p>
                                          <p>
                                            <span className="text-muted-foreground">Despesa: </span>
                                            <span className="font-mono">R$ {formatValue(payload[0].value as number)}</span>
                                          </p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <Legend />
                                <Bar 
                                  dataKey="despesa" 
                                  fill="var(--color-despesa)" 
                                  name="Despesa com Eventos" 
                                />
                              </BarChart>
                            ) : (
                              <BarChart 
                                data={chartData} 
                                layout="vertical" 
                                margin={{ top: 20, right: 30, left: 150, bottom: 40 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={(value) => formatValue(value)} />
                                <YAxis 
                                  type="category" 
                                  dataKey="fullName" 
                                  width={140} 
                                  interval={0} 
                                />
                                <Tooltip 
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-background border p-2 rounded-md shadow-md">
                                          <p className="font-medium">{payload[0].payload.fullName}</p>
                                          <p>
                                            <span className="text-muted-foreground">Despesa: </span>
                                            <span className="font-mono">R$ {formatValue(payload[0].value as number)}</span>
                                          </p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <Legend />
                                <Bar 
                                  dataKey="despesa" 
                                  fill="var(--color-despesa)" 
                                  name="Despesa com Eventos" 
                                />
                              </BarChart>
                            )}
                          </ChartContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
                
                <SqlSampleCode />
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
