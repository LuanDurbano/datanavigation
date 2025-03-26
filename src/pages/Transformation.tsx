
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { FileUp, FileText, Download, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Transformation() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  
  const handleUpload = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo PDF para prosseguir.",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Arquivo enviado com sucesso",
        description: `${fileName} foi enviado e está pronto para processamento.`,
      });
    }, 1500);
  };
  
  const handleProcess = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo PDF para prosseguir.",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Processamento concluído",
        description: "Os dados foram extraídos e convertidos para CSV com sucesso.",
      });
    }, 3000);
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
            <h1 className="heading-lg mb-4">Transformação de Dados</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Extraia tabelas de PDFs e converta para formatos estruturados como CSV.
            </p>
          </motion.div>
          
          <Tabs defaultValue="pdf-to-csv" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="pdf-to-csv">PDF para CSV</TabsTrigger>
              <TabsTrigger value="batch-processing">Processamento em Lote</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pdf-to-csv" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Upload de Arquivo</CardTitle>
                    <CardDescription>
                      Selecione o PDF do Anexo I - Rol de Procedimentos e Eventos em Saúde.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-4">
                      <FileUp className="mx-auto h-10 w-10 text-muted-foreground/50 mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Arraste e solte seu arquivo PDF aqui, ou clique para selecionar
                      </p>
                      <div className="relative">
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".pdf"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <Button variant="outline" className="w-full">
                          Selecionar arquivo
                        </Button>
                      </div>
                      {fileName && (
                        <p className="mt-2 text-sm flex items-center justify-center text-primary">
                          <Check className="h-4 w-4 mr-1" /> {fileName}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <Button onClick={handleUpload} disabled={!file || isUploading}>
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                          </>
                        ) : (
                          <>Upload</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Extrair e Converter</CardTitle>
                    <CardDescription>
                      Extraia dados da tabela e converta para CSV formatado.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="output-name">Nome do arquivo de saída</Label>
                        <Input id="output-name" placeholder="Rol_Procedimentos" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="replace-abbreviations" className="rounded" defaultChecked />
                          <Label htmlFor="replace-abbreviations">
                            Substituir abreviações (OD, AMB) por descrições completas
                          </Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="compress" className="rounded" defaultChecked />
                          <Label htmlFor="compress">
                            Compactar resultado em arquivo ZIP
                          </Label>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleProcess} 
                        disabled={!file || isProcessing}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                          </>
                        ) : (
                          <>Processar</>
                        )}
                      </Button>
                      
                      <Button variant="outline" className="w-full" disabled={!file || isProcessing}>
                        <Download className="mr-2 h-4 w-4" /> Baixar Resultado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Instruções</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Carregue o PDF do Anexo I do Rol de Procedimentos.</li>
                    <li>Clique em "Processar" para extrair os dados da tabela.</li>
                    <li>Os dados serão extraídos de todas as páginas do PDF e organizados em uma tabela estruturada.</li>
                    <li>As abreviações OD e AMB serão substituídas por suas descrições completas conforme a legenda.</li>
                    <li>O resultado será salvo como CSV e compactado em formato ZIP.</li>
                    <li>Clique em "Baixar Resultado" para obter o arquivo processado.</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="batch-processing" className="mt-0">
              <div className="rounded-lg border border-dashed p-16 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Processamento em Lote</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Esta funcionalidade estará disponível em breve. O processamento em lote permitirá converter múltiplos documentos PDF simultaneamente.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
