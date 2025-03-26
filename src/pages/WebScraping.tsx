
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Download, FileDown, PackageOpen, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function WebScraping() {
  const { toast } = useToast();
  const [isScrapingAnnex1, setIsScrapingAnnex1] = useState(false);
  const [isScrapingAnnex2, setIsScrapingAnnex2] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [annexes, setAnnexes] = useState<{name: string, downloaded: boolean}[]>([
    { name: "Anexo I - Rol de Procedimentos e Eventos em Saúde", downloaded: false },
    { name: "Anexo II - Diretrizes de Utilização", downloaded: false }
  ]);
  
  // Na aplicação real, isso seria implementado com Python/Java para fazer o scraping
  const handleScrapeAnnex1 = () => {
    setIsScrapingAnnex1(true);
    
    // Simulação do processo de scraping
    setTimeout(() => {
      setIsScrapingAnnex1(false);
      const updatedAnnexes = [...annexes];
      updatedAnnexes[0].downloaded = true;
      setAnnexes(updatedAnnexes);
      
      toast({
        title: "Download concluído",
        description: "Anexo I foi baixado com sucesso.",
      });
    }, 2000);
  };
  
  const handleScrapeAnnex2 = () => {
    setIsScrapingAnnex2(true);
    
    // Simulação do processo de scraping
    setTimeout(() => {
      setIsScrapingAnnex2(false);
      const updatedAnnexes = [...annexes];
      updatedAnnexes[1].downloaded = true;
      setAnnexes(updatedAnnexes);
      
      toast({
        title: "Download concluído",
        description: "Anexo II foi baixado com sucesso.",
      });
    }, 2000);
  };
  
  const handleZipFiles = () => {
    if (!annexes[0].downloaded || !annexes[1].downloaded) {
      toast({
        variant: "destructive",
        title: "Erro ao compactar",
        description: "Por favor, baixe todos os anexos antes de compactar.",
      });
      return;
    }
    
    setIsZipping(true);
    
    // Simulação do processo de compactação
    setTimeout(() => {
      setIsZipping(false);
      
      toast({
        title: "Compactação concluída",
        description: "Os anexos foram compactados com sucesso.",
      });
    }, 2000);
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
            <h1 className="heading-lg mb-4">Teste de Web Scraping</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Acesso ao site da ANS para download e compactação dos Anexos I e II em formato PDF.
            </p>
          </motion.div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Implementação do Web Scraping</CardTitle>
              <CardDescription>
                Acesso ao site da ANS, download de anexos e compactação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">1. Acesso ao site da ANS</h3>
                  <p className="text-muted-foreground mb-4">
                    URL: https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos
                  </p>
                  <Button>
                    <FileDown className="mr-2 h-4 w-4" /> Visitar Site
                  </Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">2. Download dos Anexos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium">{annexes[0].name}</p>
                        <p className="text-sm text-muted-foreground">Formato: PDF</p>
                      </div>
                      <Button 
                        onClick={handleScrapeAnnex1} 
                        disabled={isScrapingAnnex1 || annexes[0].downloaded}
                      >
                        {isScrapingAnnex1 ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Baixando...
                          </>
                        ) : annexes[0].downloaded ? (
                          <>
                            <Download className="mr-2 h-4 w-4" /> Baixado
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" /> Baixar
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium">{annexes[1].name}</p>
                        <p className="text-sm text-muted-foreground">Formato: PDF</p>
                      </div>
                      <Button 
                        onClick={handleScrapeAnnex2} 
                        disabled={isScrapingAnnex2 || annexes[1].downloaded}
                      >
                        {isScrapingAnnex2 ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Baixando...
                          </>
                        ) : annexes[1].downloaded ? (
                          <>
                            <Download className="mr-2 h-4 w-4" /> Baixado
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" /> Baixar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">3. Compactação dos Anexos</h3>
                  <p className="text-muted-foreground mb-4">
                    Compacte os anexos baixados em um único arquivo ZIP.
                  </p>
                  <Button 
                    onClick={handleZipFiles} 
                    disabled={isZipping || !annexes[0].downloaded || !annexes[1].downloaded}
                  >
                    {isZipping ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compactando...
                      </>
                    ) : (
                      <>
                        <PackageOpen className="mr-2 h-4 w-4" /> Compactar Anexos
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Código Python para Web Scraping</CardTitle>
              <CardDescription>
                Implementação do scraping em Python.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-slate-950 text-white rounded-md overflow-auto">
                <code>{`
import requests
from bs4 import BeautifulSoup
import zipfile
import os

# 1.1 Acesso ao site
url = "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# 1.2 Localizar e baixar os anexos
def download_pdf(pdf_url, filename):
    pdf_response = requests.get(pdf_url)
    with open(filename, 'wb') as f:
        f.write(pdf_response.content)
    print(f"Downloaded {filename}")

# Função para encontrar links dos PDFs no site
def find_pdf_links(soup):
    links = []
    # Esta é uma implementação fictícia - na prática, precisaríamos inspecionar o site
    # e usar os seletores corretos para encontrar os PDFs
    for a in soup.find_all('a', href=True):
        if "anexo-i" in a['href'].lower() and a['href'].endswith('.pdf'):
            links.append(("Anexo_I.pdf", a['href']))
        if "anexo-ii" in a['href'].lower() and a['href'].endswith('.pdf'):
            links.append(("Anexo_II.pdf", a['href']))
    return links

# Baixar os PDFs
pdf_links = find_pdf_links(soup)
for filename, url in pdf_links:
    download_pdf(url, filename)

# 1.3 Compactar os anexos
def compress_files(filenames, output_filename):
    with zipfile.ZipFile(output_filename, 'w') as zipf:
        for file in filenames:
            zipf.write(file, compress_type=zipfile.ZIP_DEFLATED)
    print(f"Created {output_filename}")

compress_files(["Anexo_I.pdf", "Anexo_II.pdf"], "Anexos_ANS.zip")
`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
