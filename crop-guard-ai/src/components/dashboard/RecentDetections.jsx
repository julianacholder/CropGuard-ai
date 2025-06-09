import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bug, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const severityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200"
};

const statusColors = {
  detected: "bg-blue-100 text-blue-800 border-blue-200",
  treating: "bg-purple-100 text-purple-800 border-purple-200",
  resolved: "bg-green-100 text-green-800 border-green-200"
};

const statusIcons = {
  detected: AlertTriangle,
  treating: Clock,
  resolved: CheckCircle
};

export default function RecentDetections({ detections, isLoading, onRefresh }) {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-green-100">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Bug className="w-5 h-5" />
            Recent Detections
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Link to={createPageUrl("Detection")}>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                New Detection
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : detections.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bug className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Detections Yet</h3>
            <p className="text-gray-500 mb-6">Start monitoring your crops by uploading images for AI analysis.</p>
            <Link to={createPageUrl("Detection")}>
              <Button className="bg-green-600 hover:bg-green-700">
                Start First Detection
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {detections.slice(0, 5).map((detection) => {
              const StatusIcon = statusIcons[detection.status];
              return (
                <div key={detection.id} className="group p-4 border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50/50 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img 
                        src={detection.image_url} 
                        alt="Crop detection"
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute -top-1 -right-1">
                        <StatusIcon className="w-4 h-4 text-white bg-gray-800 rounded-full p-0.5" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 truncate">
                            {detection.detected_pest}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(detection.created_date), "MMM d, yyyy")}
                            {detection.location && (
                              <>
                                <MapPin className="w-3 h-3 ml-2" />
                                {detection.location}
                              </>
                            )}
                          </div>
                        </div>
                        <a
                          href={detection.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </a>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`${severityColors[detection.severity_level]} border text-xs`}>
                          {detection.severity_level} severity
                        </Badge>
                        <Badge className={`${statusColors[detection.status]} border text-xs`}>
                          {detection.status}
                        </Badge>
                        {detection.confidence_score && (
                          <Badge variant="outline" className="text-xs">
                            {Math.round(detection.confidence_score)}% confidence
                          </Badge>
                        )}
                      </div>
                      
                      {detection.crop_type && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Crop:</span> {detection.crop_type}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {detections.length > 5 && (
              <div className="text-center pt-4 border-t border-gray-100">
                <Link to={createPageUrl("History")}>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                    View All Detections
                    <TrendingUp className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}