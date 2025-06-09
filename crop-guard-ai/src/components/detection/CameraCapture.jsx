import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X, RotateCcw, Smartphone, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CameraCapture({ onCapture }) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [permissionState, setPermissionState] = useState('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Check if device supports camera
  const checkCameraSupport = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera not supported on this device');
      return false;
    }
    return true;
  };

  // Check camera permissions
  const checkPermissions = async () => {
    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'camera' });
        setPermissionState(permission.state);
        
        permission.addEventListener('change', () => {
          setPermissionState(permission.state);
        });
      }
    } catch (err) {
      console.log('Permission check not supported');
    }
  };

  const startCamera = async () => {
    if (!checkCameraSupport()) return;
    
    try {
      setError(null);
      setIsLoading(true);
      
      // More mobile-friendly constraints
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { 
            min: 640, 
            ideal: 1280, 
            max: 1920 
          },
          height: { 
            min: 480, 
            ideal: 720, 
            max: 1080 
          },
          frameRate: { ideal: 30, max: 30 }
        },
        audio: false
      };

      console.log('Requesting camera with constraints:', constraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to load before showing as streaming
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true);
          setIsLoading(false);
          console.log('Camera started successfully');
        };
        
        videoRef.current.onerror = (e) => {
          console.error('Video element error:', e);
          setError('Failed to display camera feed');
          setIsLoading(false);
        };
      }
      
    } catch (err) {
      console.error('Camera error:', err);
      setIsLoading(false);
      
      // More specific error messages
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions and refresh the page.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else if (err.name === 'NotSupportedError') {
        setError('Camera not supported on this device.');
      } else if (err.name === 'OverconstrainedError') {
        setError('Camera constraints not supported. Trying fallback...');
        // Try with basic constraints
        startCameraFallback();
      } else {
        setError(`Camera error: ${err.message || 'Unknown error'}`);
      }
    }
  };

  // Fallback with minimal constraints for problematic devices
  const startCameraFallback = async () => {
    try {
      const basicConstraints = {
        video: { facingMode: facingMode },
        audio: false
      };
      
      console.log('Trying fallback constraints:', basicConstraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(basicConstraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true);
          setError(null);
        };
      }
    } catch (fallbackErr) {
      console.error('Fallback camera error:', fallbackErr);
      setError('Unable to access camera. Please check your device permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped camera track:', track.kind);
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsStreaming(false);
    setIsLoading(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !isStreaming) {
      console.error('Cannot capture: video not ready');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      
      // Ensure video has dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setError('Camera not ready. Please wait a moment and try again.');
        return;
      }
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `crop-scan-${Date.now()}.jpg`, { 
            type: 'image/jpeg' 
          });
          console.log('Photo captured:', file.size, 'bytes');
          onCapture(file);
          stopCamera();
        } else {
          setError('Failed to capture photo. Please try again.');
        }
      }, 'image/jpeg', 0.9);
      
    } catch (err) {
      console.error('Capture error:', err);
      setError('Failed to capture photo. Please try again.');
    }
  };

  const switchCamera = async () => {
    stopCamera();
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);
    
    // Small delay to ensure camera is fully stopped
    setTimeout(() => {
      startCamera();
    }, 500);
  };

  // Check permissions on mount
  useEffect(() => {
    checkPermissions();
  }, []);

  // Auto-start camera when facingMode changes
  useEffect(() => {
    if (facingMode && !isStreaming && !isLoading) {
      startCamera();
    }
  }, [facingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Show permission prompt for denied permissions
  if (permissionState === 'denied') {
    return (
      <div className="space-y-4">
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Camera Access Denied</strong><br />
            Please enable camera permissions in your browser settings and refresh the page.
            <br /><br />
            <strong>Mobile Instructions:</strong><br />
            • Chrome: Settings → Site Settings → Camera<br />
            • Safari: Settings → Safari → Camera<br />
            • Firefox: Settings → Permissions → Camera
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <br />
            <strong>Troubleshooting:</strong><br />
            • Ensure you're using HTTPS<br />
            • Check camera permissions<br />
            • Try refreshing the page<br />
            • On mobile: try switching cameras
          </AlertDescription>
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
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  {isLoading ? (
                    <>
                      <p className="text-lg font-medium">Starting Camera...</p>
                      <p className="text-sm">Please allow camera access</p>
                      <div className="mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-medium">Camera Ready</p>
                      <p className="text-sm">Click Start Camera to begin</p>
                    </>
                  )}
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

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-xs">
                    {facingMode === 'environment' ? '📷 Back' : '🤳 Front'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center gap-3">
        {!isStreaming && !isLoading && (
          <Button
            onClick={startCamera}
            className="bg-green-600 hover:bg-green-700 px-6"
          >
            <Camera className="w-4 h-4 mr-2" />
            Start Camera
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={switchCamera}
          disabled={!isStreaming && !isLoading}
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
          disabled={!isStreaming && !isLoading}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      {/* Mobile-specific help */}
      <div className="text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p><strong>Mobile Tips:</strong></p>
        <p>• Use back camera for better crop photos</p>
        <p>• Ensure good lighting</p>
        <p>• Hold device steady when capturing</p>
      </div>
    </div>
  );
}