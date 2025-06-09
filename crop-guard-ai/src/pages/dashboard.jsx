import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Camera, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Stethoscope, 
  Leaf,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart3,
  Activity,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import FarmHealthStats from "../components/dashboard/FarmHealthStats";
import RecentDetections from "../components/dashboard/RecentDetections";
import ThreatLevel from "../components/dashboard/ThreatLevel";
import WeatherAlert from "../components/dashboard/WeatherAlert";
import Corn from "../assets/corn.jpeg";
import Apple from "../assets/apple.jpeg";
import Tomato from "../assets/tomato.jpeg";
import Potato from "../assets/potato.jpeg";
import cutworm from "../assets/cutworms.jpg";

export default function Dashboard() {
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDetections();
  }, []);

  const loadDetections = async () => {
    setIsLoading(true);
    try {
      // TEMPORARY MOCK DATA FOR CROP DISEASE DETECTION
      setTimeout(() => {
        const mockDetections = [
          {
            id: 1,
            detected_pest: "Tomato Early Blight",
            confidence_score: 0.89,
            severity_level: "moderate",
            crop_type: "Tomato",
            status: "detected",
            created_date: new Date().toISOString(),
            image_url: Tomato,
            treatment_recommendation: "Apply copper-based fungicide and remove affected leaves"
          },
          {
            id: 2,
            detected_pest: "Potato Late Blight",
            confidence_score: 0.94,
            severity_level: "high",
            crop_type: "Potato",
            status: "treating",
            created_date: new Date(Date.now() - 86400000).toISOString(),
            image_url: Potato,
            treatment_recommendation: "Immediate fungicide application and improve drainage"
          },
          {
            id: 3,
            detected_pest: "Corn Leaf Spot",
            confidence_score: 0.82,
            severity_level: "low",
            crop_type: "Corn",
            status: "resolved",
            created_date: new Date(Date.now() - 172800000).toISOString(),
            image_url: Corn,
            treatment_recommendation: "Crop rotation and resistant varieties for next season"
          },
          {
            id: 4,
            detected_pest: "Apple Scab",
            confidence_score: 0.76,
            severity_level: "moderate",
            crop_type: "Apple",
            status: "monitoring",
            created_date: new Date(Date.now() - 259200000).toISOString(),
            image_url: Apple,
            treatment_recommendation: "Preventive fungicide spray during wet periods"
          }
        ];
        
        setDetections(mockDetections);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error loading disease detections:", error);
      setIsLoading(false);
    }
  };

  const cropHealthScore = detections.length > 0 
    ? Math.max(25, 100 - (detections.filter(d => d.severity_level === 'high' || d.severity_level === 'critical').length * 20))
    : 92;

  const activeTreatments = detections.filter(d => d.status === 'treating').length;
  const resolvedDiseases = detections.filter(d => d.status === 'resolved').length;
  const underMonitoring = detections.filter(d => d.status === 'monitoring').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto ml-auto md:ml-60 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome to Crop Disease Detector
                </h1>
                <p className="text-green-100 text-lg md:text-xl mb-6 max-w-2xl">
                  Advanced AI-powered crop disease detection to protect your harvest and ensure healthy crops. 
                  Identify, diagnose, and treat plant diseases before they spread.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={createPageUrl("Detection")}>
                    <Button size="lg" className="bg-white text-green-800 hover:bg-green-50 font-semibold">
                      <Camera className="w-5 h-5 mr-2" />
                      Scan for Diseases
                    </Button>
                  </Link>
                  <Link to={createPageUrl("PestLibrary")}>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Disease Library
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Stethoscope className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crop Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FarmHealthStats 
            title="Crop Health Score"
            value={`${cropHealthScore}%`}
            icon={Activity}
            bgColor="from-green-500 to-green-600"
            description="Overall plant health status"
            trend={cropHealthScore > 85 ? "Excellent" : cropHealthScore > 70 ? "Good" : "Needs Attention"}
          />
          
          <FarmHealthStats 
            title="Active Diseases"
            value={detections.filter(d => d.status === 'detected').length}
            icon={AlertTriangle}
            bgColor="from-red-500 to-red-600"
            description="Diseases requiring treatment"
            trend="Real-time monitoring"
          />
          
          <FarmHealthStats 
            title="Under Treatment"
            value={activeTreatments}
            icon={Stethoscope}
            bgColor="from-blue-500 to-blue-600"
            description="Active disease treatments"
            trend="Recovery in progress"
          />
          
          <FarmHealthStats 
            title="Diseases Cured"
            value={resolvedDiseases}
            icon={CheckCircle}
            bgColor="from-emerald-500 to-emerald-600"
            description="Successfully treated diseases"
            trend="Treatment success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Disease Detections */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Activity className="w-5 h-5" />
                  Recent Disease Detections
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadDetections}
                  disabled={isLoading}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  {isLoading ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : detections.length > 0 ? (
                  <div className="space-y-4">
                    {detections.slice(0, 5).map((detection) => (
                      <div key={detection.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
                        <img 
                          src={detection.image_url} 
                          alt={detection.detected_pest}
                          className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {detection.detected_pest}
                            </h3>
                            <Badge 
                              variant="outline"
                              className={`
                                ${detection.severity_level === 'high' ? 'border-red-200 text-red-700 bg-red-50' : ''}
                                ${detection.severity_level === 'moderate' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' : ''}
                                ${detection.severity_level === 'low' ? 'border-green-200 text-green-700 bg-green-50' : ''}
                              `}
                            >
                              {detection.severity_level}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {detection.crop_type} • {Math.round(detection.confidence_score * 100)}% confidence
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {detection.treatment_recommendation}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            className={`
                              ${detection.status === 'detected' ? 'bg-orange-100 text-orange-800' : ''}
                              ${detection.status === 'treating' ? 'bg-blue-100 text-blue-800' : ''}
                              ${detection.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                              ${detection.status === 'monitoring' ? 'bg-purple-100 text-purple-800' : ''}
                            `}
                          >
                            {detection.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No disease detections yet</p>
                    <p className="text-sm text-gray-400">Upload crop images to start monitoring</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Components */}
          <div className="space-y-6">
            {/* Disease Risk Level */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <AlertTriangle className="w-5 h-5" />
                  Disease Risk Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Current Risk</span>
                    <Badge className={`
                      ${detections.filter(d => d.severity_level === 'high').length > 0 ? 'bg-red-100 text-red-800' :
                        detections.filter(d => d.severity_level === 'moderate').length > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}
                    `}>
                      {detections.filter(d => d.severity_level === 'high').length > 0 ? 'High Risk' :
                       detections.filter(d => d.severity_level === 'moderate').length > 0 ? 'Moderate Risk' :
                       'Low Risk'}
                    </Badge>
                  </div>
                  <Progress 
                    value={detections.filter(d => d.severity_level === 'high').length > 0 ? 85 :
                           detections.filter(d => d.severity_level === 'moderate').length > 0 ? 45 : 15} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500">
                    {detections.filter(d => d.severity_level === 'high').length > 0 
                      ? 'Immediate attention required for high-severity diseases'
                      : detections.filter(d => d.severity_level === 'moderate').length > 0
                      ? 'Monitor moderate-risk diseases closely'
                      : 'Crops are healthy with low disease risk'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            <WeatherAlert />
            
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Leaf className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={createPageUrl("Detection")} className="block">
                  <Button className="w-full justify-between bg-green-600 hover:bg-green-700">
                    <span className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      New Disease Scan
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl("History")} className="block">
                  <Button variant="outline" className="w-full justify-between border-green-200 text-green-700 hover:bg-green-50">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Disease Analytics
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl("Resources")} className="block">
                  <Button variant="outline" className="w-full justify-between border-green-200 text-green-700 hover:bg-green-50">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Prevention Guide
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl("PestLibrary")} className="block">
                  <Button variant="outline" className="w-full justify-between border-green-200 text-green-700 hover:bg-green-50">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Disease Database
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}