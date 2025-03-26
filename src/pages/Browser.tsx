
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataBrowser from "@/components/data/DataBrowser";
import DatasetBrowser from "@/components/data/DatasetBrowser";

export default function BrowserPage() {
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
            <h1 className="heading-lg mb-4">Browser de Dados</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Acesse, navegue e baixe dados abertos da Agência Nacional de Saúde e outras fontes governamentais.
            </p>
          </motion.div>
          
          <Tabs defaultValue="datasets" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="datasets">Conjuntos de Dados</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="datasets" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <DatasetBrowser />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <DataBrowser />
              </motion.div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
