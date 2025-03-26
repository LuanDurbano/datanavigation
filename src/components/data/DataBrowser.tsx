import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileType, Filter, Search, BarChart3, Layers, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const documentCategories = [
  { id: "ans", name: "ANS - Agência Nacional de Saúde" },
  { id: "demonstracoes", name: "Demonstrações Contábeis" },
  { id: "operadoras", name: "Operadoras de Planos de Saúde" },
  { id: "procedimentos", name: "Rol de Procedimentos" },
];

const documentsData = [
  {
    id: 1,
    title: "Anexo I - Rol de Procedimentos e Eventos em Saúde",
    category: "procedimentos",
    format: "PDF",
    date: "2022-01-15",
    size: "2.4 MB",
    url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos",
  },
  {
    id: 2,
    title: "Anexo II - Diretrizes de Utilização",
    category: "procedimentos",
    format: "PDF",
    date: "2022-01-15",
    size: "1.8 MB",
    url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos",
  },
  {
    id: 3,
    title: "Demonstrações Contábeis - 2022 T4",
    category: "demonstracoes",
    format: "ZIP",
    date: "2023-03-20",
    size: "45.2 MB",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/",
  },
  {
    id: 4,
    title: "Demonstrações Contábeis - 2022 T3",
    category: "demonstracoes",
    format: "ZIP",
    date: "2022-12-15",
    size: "42.8 MB",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/",
  },
  {
    id: 5,
    title: "Demonstrações Contábeis - 2022 T2",
    category: "demonstracoes",
    format: "ZIP",
    date: "2022-09-15",
    size: "41.5 MB",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/",
  },
  {
    id: 6,
    title: "Demonstrações Contábeis - 2022 T1",
    category: "demonstracoes",
    format: "ZIP",
    date: "2022-06-15",
    size: "40.9 MB",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/",
  },
  {
    id: 7,
    title: "Operadoras de Planos de Saúde Ativas",
    category: "operadoras",
    format: "CSV",
    date: "2023-05-10",
    size: "1.2 MB",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/operadoras_de_plano_de_saude_ativas/",
  },
  {
    id: 8,
    title: "Participação da Sociedade - Atualização do Rol",
    category: "ans",
    format: "HTML",
    date: "2023-01-20",
    size: "N/A",
    url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos",
  },
];

const chartData = [
  { name: 'ANS', count: 2 },
  { name: 'Demonstrações', count: 4 },
  { name: 'Operadoras', count: 1 },
  { name: 'Procedimentos', count: 2 },
];

const chartConfig = {
  count: {
    label: "Quantidade de Documentos",
    theme: {
      light: "#8B5CF6",
      dark: "#9b87f5"
    }
  }
};

interface Document {
  id: number;
  title: string;
  category: string;
  format: string;
  date: string;
  size: string;
  url: string;
}

export function DataBrowser() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [documents, setDocuments] = useState<Document[]>(documentsData);
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || doc.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (document: Document) => {
    window.open(document.url, "_blank");
    toast({
      title: "Download iniciado",
      description: `Baixando: ${document.title}`,
    });
  };

  const handleBulkDownload = () => {
    toast({
      title: "Download em lote iniciado",
      description: "Os documentos selecionados serão baixados.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setViewMode("list")}
          >
            <Layers className="h-4 w-4" />
            <span className="sr-only">Modo Lista</span>
          </Button>
          <Button 
            variant={viewMode === "chart" ? "default" : "outline"} 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setViewMode("chart")}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="sr-only">Modo Gráfico</span>
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
          <Button onClick={handleBulkDownload}>
            <Download className="mr-2 h-4 w-4" /> Baixar selecionados
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          {documentCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {viewMode === "chart" ? (
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Distribuição de Documentos por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border p-2 rounded-md shadow-md">
                                <p className="font-medium">{payload[0].payload.name}</p>
                                <p>
                                  <span className="text-muted-foreground">Documentos: </span>
                                  <span className="font-mono">{payload[0].value}</span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="count" 
                        fill="var(--color-count)" 
                        name="Quantidade de Documentos" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <FileType className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">
                    Nenhum documento encontrado
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Tente ajustar sua busca ou filtros para encontrar o que procura.
                  </p>
                </div>
              ) : (
                filteredDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Card variant="bordered" hover={false} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full",
                                {
                                  "bg-blue-100 text-blue-700":
                                    doc.format === "PDF",
                                  "bg-green-100 text-green-700":
                                    doc.format === "CSV",
                                  "bg-amber-100 text-amber-700":
                                    doc.format === "ZIP",
                                  "bg-purple-100 text-purple-700":
                                    doc.format === "HTML",
                                }
                              )}
                            >
                              <span className="text-xs font-medium">
                                {doc.format}
                              </span>
                            </div>
                            <h3 className="font-semibold">{doc.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                            <span>Data: {doc.date}</span>
                            <span>Tamanho: {doc.size}</span>
                          </div>
                        </div>
                        <div className="flex mt-4 sm:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => window.open(doc.url, "_blank")}
                          >
                            Ver
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(doc)}
                          >
                            <Download className="mr-1 h-4 w-4" /> Baixar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DataBrowser;
