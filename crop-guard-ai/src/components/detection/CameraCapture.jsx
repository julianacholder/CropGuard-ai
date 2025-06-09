import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X, RotateCcw, Smartphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CameraCapture({ onCapture }) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStreaming(true);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please check permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !isStreaming) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], `crop-scan-${Date.now()}.jpg`, { 
        type: 'image/jpeg' 
      });
      onCapture(file);
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  useEffect(() => {
    if (facingMode && !isStreaming) {
      startCamera();
    }
  }, [facingMode]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden bg-gray-900">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] bg-gray-800">
            {isStreaming ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Camera Loading...</p>
                  <p className="text-sm">Please allow camera access</p>
                </div>
              </div>
            )}
            
            {isStreaming && (
              <div className="absolute inset-0">
                {/* Camera overlay guides */}
                <div className="absolute inset-8 border-2 border-white/30 rounded-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>
                </div>
                
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-medium">
                    Position affected crop within frame
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={switchCamera}
          disabled={!isStreaming}
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          <Smartphone className="w-4 h-4 mr-2" />
          Switch Camera
        </Button>
        
        <Button
          onClick={capturePhoto}
          disabled={!isStreaming}
          size="lg"
          className="bg-green-600 hover:bg-green-700 px-8"
        >
          <Camera className="w-5 h-5 mr-2" />
          Capture Photo
        </Button>
        
        <Button
          variant="outline"
          onClick={stopCamera}
          disabled={!isStreaming}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
}