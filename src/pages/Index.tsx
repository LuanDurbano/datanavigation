
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BarChart4, FileSpreadsheet, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/common/Card";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* Metrics Section */}
        <section className="section bg-primary/5">
          <div className="container">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title mb-4">Resultados Comprovados</h2>
              <p className="text-xl text-muted-foreground">
                Nossa plataforma tem ajudado analistas a economizar tempo e obter insights valiosos dos dados governamentais.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-muted-foreground">Documentos processados mensalmente</p>
              </motion.div>
              
              <motion.div
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">12</h3>
                <p className="text-muted-foreground">Conjuntos de dados integrados</p>
              </motion.div>
              
              <motion.div
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart4 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">85%</h3>
                <p className="text-muted-foreground">Redução no tempo de análise</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Technical Tools Section */}
        <section className="section">
          <div className="container">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title mb-4">Tecnologias Avançadas</h2>
              <p className="text-xl text-muted-foreground">
                Utilizamos as melhores tecnologias para garantir eficiência e precisão no processamento de dados.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">Py</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Python para Transformação</h3>
                      <p className="text-muted-foreground mb-4">
                        Utilizamos bibliotecas como tabula-py, pandas e numpy para extrair e processar dados estruturados de documentos PDF.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Pandas</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">tabula-py</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">NumPy</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">SQL</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">SQL para Análise</h3>
                      <p className="text-muted-foreground mb-4">
                        Consultas SQL avançadas permitem realizar análises complexas em grandes conjuntos de dados de forma eficiente.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">PostgreSQL</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">SQLite</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Joins</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">API</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">API RESTful</h3>
                      <p className="text-muted-foreground mb-4">
                        Interface de programação para acesso programático aos dados por meio de requisições HTTP padronizadas.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">FastAPI</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">JWT</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Swagger</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">AI</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Inteligência Artificial</h3>
                      <p className="text-muted-foreground mb-4">
                        Algoritmos de machine learning para classificação e extração de dados não estruturados de documentos.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">NLP</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">OCR</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">TensorFlow</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
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
                <Button variant="outline" size="sm" asChild>
                  <Link to="/browser">
                    Ver Navegador <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
                <Button variant="outline" size="sm" asChild>
                  <Link to="/transformation">
                    Ver Transformação <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
                <Button variant="outline" size="sm" asChild>
                  <Link to="/database">
                    Ver Consultas SQL <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link to="/browser">
                        Começar agora <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/web-scraping">
                        Ver Web Scraping <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
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
