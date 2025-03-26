
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DataBrowser } from "@/components/data/DataBrowser";
import { DatasetBrowser } from "@/components/data/DatasetBrowser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Database, FileText, Download, Search, Filter, Table, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            <Card variant="bordered" className="hover-scale">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>8 documentos disponíveis</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Inclui RN's, anexos e outros documentos regulatórios da ANS.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="#documents">
                    Ver documentos <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card variant="bordered" className="hover-scale">
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Conjuntos de Dados</CardTitle>
                  <CardDescription>4 conjuntos disponíveis</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Dados estruturados para análise, incluindo rol de procedimentos.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="#datasets">
                    Ver conjuntos <Table className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card variant="bordered" className="hover-scale">
              <CardHeader className="flex flex-row items-center gap-4">
                <Download className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Downloads Recentes</CardTitle>
                  <CardDescription>Últimas atualizações disponíveis</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Acompanhe downloads recentes e sincronize seus dados locais.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Ver histórico <BarChart4 className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Explorar Dados</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="documents" className="mt-8" id="documents">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="datasets">Conjuntos de Dados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-0">
              <div className="mb-6 bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Documentos da ANS:</strong> Acesse resoluções normativas, anexos técnicos e outras publicações oficiais. 
                  Clique em um documento para ver detalhes ou baixá-lo.
                </p>
              </div>
              <DataBrowser />
            </TabsContent>
            
            <TabsContent value="datasets" className="mt-0" id="datasets">
              <div className="mb-6 bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Conjuntos de Dados:</strong> Acesse dados estruturados extraídos de documentos oficiais,
                  prontos para análise ou importação em sistemas. Disponíveis em CSV, JSON e Excel.
                </p>
              </div>
              <DatasetBrowser />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
