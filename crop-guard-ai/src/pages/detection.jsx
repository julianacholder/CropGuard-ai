import React, { useState, useRef } from "react";
// import { PestDetection } from "@/entities/PestDetection";
// import { InvokeLLM, UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Camera, 
  Upload, 
  ArrowLeft, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Bug,
  Leaf,
  Smartphone
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Badge } from "@/components/ui/badge";

import CameraCapture from "../components/detection/CameraCapture";
import FileUpload from "../components/detection/FileUpload";
import AnalysisResults from "../components/detection/AnalysisResults";

export default function Detection() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('upload'); // 'upload' or 'camera'
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)');
      return;
    }
    setSelectedFile(file);
    setError(null);
    setResults(null);
  };

  const handleCameraCapture = (file) => {
    setSelectedFile(file);
    setError(null);
    setResults(null);
    setMode('upload');
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    setError(null);

    try {
      // TODO: Implement when Core integration is ready
      
      /* COMMENTED OUT - CORE INTEGRATION NOT YET IMPLEMENTED
      // Upload the image first
      const { file_url } = await UploadFile({ file: selectedFile });

      // Analyze with AI
      const analysisResult = await InvokeLLM({
        prompt: `Analyze this agricultural image for pest detection. Look for insects, diseases, or signs of pest damage on crops or plants. 
        
        Provide detailed analysis including:
        1. Pest identification (if any pests are visible)
        2. Confidence level of detection
        3. Severity assessment 
        4. Affected crop type (if identifiable)
        5. Recommended treatment approach
        6. Prevention strategies
        
        If no pests are detected, indicate healthy crop status.`,
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            pest_detected: { type: "boolean" },
            pest_name: { type: "string" },
            confidence_score: { type: "number" },
            severity_level: { type: "string", enum: ["low", "moderate", "high", "critical"] },
            crop_type: { type: "string" },
            damage_description: { type: "string" },
            treatment_recommendation: { type: "string" },
            prevention_tips: { type: "array", items: { type: "string" } },
            immediate_action_needed: { type: "boolean" }
          }
        }
      });

      if (analysisResult.pest_detected) {
        // Save detection to database
        const detectionData = {
          image_url: file_url,
          detected_pest: analysisResult.pest_name,
          confidence_score: analysisResult.confidence_score,
          severity_level: analysisResult.severity_level,
          crop_type: analysisResult.crop_type,
          treatment_recommendation: analysisResult.treatment_recommendation,
          status: 'detected'
        };

        await PestDetection.create(detectionData);
      }

      setResults({
        ...analysisResult,
        image_url: file_url
      });
      */

      // TEMPORARY MOCK DATA FOR UI TESTING
      setTimeout(() => {
        const mockResults = {
          pest_detected: true,
          pest_name: "Aphids",
          confidence_score: 0.85,
          severity_level: "moderate",
          crop_type: "Tomato",
          damage_description: "Small green insects visible on leaf undersides causing yellowing",
          treatment_recommendation: "Apply insecticidal soap or neem oil spray",
          prevention_tips: [
            "Regular inspection of plants",
            "Encourage beneficial insects like ladybugs",
            "Avoid over-fertilizing with nitrogen"
          ],
          immediate_action_needed: true,
          image_url: URL.createObjectURL(selectedFile) // Use local blob URL for now
        };
        
        setResults(mockResults);
        setAnalyzing(false);
      }, 2000); // Simulate API delay

    } catch (error) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', error);
      setAnalyzing(false);
    }
  };

  const resetDetection = () => {
    setSelectedFile(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon" className="border-green-200 text-green-700 hover:bg-green-50">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-green-900">AI Pest Detection</h1>
            <p className="text-green-600 mt-1">Upload or capture an image of your crops for instant pest analysis</p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {!results && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl text-green-900">
                  <Bug className="w-7 h-7 text-green-600" />
                  Capture or Upload Image
                </CardTitle>
                <p className="text-green-600 mt-2">
                  Take a clear photo of affected crops or upload an existing image
                </p>
              </CardHeader>
              <CardContent>
                {/* Mode Selection */}
                <div className="flex gap-4 mb-8 justify-center">
                  <Button
                    variant={mode === 'upload' ? 'default' : 'outline'}
                    onClick={() => setMode('upload')}
                    className={mode === 'upload' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'border-green-200 text-green-700 hover:bg-green-50'
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button
                    variant={mode === 'camera' ? 'default' : 'outline'}
                    onClick={() => setMode('camera')}
                    className={mode === 'camera' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'border-green-200 text-green-700 hover:bg-green-50'
                    }
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Use Camera
                  </Button>
                </div>

                {mode === 'upload' ? (
                  <FileUpload 
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    fileInputRef={fileInputRef}
                  />
                ) : (
                  <CameraCapture onCapture={handleCameraCapture} />
                )}

                {selectedFile && (
                  <div className="mt-8 text-center">
                    <div className="inline-block p-4 bg-green-50 rounded-xl border border-green-200 mb-6">
                      <img 
                        src={URL.createObjectURL(selectedFile)} 
                        alt="Selected crop" 
                        className="max-w-xs max-h-64 object-contain rounded-lg"
                      />
                      <p className="text-sm text-green-700 mt-2 font-medium">{selectedFile.name}</p>
                    </div>
                    
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={analyzeImage}
                        disabled={analyzing}
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 min-w-32"
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Leaf className="w-5 h-5 mr-2" />
                            Analyze Image
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={resetDetection}
                        className="border-green-200 text-green-700 hover:bg-green-50"
                      >
                        Choose Different Image
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {results && (
            <AnalysisResults 
              results={results}
              onNewDetection={resetDetection}
              onViewHistory={() => navigate(createPageUrl("History"))}
            />
          )}
        </div>
      </div>
    </div>
  );
}