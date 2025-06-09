import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Image, FileText } from "lucide-react";

export default function FileUpload({ onFileSelect, selectedFile, fileInputRef }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center bg-green-50/50 hover:bg-green-50 transition-colors duration-200"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Image className="w-10 h-10 text-green-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Upload Crop Image
        </h3>
        <p className="text-green-600 mb-6 max-w-md mx-auto">
          Drag and drop your image here, or click to browse files. 
          Best results with clear, well-lit photos of affected plants.
        </p>
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          <Upload className="w-5 h-5 mr-2" />
          Choose Image File
        </Button>
        
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-green-600">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            JPG, PNG, WEBP
          </div>
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <div>Max 10MB</div>
        </div>
      </div>
    </div>
  );
}