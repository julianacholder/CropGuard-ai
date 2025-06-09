import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ThreatLevel({ detections }) {
  const activeThreat = detections.filter(d => d.status === 'detected');
  const criticalCount = activeThreat.filter(d => d.severity_level === 'critical').length;
  const highCount = activeThreat.filter(d => d.severity_level === 'high').length;
  const totalActive = activeThreat.length;

  const threatLevel = criticalCount > 0 ? 'Critical' : 
                     highCount > 2 ? 'High' : 
                     totalActive > 0 ? 'Moderate' : 'Low';

  const threatScore = Math.min(100, (criticalCount * 40 + highCount * 20 + totalActive * 5));

  const getThreatColor = (level) => {
    switch(level) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Moderate': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getProgressColor = (level) => {
    switch(level) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Moderate': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Shield className="w-5 h-5" />
          Current Threat Level
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getThreatColor(threatLevel)} mb-2`}>
            {threatLevel}
          </div>
          <Progress 
            value={threatScore} 
            className="h-3 mb-4" 
            style={{
              '--progress-foreground': getProgressColor(threatLevel)
            }}
          />
        </div>

        <div className="space-y-3">
          {criticalCount > 0 && (
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Critical Issues</span>
              </div>
              <Badge className="bg-red-100 text-red-800 border-red-300">
                {criticalCount}
              </Badge>
            </div>
          )}

          {highCount > 0 && (
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">High Priority</span>
              </div>
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                {highCount}
              </Badge>
            </div>
          )}

          {totalActive === 0 && (
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">All Clear</span>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
          Based on {detections.length} total detections
        </div>
      </CardContent>
    </Card>
  );
}