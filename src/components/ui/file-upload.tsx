"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  X, 
  Image, 
  Video, 
  FileText, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  onRemove?: (file: File) => void;
  acceptedTypes?: 'image' | 'video' | 'document' | 'all';
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // MB
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onUpload,
  onRemove,
  acceptedTypes = 'all',
  multiple = true,
  maxFiles = 10,
  maxSize = 50,
  className,
  disabled = false
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAcceptedFileTypes = () => {
    switch (acceptedTypes) {
      case 'image':
        return {
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'image/webp': ['.webp']
        };
      case 'video':
        return {
          'video/mp4': ['.mp4'],
          'video/avi': ['.avi'],
          'video/mov': ['.mov'],
          'video/wmv': ['.wmv']
        };
      case 'document':
        return {
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        };
      default:
        return {
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'image/webp': ['.webp'],
          'video/mp4': ['.mp4'],
          'video/avi': ['.avi'],
          'video/mov': ['.mov'],
          'video/wmv': ['.wmv'],
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        };
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    // Dosya boyutu kontrolü
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`${maxSize}MB'dan büyük dosyalar yüklenemez`);
      return;
    }

    // Maksimum dosya sayısı kontrolü
    if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
      setError(`Maksimum ${maxFiles} dosya yükleyebilirsiniz`);
      return;
    }

    const newFiles = [...uploadedFiles, ...acceptedFiles];
    setUploadedFiles(newFiles);
    onUpload(acceptedFiles);
  }, [uploadedFiles, maxFiles, maxSize, onUpload]);

  const removeFile = (fileToRemove: File) => {
    const newFiles = uploadedFiles.filter(file => file !== fileToRemove);
    setUploadedFiles(newFiles);
    onRemove?.(fileToRemove);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    multiple,
    disabled
  });

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    } else if (file.type.startsWith('video/')) {
      return <Video className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-gray-400",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          {isDragActive
            ? "Dosyaları buraya bırakın..."
            : "Dosyaları sürükleyip bırakın veya tıklayarak seçin"}
        </p>
        <p className="text-xs text-gray-500">
          Maksimum {maxSize}MB, {maxFiles} dosya
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Yüklenen Dosyalar</h4>
          <div className="grid gap-2">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Yükleniyor...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}
    </div>
  );
}
