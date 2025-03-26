
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, FileText, FileX, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const BatchProcessor = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [outputFolderName, setOutputFolderName] = useState("Output_Processados");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).filter(file => file.type === "application/pdf");
      if (fileArray.length > 0) {
        setFiles(prev => [...prev, ...fileArray]);
      } else {
        toast({
          variant: "destructive",
          title: "Formato inválido",
          description: "Por favor, selecione apenas arquivos PDF.",
        });
      }
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione pelo menos um arquivo PDF para upload.",
      });
      return;
    }
    
    setIsUploading(true);
    setProgress(0);
    
    // Simulação do upload
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload concluído",
            description: `${files.length} arquivos enviados com sucesso.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleProcessBatch = () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo para processar",
        description: "Por favor, faça upload dos arquivos PDF antes de processar.",
      });
      return;
    }
    
    setIsProcessing(true);
    setProcessedCount(0);
    setProgress(0);
    
    // Simulação do processamento em lote
    const totalFiles = files.length;
    let processed = 0;
    
    const interval = setInterval(() => {
      if (processed < totalFiles) {
        processed++;
        setProcessedCount(processed);
        setProgress((processed / totalFiles) * 100);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        toast({
          title: "Processamento em lote concluído",
          description: `${totalFiles} arquivos processados e convertidos para CSV.`,
        });
      }
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Upload de Múltiplos PDFs</CardTitle>
          <CardDescription>
            Selecione múltiplos arquivos PDF para processamento em lote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-4">
            <Upload className="mx-auto h-10 w-10 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Arraste e solte múltiplos PDFs aqui, ou clique para selecionar
            </p>
            <div className="relative">
              <Input
                id="batch-file-upload"
                type="file"
                accept=".pdf"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <Button variant="outline" className="w-full">
                Selecionar arquivos
              </Button>
            </div>
          </div>
          
          {isUploading && (
            <div className="mb-4">
              <Label className="mb-2 block">Progresso do Upload</Label>
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-center text-muted-foreground">{progress}% Concluído</p>
            </div>
          )}
          
          {files.length > 0 && (
            <div className="space-y-2 mt-4 max-h-[250px] overflow-y-auto">
              <h4 className="text-sm font-medium mb-2">Arquivos selecionados ({files.length})</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(index)}
                    className="h-8 w-8"
                  >
                    <FileX className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <Button 
            onClick={handleUpload} 
            disabled={files.length === 0 || isUploading}
            className="w-full mt-4"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>Upload de {files.length} arquivo(s)</>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Processar em Lote</CardTitle>
          <CardDescription>
            Configure e inicie o processamento em lote dos PDFs para CSV.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output-folder">Nome da pasta de saída</Label>
              <Input 
                id="output-folder" 
                placeholder="Output_Processados" 
                value={outputFolderName}
                onChange={(e) => setOutputFolderName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="batch-replace-abbreviations" 
                  className="rounded" 
                  checked={true}
                  readOnly
                />
                <Label htmlFor="batch-replace-abbreviations">
                  Substituir abreviações (OD, AMB) por descrições completas
                </Label>
              </div>
            </div>
            
            {isProcessing && files.length > 0 && (
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Processando arquivos...</span>
                  <span>{processedCount}/{files.length}</span>
                </div>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-sm text-center text-muted-foreground">{progress.toFixed(0)}% Concluído</p>
              </div>
            )}
            
            <Button 
              onClick={handleProcessBatch} 
              disabled={files.length === 0 || isProcessing || isUploading}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                </>
              ) : (
                <>Processar {files.length} arquivo(s)</>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              disabled={!processedCount || isProcessing}
            >
              <Download className="mr-2 h-4 w-4" /> Baixar Resultados (ZIP)
            </Button>
            
            {processedCount > 0 && !isProcessing && (
              <div className="flex items-center justify-center text-center p-2 bg-green-50 text-green-600 rounded-md mt-2">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>{processedCount} arquivos processados com sucesso!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
