
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { FileText } from "lucide-react";
import { PdfTransformer } from "@/components/transformation/PdfTransformer";
import { PythonCodeSample } from "@/components/transformation/CodeSample";
import { BatchProcessor } from "@/components/transformation/BatchProcessor";

export default function Transformation() {
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
            <h1 className="heading-lg mb-4">Teste de Transformação de Dados</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Extraia tabelas do PDF do Anexo I e converta para formato CSV estruturado.
            </p>
          </motion.div>
          
          <Tabs defaultValue="pdf-to-csv" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="pdf-to-csv">PDF para CSV</TabsTrigger>
              <TabsTrigger value="batch-processing">Processamento em Lote</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pdf-to-csv" className="mt-0">
              <PdfTransformer />
              
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
                    <li>Clique em "Baixar CSV" para obter o arquivo processado.</li>
                  </ol>
                </CardContent>
              </Card>
              
              <PythonCodeSample />
            </TabsContent>
            
            <TabsContent value="batch-processing" className="mt-0">
              <BatchProcessor />
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Instruções para Processamento em Lote</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Selecione vários arquivos PDF para processamento.</li>
                    <li>Configure o nome da pasta de saída onde os arquivos CSV serão salvos.</li>
                    <li>Clique em "Upload" para enviar os arquivos selecionados.</li>
                    <li>Após o upload, clique em "Processar" para iniciar a conversão em lote.</li>
                    <li>O progresso será exibido durante o processamento.</li>
                    <li>Após a conclusão, você poderá baixar todos os resultados em um único arquivo ZIP.</li>
                  </ol>
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
