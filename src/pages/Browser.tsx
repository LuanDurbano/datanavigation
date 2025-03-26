
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DataBrowser } from "@/components/data/DataBrowser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Database, FileText, Download } from "lucide-react";

export default function Browser() {
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
            <h1 className="heading-lg mb-4">Navegador de Dados</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Acesse, baixe e gerencie documentos e conjuntos de dados da ANS e outros órgãos governamentais.
            </p>
          </motion.div>

          <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>8 documentos disponíveis</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card variant="bordered">
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Conjuntos de Dados</CardTitle>
                  <CardDescription>4 conjuntos disponíveis</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card variant="bordered">
              <CardHeader className="flex flex-row items-center gap-4">
                <Download className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Downloads Recentes</CardTitle>
                  <CardDescription>0 downloads realizados</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>

          <Tabs defaultValue="documents" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="datasets">Conjuntos de Dados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-0">
              <DataBrowser />
            </TabsContent>
            
            <TabsContent value="datasets" className="mt-0">
              <div className="rounded-lg border border-dashed p-16 text-center">
                <Database className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Conjuntos de Dados</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Esta funcionalidade estará disponível em breve. Os conjuntos de dados permitirão acesso estruturado a informações de operadoras, beneficiários e demonstrações contábeis.
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
