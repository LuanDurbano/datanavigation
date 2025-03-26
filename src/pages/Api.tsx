
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Search, Server, Code, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data for API results
const sampleResults = [
  { 
    registro_ans: "335339", 
    cnpj: "02933479000190", 
    razao_social: "BRADESCO SAUDE S.A.", 
    nome_fantasia: "BRADESCO SAÚDE", 
    modalidade: "Seguradora Especializada em Saúde",
    relevance: 0.95
  },
  { 
    registro_ans: "326305", 
    cnpj: "47058856000188", 
    razao_social: "AMIL ASSISTENCIA MEDICA INTERNACIONAL S.A.", 
    nome_fantasia: "AMIL", 
    modalidade: "Medicina de Grupo",
    relevance: 0.92
  },
  { 
    registro_ans: "359017", 
    cnpj: "32613680000183", 
    razao_social: "NOTRE DAME INTERMEDICA SAUDE S.A.", 
    nome_fantasia: "INTERMEDICA", 
    modalidade: "Medicina de Grupo",
    relevance: 0.89
  },
  { 
    registro_ans: "006246", 
    cnpj: "02685924000119", 
    razao_social: "SUL AMERICA COMPANHIA DE SEGURO SAUDE", 
    nome_fantasia: "SUL AMÉRICA SAÚDE", 
    modalidade: "Seguradora Especializada em Saúde",
    relevance: 0.87
  },
  { 
    registro_ans: "343889", 
    cnpj: "42580568000109", 
    razao_social: "UNIMED-BELO HORIZONTE COOPERATIVA DE TRABALHO MEDICO", 
    nome_fantasia: "UNIMED BH", 
    modalidade: "Cooperativa Médica",
    relevance: 0.84
  }
];

// Sample API documentation
const apiDocumentation = `
# API de Busca de Operadoras

## Endpoint: /api/operadoras/busca

Realiza busca textual na lista de operadoras ativas.

### Método: GET

### Parâmetros de consulta:
- \`q\` (obrigatório): Termo de busca
- \`limit\` (opcional): Número máximo de resultados (padrão: 10)
- \`min_relevance\` (opcional): Relevância mínima entre 0 e 1 (padrão: 0.5)

### Exemplo de requisição:
\`\`\`
GET /api/operadoras/busca?q=bradesco&limit=5&min_relevance=0.7
\`\`\`

### Exemplo de resposta:
\`\`\`json
{
  "results": [
    {
      "registro_ans": "335339",
      "cnpj": "02933479000190",
      "razao_social": "BRADESCO SAUDE S.A.",
      "nome_fantasia": "BRADESCO SAÚDE",
      "modalidade": "Seguradora Especializada em Saúde",
      "relevance": 0.95
    }
  ],
  "meta": {
    "total": 1,
    "term": "bradesco",
    "limit": 5,
    "min_relevance": 0.7
  }
}
\`\`\`
`;

// Sample Python server code
const pythonServerCode = `
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
from fuzzywuzzy import process, fuzz

app = Flask(__name__)
CORS(app)

# Carregar dados das operadoras
def load_operadoras():
    df = pd.read_csv('operadoras_ativas.csv', encoding='latin1', sep=';')
    return df

# Converter dataframe para lista de dicionários
operadoras_df = load_operadoras()
operadoras = operadoras_df.to_dict('records')

@app.route('/api/operadoras/busca', methods=['GET'])
def busca_operadoras():
    # Parâmetros da consulta
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    min_relevance = float(request.args.get('min_relevance', 0.5))
    
    if not query:
        return jsonify({
            'error': 'Parâmetro de busca "q" é obrigatório',
            'status': 400
        }), 400
    
    # Realizar busca com FuzzyWuzzy
    search_fields = ['razao_social', 'nome_fantasia', 'registro_ans', 'cnpj']
    results = []
    
    for operadora in operadoras:
        # Concatenar campos de busca
        search_text = ' '.join([str(operadora.get(field, '')) for field in search_fields])
        
        # Calcular relevância
        relevance = fuzz.token_set_ratio(query.lower(), search_text.lower()) / 100
        
        if relevance >= min_relevance:
            result = {**operadora, 'relevance': relevance}
            results.append(result)
    
    # Ordenar por relevância
    results = sorted(results, key=lambda x: x['relevance'], reverse=True)[:limit]
    
    return jsonify({
        'results': results,
        'meta': {
            'total': len(results),
            'term': query,
            'limit': limit,
            'min_relevance': min_relevance
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
`;

