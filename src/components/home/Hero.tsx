
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Download, Search, Database, FileText, BarChart4 } from "lucide-react";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-background pt-28 md:pt-32 pb-16 md:pb-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute right-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            variants={item}
          >
            Navegue pelos dados abertos do governo
          </motion.div>

          <motion.h1
            className="heading-xl mb-6 bg-clip-text"
            variants={item}
          >
            Acesse, transforme e analise dados públicos com{" "}
            <span className="text-primary">eficiência</span> e{" "}
            <span className="text-primary">precisão</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 md:mb-10"
            variants={item}
          >
            Ferramenta completa para acessar, transformar e analisar dados públicos da ANS
            e outros órgãos governamentais de forma simples e eficiente.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={item}
          >
            <Button size="lg" asChild>
              <Link to="/browser">
                Explorar dados <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/transformation">
                Transformar dados <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="glass-card p-6 flex flex-col items-center text-center hover-scale">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Web Scraping Avançado
            </h3>
            <p className="text-muted-foreground">
              Baixe e automatize a coleta de dados do site da ANS e outros portais governamentais em segundos.
            </p>
            <div className="mt-4 pt-4 border-t border-muted w-full">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/web-scraping">
                  <FileText className="mr-2 h-4 w-4" /> Ver detalhes
                </Link>
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center hover-scale">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Extração e Transformação
            </h3>
            <p className="text-muted-foreground">
              Extraia tabelas de documentos PDF, converta para CSV e utilize técnicas avançadas de processamento.
            </p>
            <div className="mt-4 pt-4 border-t border-muted w-full">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/transformation">
                  <Database className="mr-2 h-4 w-4" /> Ver detalhes
                </Link>
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center hover-scale">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart4 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Análise com SQL
            </h3>
            <p className="text-muted-foreground">
              Execute consultas SQL completas, crie relatórios personalizados e visualize resultados em tempo real.
            </p>
            <div className="mt-4 pt-4 border-t border-muted w-full">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/database">
                  <Database className="mr-2 h-4 w-4" /> Ver detalhes
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tecnologias utilizadas */}
        <motion.div 
          className="mt-16 flex justify-center items-center flex-wrap gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">Desenvolvido com:</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-xs">Py</span>
              </div>
              <span className="text-muted-foreground text-sm">Python</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-300 font-bold text-xs">SQL</span>
              </div>
              <span className="text-muted-foreground text-sm">PostgreSQL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-bold text-xs">API</span>
              </div>
              <span className="text-muted-foreground text-sm">FastAPI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <span className="text-red-600 dark:text-red-300 font-bold text-xs">R</span>
              </div>
              <span className="text-muted-foreground text-sm">React</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
