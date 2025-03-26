
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { FileUp, FileText, Download, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const PdfTransformer = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [shouldReplaceAbbreviations, setShouldReplaceAbbreviations] = useState(true);
  const [outputName, setOutputName] = useState("Rol_Procedimentos");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  
  const handleUpload = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione o arquivo PDF do Anexo I para prosseguir.",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulação do upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Arquivo enviado com sucesso",
        description: `${fileName} foi enviado e está pronto para processamento.`,
      });
    }, 1500);
  };
  
  const handleProcess = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione o arquivo PDF do Anexo I para prosseguir.",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulação do processamento
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Processamento concluído",
        description: `Os dados foram extraídos do PDF, convertidos para CSV e salvos como ${outputName}.csv`,
      });
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Upload de Arquivo</CardTitle>
          <CardDescription>
            Selecione o PDF do Anexo I - Rol de Procedimentos e Eventos em Saúde.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-4">
            <FileUp className="mx-auto h-10 w-10 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Arraste e solte o arquivo Anexo I (PDF) aqui, ou clique para selecionar
            </p>
            <div className="relative">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <Button variant="outline" className="w-full">
                Selecionar arquivo
              </Button>
            </div>
            {fileName && (
              <p className="mt-2 text-sm flex items-center justify-center text-primary">
                <Check className="h-4 w-4 mr-1" /> {fileName}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                <>Upload</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Extrair e Converter</CardTitle>
          <CardDescription>
            Extraia os dados da tabela do PDF e converta para CSV.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-name">Nome do arquivo de saída</Label>
              <Input 
                id="output-name" 
                placeholder="Rol_Procedimentos" 
                value={outputName}
                onChange={(e) => setOutputName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="replace-abbreviations" 
                  className="rounded" 
                  checked={shouldReplaceAbbreviations}
                  onChange={() => setShouldReplaceAbbreviations(!shouldReplaceAbbreviations)}
                />
                <Label htmlFor="replace-abbreviations">
                  Substituir abreviações (OD, AMB) por descrições completas
                </Label>
              </div>
            </div>
            
            <Button 
              onClick={handleProcess} 
              disabled={!file || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                </>
              ) : (
                <>Processar</>
              )}
            </Button>
            
            <Button variant="outline" className="w-full" disabled={!file || isProcessing}>
              <Download className="mr-2 h-4 w-4" /> Baixar CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
