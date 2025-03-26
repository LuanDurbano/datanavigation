
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Download, Search, Database } from "lucide-react";

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
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Download Automático
            </h3>
            <p className="text-muted-foreground">
              Baixe e compacte documentos PDF e outros formatos em apenas alguns cliques.
            </p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Extração Inteligente
            </h3>
            <p className="text-muted-foreground">
              Extraia tabelas de documentos PDF e converta para formatos estruturados como CSV.
            </p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Análise de Dados
            </h3>
            <p className="text-muted-foreground">
              Execute consultas SQL avançadas e visualize resultados em tempo real.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
