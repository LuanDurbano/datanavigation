
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";

export const PythonCodeSample = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Código Python para Transformação de Dados</CardTitle>
        <CardDescription>
          Implementação da extração de dados do PDF e conversão para CSV.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto">
          <code>{`
import tabula
import pandas as pd
import zipfile
import os
import re

# 2.1 Extrair dados da tabela do PDF
def extract_tables_from_pdf(pdf_path):
    # Usando tabula-py para extrair tabelas do PDF
    print("Extraindo tabelas do PDF...")
    tables = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)
    
    # Identificar e processar a tabela do Rol de Procedimentos
    rol_tables = []
    for table in tables:
        # Verificar se é a tabela que queremos (checando colunas específicas)
        if 'PROCEDIMENTO' in table.columns or any('PROCED' in col for col in table.columns):
            rol_tables.append(table)
    
    # Concatenar todas as tabelas encontradas
    if rol_tables:
        combined_table = pd.concat(rol_tables, ignore_index=True)
        print(f"Encontradas {len(rol_tables)} tabelas com dados do Rol de Procedimentos.")
        return combined_table
    else:
        print("Não foi possível encontrar a tabela do Rol de Procedimentos.")
        return None

# 2.2 Salvar os dados em formato CSV
def save_as_csv(dataframe, output_path):
    dataframe.to_csv(output_path, index=False, encoding='utf-8-sig')
    print(f"Dados salvos em {output_path}")

# 2.4 Substituir abreviações
def replace_abbreviations(dataframe):
    # Verificar se existem colunas 'OD' e 'AMB'
    if 'OD' in dataframe.columns:
        dataframe.rename(columns={'OD': 'SEGMENTAÇÃO ASSISTENCIAL'}, inplace=True)
        # Substituir valores conforme legenda
        dataframe['SEGMENTAÇÃO ASSISTENCIAL'] = dataframe['SEGMENTAÇÃO ASSISTENCIAL'].replace({
            'AMB': 'AMBULATORIAL',
            'HOS': 'HOSPITALAR',
            'OD': 'ODONTOLÓGICO',
            'AMB + HOS': 'AMBULATORIAL E HOSPITALAR'
        })
    
    # Caso existam outras colunas com abreviações, tratar aqui
    print("Abreviações substituídas por descrições completas.")
    return dataframe

# 2.3 Compactar o CSV
def compress_csv(csv_path, output_zip):
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(csv_path, os.path.basename(csv_path))
    print(f"CSV compactado em {output_zip}")

# Processo completo
def process_pdf_to_csv(pdf_path, output_name, replace_abbr=True):
    # Extrair dados
    data = extract_tables_from_pdf(pdf_path)
    
    if data is not None:
        # Substituir abreviações se solicitado
        if replace_abbr:
            data = replace_abbreviations(data)
        
        # Salvar como CSV
        csv_path = f"{output_name}.csv"
        save_as_csv(data, csv_path)
        
        # Compactar CSV
        zip_path = f"Teste_Seu_Nome.zip"
        compress_csv(csv_path, zip_path)
        
        return True
    return False

# Exemplo de uso
if __name__ == "__main__":
    pdf_path = "Anexo_I.pdf"  # PDF baixado na tarefa 1
    output_name = "Rol_Procedimentos"
    success = process_pdf_to_csv(pdf_path, output_name)
    
    if success:
        print("Processo de transformação concluído com sucesso!")
    else:
        print("Erro no processo de transformação.")
`}</code>
        </pre>
      </CardContent>
    </Card>
  );
};
