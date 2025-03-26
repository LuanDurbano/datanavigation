
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";

export const SqlSampleCode = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Scripts SQL para o Teste de Banco de Dados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Criação de Tabelas</h3>
            <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto text-sm">
              <code>{`
-- Criação da tabela de operadoras
CREATE TABLE operadoras (
    registro_ans VARCHAR(20) PRIMARY KEY,
    cnpj VARCHAR(14) NOT NULL,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    modalidade VARCHAR(100),
    logradouro VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep VARCHAR(10),
    ddd VARCHAR(5),
    telefone VARCHAR(20),
    email VARCHAR(100),
    representante VARCHAR(255),
    cargo_representante VARCHAR(100),
    data_registro_ans DATE
);

-- Criação da tabela de demonstrações contábeis
CREATE TABLE demonstracoes_contabeis (
    id SERIAL PRIMARY KEY,
    registro_ans VARCHAR(20) REFERENCES operadoras(registro_ans),
    data_demonstracao DATE NOT NULL,
    codigo_conta VARCHAR(20),
    descricao TEXT,
    vl_saldo_inicial NUMERIC(15,2),
    vl_saldo_final NUMERIC(15,2),
    trimestre INTEGER,
    ano INTEGER,
    CONSTRAINT unique_demonstracao 
        UNIQUE (registro_ans, data_demonstracao, codigo_conta)
);

-- Criação de índices para melhorar performance
CREATE INDEX idx_operadoras_razao_social ON operadoras(razao_social);
CREATE INDEX idx_demonstracoes_data ON demonstracoes_contabeis(data_demonstracao);
CREATE INDEX idx_demonstracoes_codigo ON demonstracoes_contabeis(codigo_conta);
CREATE INDEX idx_demonstracoes_descricao ON demonstracoes_contabeis(descricao);
`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Importação de Dados</h3>
            <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto text-sm">
              <code>{`
-- Importação dos dados de operadoras (utiliza o comando COPY do PostgreSQL)
-- Assumindo que o arquivo CSV está em um formato adequado
COPY operadoras(
    registro_ans, cnpj, razao_social, nome_fantasia, modalidade,
    logradouro, numero, complemento, bairro, cidade, uf, cep,
    ddd, telefone, email, representante, cargo_representante, data_registro_ans
)
FROM '/caminho/para/operadoras.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'LATIN1';

-- Para MySQL, a importação seria feita com LOAD DATA
-- LOAD DATA INFILE '/caminho/para/operadoras.csv'
-- INTO TABLE operadoras
-- FIELDS TERMINATED BY ';'
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES;

-- Importação das demonstrações contábeis
-- Este é um processo que precisa ser feito para cada arquivo
-- Exemplo para um arquivo:
COPY demonstracoes_contabeis(
    registro_ans, data_demonstracao, codigo_conta, descricao,
    vl_saldo_inicial, vl_saldo_final
)
FROM '/caminho/para/demonstracoes_1T_2022.csv'
DELIMITER ';'
CSV HEADER
ENCODING 'LATIN1';

-- Atualizar os campos de trimestre e ano
UPDATE demonstracoes_contabeis
SET 
    trimestre = EXTRACT(QUARTER FROM data_demonstracao),
    ano = EXTRACT(YEAR FROM data_demonstracao)
WHERE trimestre IS NULL OR ano IS NULL;
`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Consultas Analíticas</h3>
            <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto text-sm">
              <code>{`
-- Query 1: 10 operadoras com maiores despesas em "EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS
-- DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR" no último trimestre
SELECT 
    o.razao_social,
    COALESCE(d.vl_saldo_final, 0) as despesa_eventos
FROM 
    operadoras o
LEFT JOIN demonstracoes_contabeis d ON o.registro_ans = d.registro_ans
WHERE 
    d.data_demonstracao = (
        SELECT MAX(data_demonstracao) 
        FROM demonstracoes_contabeis
    )
    AND d.descricao = 'EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR'
ORDER BY 
    despesa_eventos DESC
LIMIT 10;

-- Query 2: 10 operadoras com maiores despesas nessa categoria no último ano
SELECT 
    o.razao_social,
    SUM(COALESCE(d.vl_saldo_final, 0)) as despesa_eventos_anual
FROM 
    operadoras o
LEFT JOIN demonstracoes_contabeis d ON o.registro_ans = d.registro_ans
WHERE 
    d.ano = (
        SELECT MAX(ano) 
        FROM demonstracoes_contabeis
    )
    AND d.descricao = 'EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR'
GROUP BY
    o.razao_social
ORDER BY 
    despesa_eventos_anual DESC
LIMIT 10;
`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Processo de ETL Completo em Python</h3>
            <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto text-sm">
              <code>{`
import os
import pandas as pd
import urllib.request
import zipfile
import psycopg2
import ftplib
from io import BytesIO

# Conexão com o banco de dados
def connect_to_db():
    conn = psycopg2.connect(
        host="localhost",
        database="ans_data",
        user="postgres",
        password="senha"
    )
    return conn

# Download dos dados de operadoras
def download_operadoras_data():
    url = "https://dadosabertos.ans.gov.br/FTP/PDA/operadoras_de_plano_de_saude_ativas/operadoras_ativas.csv"
    print(f"Baixando dados de operadoras de {url}...")
    urllib.request.urlretrieve(url, "operadoras_ativas.csv")
    print("Download concluído.")

# Download dos dados de demonstrações contábeis
def download_demonstracoes_contabeis(years):
    ftp = ftplib.FTP("ftp.dadosabertos.ans.gov.br")
    ftp.login()
    ftp.cwd("/FTP/PDA/demonstracoes_contabeis/")
    
    for year in years:
        print(f"Baixando demonstrações contábeis do ano {year}...")
        files = []
        ftp.retrlines(f'NLST *{year}*', files.append)
        
        for file in files:
            print(f"Baixando {file}...")
            with open(file, 'wb') as fp:
                ftp.retrbinary(f'RETR {file}', fp.write)
    
    ftp.quit()
    print("Downloads concluídos.")

# Processamento dos dados e importação para o banco
def process_and_import_data():
    conn = connect_to_db()
    cur = conn.cursor()
    
    # Importar operadoras
    print("Processando dados de operadoras...")
    df_operadoras = pd.read_csv(
        "operadoras_ativas.csv", 
        encoding='latin1', 
        sep=';'
    )
    
    # Limpar e preparar dados
    # ... código para limpeza e transformação
    
    # Importar para o banco
    for _, row in df_operadoras.iterrows():
        # ... código para inserção de dados
        pass
    
    # Processar demonstrações contábeis
    for file in os.listdir():
        if file.startswith("demonstracoes") and file.endswith(".csv"):
            print(f"Processando {file}...")
            df_demo = pd.read_csv(file, encoding='latin1', sep=';')
            
            # Limpar e preparar dados
            # ... código para limpeza e transformação
            
            # Importar para o banco
            for _, row in df_demo.iterrows():
                # ... código para inserção de dados
                pass
    
    conn.commit()
    cur.close()
    conn.close()
    print("Importação concluída com sucesso!")

# Executar o processo completo
if __name__ == "__main__":
    # 3.1 e 3.2: Download dos dados
    download_operadoras_data()
    download_demonstracoes_contabeis([2021, 2022])
    
    # 3.3 a 3.5: Processamento e importação
    process_and_import_data()
    
    print("Processo de ETL concluído!")
`}</code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
