import React, { useState, useEffect } from "react";
// import { PestDetection } from "@/entities/PestDetection"; // Commented out for now
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Camera, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Bug, 
  Leaf,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import FarmHealthStats from "../components/dashboard/FarmHealthStats";
import RecentDetections from "../components/dashboard/RecentDetections";
import ThreatLevel from "../components/dashboard/ThreatLevel";
import WeatherAlert from "../components/dashboard/WeatherAlert";
import whitefliesImage from "../assets/whiteflies.jpeg";
import aphids from "../assets/aphids.jpeg";
import spiderMites from "../assets/spider-mite.jpg";
import cutworm from "../assets/cutworms.jpg";

export default function Dashboard() {
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Changed to false since we're using mock data

  useEffect(() => {
    loadDetections();
  }, []);

  const loadDetections = async () => {
    setIsLoading(true);
    try {
      /* COMMENTED OUT - DATABASE INTEGRATION NOT YET IMPLEMENTED
      const data = await PestDetection.list("-created_date", 10);
      setDetections(data);
      */

      // TEMPORARY MOCK DATA FOR UI TESTING
      setTimeout(() => {
        const mockDetections = [
          {
            id: 1,
            detected_pest: "Aphids",
            confidence_score: 0.85,
            severity_level: "moderate",
            crop_type: "Tomato",
            status: "detected",
            created_date: new Date().toISOString(),
            image_url: aphids,
            treatment_recommendation: "Apply insecticidal soap"
          },
          {
            id: 2,
            detected_pest: "Spider Mites",
            confidence_score: 0.92,
            severity_level: "high",
            crop_type: "Cucumber",
            status: "treating",
            created_date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            image_url: spiderMites,
            treatment_recommendation: "Increase humidity and apply miticide"
          },
          {
            id: 3,
            detected_pest: "Whiteflies",
            confidence_score: 0.78,
            severity_level: "low",
            crop_type: "Pepper",
            status: "resolved",
            created_date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            image_url: whitefliesImage,
            treatment_recommendation: "Yellow sticky traps and beneficial insects"
          }
        ];
        
        setDetections(mockDetections);
        setIsLoading(false);
      }, 1000); // Simulate loading delay

    } catch (error) {
      console.error("Error loading detections:", error);
      setIsLoading(false);
    }
  };

  const farmHealthScore = detections.length > 0 
    ? Math.max(20, 100 - (detections.filter(d => d.severity_level === 'high' || d.severity_level === 'critical').length * 15))
    : 95;

  const activeTreats = detections.filter(d => d.status === 'treating').length;
  const resolvedIssues = detections.filter(d => d.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto ml-auto md:ml-60 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-3xl p-8  lg:p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome to CropGuard AI
                </h1>
                <p className="text-green-100 text-lg md:text-xl mb-6 max-w-2xl">
                  Advanced AI-powered pest detection to protect your crops and maximize yield. 
                  Monitor, detect, and treat pest issues before they become problems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={createPageUrl("Detection")}>
                    <Button size="lg" className="bg-white text-green-800 hover:bg-green-50 font-semibold">
                      <Camera className="w-5 h-5 mr-2" />
                      Start Detection
                    </Button>
                  </Link>
                  <Link to={createPageUrl("PestLibrary")}>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Bug className="w-5 h-5 mr-2" />
                      Browse Pests
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farm Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FarmHealthStats 
            title="Farm Health Score"
            value={`${farmHealthScore}%`}
            icon={Shield}
            bgColor="from-green-500 to-green-600"
            description="Overall crop protection status"
            trend={farmHealthScore > 80 ? "Excellent" : farmHealthScore > 60 ? "Good" : "Needs Attention"}
          />
          
          <FarmHealthStats 
            title="Active Detections"
            value={detections.filter(d => d.status === 'detected').length}
            icon={Bug}
            bgColor="from-orange-500 to-orange-600"
            description="Pests requiring attention"
            trend="Real-time monitoring"
          />
          
          <FarmHealthStats 
            title="Treatments Active"
            value={activeTreats}
            icon={Clock}
            bgColor="from-blue-500 to-blue-600"
            description="Ongoing pest treatments"
            trend="Management in progress"
          />
          
          <FarmHealthStats 
            title="Issues Resolved"
            value={resolvedIssues}
            icon={CheckCircle}
            bgColor="from-emerald-500 to-emerald-600"
            description="Successfully treated pests"
            trend="Protection success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Detections */}
          <div className="lg:col-span-2">
            <RecentDetections 
              detections={detections}
              isLoading={isLoading}
              onRefresh={loadDetections}
            />
          </div>

          {/* Sidebar Components */}
          <div className="space-y-6">
            <ThreatLevel detections={detections} />
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
                      New Detection
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl("History")} className="block">
                  <Button variant="outline" className="w-full justify-between border-green-200 text-green-700 hover:bg-green-50">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Analytics
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl("Resources")} className="block">
                  <Button variant="outline" className="w-full justify-between border-green-200 text-green-700 hover:bg-green-50">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Prevention Tips
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