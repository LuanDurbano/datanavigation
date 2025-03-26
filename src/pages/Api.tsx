
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiInterface } from "@/components/api/ApiInterface";
import { ApiDocumentation, ServerCode, VueJsCode } from "@/components/api/ApiDocs";

export default function ApiPage() {
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
            <h1 className="heading-lg mb-4">Teste de API</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Desenvolvimento de interface web com Vue.js e API Python para busca de operadoras.
            </p>
          </motion.div>
          
          <Tabs defaultValue="interface" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
              <TabsTrigger value="interface">Interface</TabsTrigger>
              <TabsTrigger value="api-docs">Documentação API</TabsTrigger>
              <TabsTrigger value="server-code">Código Servidor</TabsTrigger>
              <TabsTrigger value="vuejs-code">Código Vue.js</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interface" className="mt-0">
              <ApiInterface />
            </TabsContent>
            
            <TabsContent value="api-docs" className="mt-0">
              <ApiDocumentation />
            </TabsContent>
            
            <TabsContent value="server-code" className="mt-0">
              <ServerCode />
            </TabsContent>
            
            <TabsContent value="vuejs-code" className="mt-0">
              <VueJsCode />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
