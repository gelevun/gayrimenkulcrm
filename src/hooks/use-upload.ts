import { useState } from 'react';
import axios from 'axios';

export interface UploadResponse {
  success: boolean;
  data: {
    filename: string;
    originalName: string;
    filePath: string;
    fileType: string;
    mimeType: string;
    size: number;
    propertyId?: string;
    isPrimary: boolean;
  };
  message: string;
}

export interface UploadError {
  error: string;
}

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    type: 'image' | 'video' | 'document',
    propertyId?: string | null
  ): Promise<UploadResponse | null> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      if (propertyId && propertyId.trim() !== '') {
        formData.append('propertyId', propertyId);
      }

      const response = await axios.post<UploadResponse>('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        },
      });

      setUploadProgress(100);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Dosya yüklenirken hata oluştu';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultipleFiles = async (
    files: File[],
    type: 'image' | 'video' | 'document',
    propertyId?: string | null
  ): Promise<UploadResponse[]> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    const results: UploadResponse[] = [];
    const totalFiles = files.length;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await uploadFile(file, type, propertyId);
        
        if (result) {
          results.push(result);
        }

        // Progress hesapla
        const progress = Math.round(((i + 1) / totalFiles) * 100);
        setUploadProgress(progress);
      }

      return results;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Dosyalar yüklenirken hata oluştu';
      setError(errorMessage);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    uploadProgress,
    error,
    resetUpload,
  };
};
