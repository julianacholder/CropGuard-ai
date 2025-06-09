import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function FarmHealthStats({ title, value, icon: Icon, bgColor, description, trend }) {
  const isPositive = trend?.includes('Excellent') || trend?.includes('Good') || trend?.includes('success');

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
              {value}
            </CardTitle>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-r ${bgColor} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-500 mb-2">{description}</p>
        {trend && (
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-orange-500" />
            )}
            <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-orange-600'}`}>
              {trend}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}