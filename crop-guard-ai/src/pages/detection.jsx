import React, { useState, useRef } from "react";
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

// Import the API service
import EnhancedPlantAnalysis from "../utils/EnhancedPlantAnalysis";

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

  // Updated analyzeImage function with real API integration
  const analyzeImage = async () => {
    // Add this at the top of analyzeImage function
console.log('🔍 Debug env vars:');
console.log('Roboflow:', import.meta.env.VITE_ROBOFLOW_API_KEY);
console.log('Groq:', import.meta.env.VITE_GROQ_API_KEY);
    if (!selectedFile) return;

    setAnalyzing(true);
    setError(null);

    try {
      console.log('🚀 Starting AI analysis...');
      
      // Initialize the API service
      const analyzer = new EnhancedPlantAnalysis();
      
      // Validate API keys first
      const keyErrors = analyzer.validateApiKeys();
      if (keyErrors.length > 0) {
        throw new Error(`Configuration error: ${keyErrors.join(' ')}`);
      }
      
      // Show progress updates
      console.log('🔍 Detecting diseases with Roboflow...');
      
      // Run complete analysis with both Roboflow and Groq
      const analysisResults = await analyzer.analyzeComplete(selectedFile);
      
      console.log('✅ Analysis completed:', analysisResults);
      
      // Format results for your AnalysisResults component
      const formattedResults = {
        pest_detected: analysisResults.pest_detected,
        pest_name: analysisResults.pest_name,
        confidence_score: analysisResults.confidence_score,
        severity_level: analysisResults.severity_level,
        crop_type: analysisResults.crop_type,
        damage_description: analysisResults.pest_detected 
          ? `${analysisResults.pest_name} detected with ${(analysisResults.confidence_score * 100).toFixed(1)}% confidence`
          : 'No disease symptoms detected in the plant',
        treatment_recommendation: analysisResults.treatment_recommendation,
        prevention_tips: analysisResults.prevention_tips,
        recovery_timeline: analysisResults.recovery_timeline,
        warning_signs: analysisResults.warning_signs,
        immediate_action_needed: analysisResults.immediate_action_needed,
        image_url: analysisResults.image_url,
        analysis_source: analysisResults.analysis_source,
        timestamp: analysisResults.timestamp
      };
      
      setResults(formattedResults);

    } catch (error) {
      console.error('❌ Analysis error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to analyze image. ';
      
      if (error.message.includes('Configuration error')) {
        errorMessage += 'Please check your API keys in the .env.local file.';
      } else if (error.message.includes('Roboflow')) {
        errorMessage += 'Disease detection service is unavailable. Please try again later.';
      } else if (error.message.includes('Groq')) {
        errorMessage += 'AI recommendation service is unavailable. Disease detection may still work.';
      } else {
        errorMessage += 'Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
      
    } finally {
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

  // Check if API keys are configured
  const checkApiConfiguration = () => {
  // Use import.meta.env for Vite or check if process exists
  const roboflowKey = typeof process !== 'undefined' 
    ? process.env.REACT_APP_ROBOFLOW_API_KEY 
    : import.meta.env.REACT_APP_ROBOFLOW_API_KEY;
    
  const groqKey = typeof process !== 'undefined' 
    ? process.env.REACT_APP_GROQ_API_KEY 
    : import.meta.env.REACT_APP_GROQ_API_KEY;

    // Add this at the very top of your analyzeImage function

  

  return null;
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
            <h1 className="text-3xl font-bold text-green-900">AI Crop Disease Detection</h1>
            <p className="text-green-600 mt-1">
              Upload or capture an image of your crops for instant AI-powered disease detection and treatment recommendations.
            </p>
           
          </div>
        </div>

        {/* API Configuration Check */}
        {checkApiConfiguration()}

        {/* Error Display */}
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
                <p className="text-sm text-green-500 mt-1">
                  AI will detect diseases and provide treatment recommendations
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
                            Analyzing with AI...
                          </>
                        ) : (
                          <>
                            <Leaf className="w-5 h-5 mr-2" />
                            Analyze with AI
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

                    {analyzing && (
                      <div className="mt-4 text-sm text-green-600">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Analyzing with AI...</span>
                        </div>
                        <div className="text-xs text-green-500 space-y-1">
                          <div>🔍 Detecting diseases with AI...</div>
                          <div>🤖 Generating recommendations with our AI...</div>
                        </div>
                      </div>
                    )}
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