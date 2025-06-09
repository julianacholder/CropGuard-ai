import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cloud, Sun, Droplets, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WeatherAlert() {
  // Mock weather data - in real app would come from weather API
  const weatherData = {
    condition: "Partly Cloudy",
    temperature: 24,
    humidity: 68,
    windSpeed: 12,
    pestRisk: "Moderate"
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Cloud className="w-5 h-5" />
          Weather & Pest Risk
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{weatherData.condition}</p>
            <p className="text-xl font-bold text-gray-900">{weatherData.temperature}°C</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span className="text-gray-600">Humidity</span>
              </div>
              <span className="font-medium">{weatherData.humidity}%</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-gray-500" />
                <span className="text-gray-600">Wind</span>
              </div>
              <span className="font-medium">{weatherData.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Pest Activity Risk:</span>
            <Badge className={`${getRiskColor(weatherData.pestRisk)} border`}>
              {weatherData.pestRisk}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Current conditions favor moderate pest activity. Monitor crops closely.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}