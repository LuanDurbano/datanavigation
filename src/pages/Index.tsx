
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* How it Works Section */}
        <section className="section">
          <div className="container">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title mb-4">Como Funciona</h2>
              <p className="text-xl text-muted-foreground">
                Processo simples e eficiente para acessar, transformar e analisar dados governamentais.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary font-bold text-2xl">1</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Acesse os Dados</h3>
                <p className="text-muted-foreground mb-4">
                  Conecte-se aos portais governamentais e baixe automaticamente os documentos necessários.
                </p>
              </motion.div>
              
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary font-bold text-2xl">2</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Transforme os Dados</h3>
                <p className="text-muted-foreground mb-4">
                  Extraia tabelas de PDFs, converta para formatos estruturados e prepare para análise.
                </p>
              </motion.div>
              
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary font-bold text-2xl">3</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Analise e Visualize</h3>
                <p className="text-muted-foreground mb-4">
                  Execute consultas SQL avançadas, obtenha insights e visualize os resultados.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="container">
            <div className="glass-panel p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="heading-lg mb-6">
                    Pronto para simplificar seu trabalho com dados governamentais?
                  </h2>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Acesso rápido a documentos públicos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Transformação automática de dados</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Análises SQL avançadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>API integrada para busca textual</span>
                    </li>
                  </ul>
                  <Button size="lg" asChild>
                    <Link to="/browser">
                      Começar agora <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-1 bg-gradient-to-r from-primary to-blue-400"></div>
                    <div className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-4/6"></div>
                      </div>
                      <div className="mt-8 space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 bg-primary/20 rounded-md"></div>
                          <div className="h-8 bg-primary/20 rounded-md"></div>
                          <div className="h-8 bg-primary/20 rounded-md"></div>
                        </div>
                        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <div className="h-8 w-24 bg-primary rounded-md"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -z-10 top-8 right-8 bottom-8 left-8 bg-primary/20 rounded-lg blur-xl animate-float"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
