
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { ExternalLink, Code } from "lucide-react";

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

// Sample Vue.js frontend code
const vueJsCode = `
<template>
  <div class="operadora-search">
    <div class="search-container">
      <input 
        v-model="searchTerm" 
        @keyup.enter="searchOperadoras"
        placeholder="Digite o nome da operadora..." 
        class="search-input"
      />
      <button @click="searchOperadoras" :disabled="isLoading" class="search-button">
        <span v-if="isLoading">Buscando...</span>
        <span v-else>Buscar</span>
      </button>
    </div>
    
    <div v-if="results.length > 0" class="results-container">
      <h2>Resultados da Busca</h2>
      <table class="results-table">
        <thead>
          <tr>
            <th>Registro ANS</th>
            <th>Razão Social</th>
            <th>Nome Fantasia</th>
            <th>Modalidade</th>
            <th>Relevância</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ result.registro_ans }}</td>
            <td>{{ result.razao_social }}</td>
            <td>{{ result.nome_fantasia }}</td>
            <td>{{ result.modalidade }}</td>
            <td>
              <div class="relevance-bar">
                <div class="relevance-fill" :style="{ width: (result.relevance * 100) + '%' }"></div>
              </div>
              {{ Math.round(result.relevance * 100) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else-if="searched" class="no-results">
      Nenhum resultado encontrado para "{{ searchTerm }}"
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      results: [],
      isLoading: false,
      searched: false
    }
  },
  methods: {
    async searchOperadoras() {
      if (!this.searchTerm.trim()) return;
      
      this.isLoading = true;
      this.searched = true;
      
      try {
        const response = await fetch(\`http://localhost:5000/api/operadoras/busca?q=\${encodeURIComponent(this.searchTerm)}&limit=10&min_relevance=0.5\`);
        const data = await response.json();
        
        this.results = data.results;
      } catch (error) {
        console.error('Erro ao buscar operadoras:', error);
        this.results = [];
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.operadora-search {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.search-button {
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.search-button:disabled {
  background-color: #a5a5a5;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
}

.results-table th, .results-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.results-table th {
  background-color: #f2f2f2;
}

.relevance-bar {
  width: 100px;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
  display: inline-block;
  margin-right: 10px;
}

.relevance-fill {
  height: 100%;
  background-color: #4f46e5;
  border-radius: 5px;
}

.no-results {
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 4px;
}
</style>
`;

export const ApiDocumentation = () => {
  return (
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
  );
};

export const ServerCode = () => {
  return (
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
  );
};

export const VueJsCode = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Interface Vue.js</CardTitle>
          <CardDescription>
            Implementação da interface web com Vue.js
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Code className="mr-2 h-4 w-4" /> Download Código
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto">
            <code>{vueJsCode}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
