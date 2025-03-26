
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { 
  Download, 
  FileText, 
  Database, 
  Search, 
  Code, 
  BarChart4 
} from "lucide-react";

const features = [
  {
    icon: <Download className="h-10 w-10 text-primary" />,
    title: "Web Scraping",
    description: "Acesse e baixe automaticamente documentos e anexos de sites governamentais.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Transformação de Dados",
    description: "Extraia tabelas de PDFs e converta para formatos estruturados como CSV.",
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Banco de Dados",
    description: "Crie scripts SQL para estruturar e analisar grandes volumes de dados.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Busca Inteligente",
    description: "Realize buscas textuais avançadas em bases de operadoras de saúde.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "API Integrada",
    description: "Interface de programação para acesso aos dados via requisições HTTP.",
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-primary" />,
    title: "Análises e Insights",
    description: "Visualize resultados de consultas analíticas com gráficos interativos.",
  },
];

export function Features() {
  return (
    <section className="section bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-4">Ferramentas Poderosas para Dados Governamentais</h2>
          <p className="text-xl text-muted-foreground">
            Nosso conjunto completo de funcionalidades para análise, transformação e visualização de dados públicos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-none"
              variant="glass"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
