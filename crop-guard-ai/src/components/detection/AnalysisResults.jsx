import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  Bug, 
  Leaf, 
  Shield, 
  Camera,
  TrendingUp,
  ExternalLink,
  Lightbulb
} from "lucide-react";

const severityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200"
};

export default function AnalysisResults({ results, onNewDetection, onViewHistory }) {
  const isPestDetected = results.pest_detected;
  const confidenceLevel = results.confidence_score || 0;
  

  
  return (
    <div className="space-y-6">
      
      {/* Main Results Card */}
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
            {isPestDetected ? (
              <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            ) : (
              <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl mb-2">
            {isPestDetected ? 'Disease Detected!' : 'Healthy Crops Detected'}
          </CardTitle>
          
          <p className="text-gray-600">
            {isPestDetected 
              ? 'Our AI has identified potential disease in your crop image.'
              : 'Great news! No disease detected in this image.'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Image Display */}
          <div className="flex justify-center">
            <div className="relative inline-block">
              <img 
                src={results.image_url} 
                alt="Analyzed crop" 
                className="max-w-sm max-h-64 object-contain rounded-lg border-2 border-gray-200"
              />
              <a
                href={results.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {isPestDetected && (
            <>
              {/* Detection Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Detected Disease
                    </h3>
                    <p className="text-lg font-medium text-red-700">{results.pest_name}</p>
                  </div>
                  
                  {results.crop_type && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        Affected Crop
                      </h3>
                      <p className="text-gray-700">{results.crop_type}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Confidence & Severity</h3>
                    <div className="space-y-2">
                      <Badge variant="outline" className="mr-2">
                        {Math.round(confidenceLevel)}% Confidence
                      </Badge>
                      <Badge className={`${severityColors[results.severity_level]} border`}>
                        {results.severity_level} Severity
                      </Badge>
                    </div>
                  </div>
                  
                  {results.immediate_action_needed && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Immediate action recommended to prevent crop damage.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Damage Description */}
              {results.damage_description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Damage Assessment</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {results.damage_description}
                  </p>
                </div>
              )}

              {/* Treatment Recommendations */}
              {results.treatment_recommendation && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Recommended Treatment
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-blue-900">{results.treatment_recommendation}</p>
                  </div>
                </div>
              )}

              {/* Prevention Tips */}
              {results.prevention_tips && results.prevention_tips.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Prevention Tips
                  </h3>
                  <ul className="space-y-2">
                    {results.prevention_tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {!isPestDetected && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900 mb-2">Crops Look Healthy!</h3>
              <p className="text-green-700">
                Continue regular monitoring and maintain good agricultural practices to keep your crops pest-free.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-gray-100">
            <Button
              onClick={onNewDetection}
              className="bg-green-600 hover:bg-green-700"
            >
              <Camera className="w-4 h-4 mr-2" />
              Scan Another Image
            </Button>
            
            <Button
              variant="outline"
              onClick={onViewHistory}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Detection History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}