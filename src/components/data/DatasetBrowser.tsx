
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/common/Card";
import { Download, Database, Filter, Search, Table, BarChart, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const datasetsData = [
  {
    id: 1,
    title: "Beneficiários de Planos de Saúde",
    category: "beneficiarios",
    format: "CSV",
    date: "2023-06-15",
    size: "48.2 MB",
    records: "45.8 milhões",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/beneficiarios/",
    description: "Dados sobre beneficiários de planos de saúde, incluindo distribuição geográfica e tipo de plano.",
  },
  {
    id: 2,
    title: "Operadoras Ativas",
    category: "operadoras",
    format: "CSV",
    date: "2023-06-10",
    size: "1.2 MB",
    records: "947",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/operadoras_de_plano_de_saude_ativas/",
    description: "Registros de operadoras de planos de saúde ativas, com informações cadastrais e dados de registro.",
  },
  {
    id: 3,
    title: "Demonstrações Contábeis 2022",
    category: "demonstracoes",
    format: "CSV",
    date: "2023-03-25",
    size: "154.7 MB",
    records: "35.264",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/",
    description: "Demonstrações contábeis das operadoras, incluindo balanço patrimonial e demonstrações de resultado.",
  },
  {
    id: 4,
    title: "Reclamações dos Consumidores",
    category: "reclamacoes",
    format: "CSV",
    date: "2023-05-20",
    size: "86.3 MB",
    records: "98.215",
    url: "https://dadosabertos.ans.gov.br/FTP/PDA/reclamacoes/",
    description: "Dados sobre reclamações registradas por consumidores contra operadoras de planos de saúde.",
  },
];

interface Dataset {
  id: number;
  title: string;
  category: string;
  format: string;
  date: string;
  size: string;
  records: string;
  url: string;
  description: string;
}

export function DatasetBrowser() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [datasets, setDatasets] = useState<Dataset[]>(datasetsData);
  const [isDownloading, setIsDownloading] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (dataset: Dataset) => {
    setIsDownloading(dataset.id);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(null);
            setDownloadProgress(0);
            toast({
              title: "Download concluído",
              description: `${dataset.title} foi baixado com sucesso.`,
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleViewDetails = (dataset: Dataset) => {
    setSelectedDataset(dataset);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conjuntos de dados..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filtrar</span>
        </Button>
      </div>

      {selectedDataset ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedDataset.title}</h3>
                  <p className="text-muted-foreground mb-4">{selectedDataset.description}</p>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
                    <div>
                      <span className="font-medium">Formato:</span> {selectedDataset.format}
                    </div>
                    <div>
                      <span className="font-medium">Data:</span> {selectedDataset.date}
                    </div>
                    <div>
                      <span className="font-medium">Tamanho:</span> {selectedDataset.size}
                    </div>
                    <div>
                      <span className="font-medium">Registros:</span> {selectedDataset.records}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDataset(null)}>
                    Voltar
                  </Button>
                  <Button size="sm" onClick={() => handleDownload(selectedDataset)}>
                    <Download className="mr-1 h-4 w-4" /> Baixar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-medium mb-4">Amostra de dados</h4>
              <div className="overflow-x-auto">
                <UITable>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>Item exemplo {index + 1}</TableCell>
                        <TableCell>{selectedDataset.category}</TableCell>
                        <TableCell>R$ {Math.floor(Math.random() * 1000) + 100},00</TableCell>
                        <TableCell>{selectedDataset.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </UITable>
              </div>
            </div>
            
            <div className="p-6 bg-muted/30">
              <h4 className="font-medium mb-4">Ferramentas de análise</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Table className="h-6 w-6" />
                  <span>Visualizar tabela completa</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <BarChart className="h-6 w-6" />
                  <span>Gerar gráficos</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <FileSpreadsheet className="h-6 w-6" />
                  <span>Exportar para Excel</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {filteredDatasets.length === 0 ? (
              <div className="text-center py-12">
                <Database className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">
                  Nenhum conjunto de dados encontrado
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Tente ajustar sua busca ou filtros para encontrar o que procura.
                </p>
              </div>
            ) : (
              filteredDatasets.map((dataset, index) => (
                <motion.div
                  key={dataset.id}
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
                                "bg-green-100 text-green-700":
                                  dataset.format === "CSV",
                                "bg-blue-100 text-blue-700":
                                  dataset.format === "JSON",
                                "bg-amber-100 text-amber-700":
                                  dataset.format === "XLS",
                              }
                            )}
                          >
                            <span className="text-xs font-medium">
                              {dataset.format}
                            </span>
                          </div>
                          <h3 className="font-semibold">{dataset.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {dataset.description}
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                          <span>Data: {dataset.date}</span>
                          <span>Tamanho: {dataset.size}</span>
                          <span>Registros: {dataset.records}</span>
                        </div>
                      </div>
                      <div className="flex mt-4 sm:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleViewDetails(dataset)}
                        >
                          Detalhes
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(dataset)}
                          disabled={isDownloading === dataset.id}
                        >
                          {isDownloading === dataset.id ? (
                            <span className="flex items-center">
                              <Download className="mr-1 h-4 w-4" /> {downloadProgress}%
                            </span>
                          ) : (
                            <>
                              <Download className="mr-1 h-4 w-4" /> Baixar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    {isDownloading === dataset.id && (
                      <div className="px-6 pb-4">
                        <Progress value={downloadProgress} className="h-2" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}

export default DatasetBrowser;