export default function ApiPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState(sampleResults);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        variant: "destructive",
        title: "Termo de busca vazio",
        description: "Por favor, insira um termo para realizar a busca.",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search process
    setTimeout(() => {
      setIsSearching(false);
      setHasResults(true);
      // Filter sample results to simulate search
      const filtered = sampleResults.filter(
        item => item.razao_social.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.nome_fantasia.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : sampleResults);
      
      toast({
        title: "Busca concluída",
        description: `Encontrado(s) ${filtered.length > 0 ? filtered.length : 5} resultado(s) para "${searchTerm}"`,
      });
    }, 1500);
  };
  
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
            <h1 className="heading-lg mb-4">API e Interface Web</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Interface para busca textual de operadoras de saúde e documentação da API.
            </p>
          </motion.div>
          
          <Tabs defaultValue="interface" className="mt-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="interface">Interface</TabsTrigger>
              <TabsTrigger value="api-docs">Documentação API</TabsTrigger>
              <TabsTrigger value="server-code">Código Servidor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interface" className="mt-0">
              <Card className="glass-card mb-8">
                <CardHeader>
                  <CardTitle>Busca de Operadoras</CardTitle>
                  <CardDescription>
                    Realize buscas textuais na lista de operadoras ativas na ANS.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Digite o nome da operadora..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button onClick={handleSearch} disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                        </>
                      ) : (
                        <>Buscar</>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <button 
                      onClick={() => setSearchTerm("bradesco")}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      bradesco
                    </button>
                    <button 
                      onClick={() => setSearchTerm("unimed")}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      unimed
                    </button>
                    <button 
                      onClick={() => setSearchTerm("amil")}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      amil
                    </button>
                    <button 
                      onClick={() => setSearchTerm("sul america")}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      sul america
                    </button>
                  </div>
                </CardContent>
              </Card>
              
              {hasResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Resultados da Busca</CardTitle>
                      <CardDescription>
                        Exibindo {results.length} operadoras mais relevantes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>REGISTRO ANS</TableHead>
                              <TableHead>RAZÃO SOCIAL</TableHead>
                              <TableHead>NOME FANTASIA</TableHead>
                              <TableHead>MODALIDADE</TableHead>
                              <TableHead>RELEVÂNCIA</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {results.map((result, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{result.registro_ans}</TableCell>
                                <TableCell>{result.razao_social}</TableCell>
                                <TableCell>{result.nome_fantasia}</TableCell>
                                <TableCell>{result.modalidade}</TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                      <div 
                                        className="h-full bg-primary rounded-full" 
                                        style={{ width: `${result.relevance * 100}%` }}
                                      ></div>
                                    </div>
                                    <span>{Math.round(result.relevance * 100)}%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
            
            <TabsContent value="api-docs" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Documentação da API</CardTitle>
                    <CardDescription>
                      Especificação dos endpoints disponíveis
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" /> Postman Collection
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto">
                      <code>{apiDocumentation}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="server-code" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Código do Servidor Python</CardTitle>
                    <CardDescription>
                      Implementação do servidor Flask para a API de busca
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Code className="mr-2 h-4 w-4" /> Download Código
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto">
                      <code>{pythonServerCode}</code>
                    </pre>
                  </div>
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
