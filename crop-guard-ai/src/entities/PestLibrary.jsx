import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Stethoscope, 
  Search, 
  ArrowLeft, 
  AlertTriangle,
  Leaf,
  Shield,
  BookOpen,
  Activity,
  Droplets,
  Wind,
  ChevronUp,
  Eye,
  Thermometer
} from "lucide-react";
import Corn from "../assets/corn.jpeg";
import Apple from "../assets/apple.jpeg";
import Tomato from "../assets/tomato.jpeg";
import Potato from "../assets/potato.jpeg";
import wilt from "../assets/wilt.jpeg"; // Example image for Bacterial Wilt
import powder from "../assets/powder.jpeg"; // Example image for Powdery Mildew

// Mock disease data for UI testing
const mockDiseases = [
  {
    id: 1,
    name: "Tomato Early Blight",
    scientific_name: "Alternaria solani",
    disease_type: "Fungal",
    description: "A common fungal disease that affects tomatoes and potatoes, causing dark spots with concentric rings on leaves and stems.",
    affected_crops: ["Tomatoes", "Potatoes", "Eggplant", "Peppers"],
    identification_features: [
      "Dark brown spots with concentric rings on leaves",
      "Yellowing around the spots",
      "Lower leaves affected first",
      "Stem lesions with dark, sunken areas"
    ],
    symptoms: "Brown lesions with target-like patterns, yellowing leaves, defoliation, reduced fruit quality",
    treatment_methods: [
      "Apply copper-based fungicide",
      "Remove affected plant parts",
      "Improve air circulation",
      "Avoid overhead watering"
    ],
    prevention_tips: [
      "Crop rotation (3-4 years)",
      "Use disease-resistant varieties",
      "Mulch to prevent soil splash",
      "Avoid working with wet plants"
    ],
    environmental_conditions: "Warm temperatures (24-29°C), high humidity, wet conditions",
    image_url: Tomato,
    severity_indicator: "moderate"
  },
  {
    id: 2,
    name: "Potato Late Blight",
    scientific_name: "Phytophthora infestans",
    disease_type: "Oomycete",
    description: "A devastating water mold disease that can destroy entire potato and tomato crops within days under favorable conditions.",
    affected_crops: ["Potatoes", "Tomatoes"],
    identification_features: [
      "Water-soaked dark spots on leaves",
      "White fuzzy growth on leaf undersides",
      "Brown lesions on stems",
      "Dark rot on tubers/fruits"
    ],
    symptoms: "Rapid leaf death, white sporulation, stem rot, tuber rot, plant collapse",
    treatment_methods: [
      "Immediate fungicide application",
      "Remove and destroy infected plants",
      "Improve drainage",
      "Harvest healthy tubers quickly"
    ],
    prevention_tips: [
      "Plant certified disease-free seed",
      "Ensure good drainage",
      "Avoid overhead irrigation",
      "Monitor weather conditions"
    ],
    environmental_conditions: "Cool, wet conditions (15-20°C), high humidity, extended leaf wetness",
    image_url: Potato,
    severity_indicator: "high"
  },
  {
    id: 3,
    name: "Corn Leaf Spot",
    scientific_name: "Bipolaris maydis",
    disease_type: "Fungal",
    description: "A fungal disease causing characteristic leaf spots on corn, potentially reducing photosynthesis and yield.",
    affected_crops: ["Corn", "Sorghum"],
    identification_features: [
      "Small, oval brown spots on leaves",
      "Spots may have yellow halos",
      "Lesions elongate parallel to leaf veins",
      "Lower leaves affected first"
    ],
    symptoms: "Brown leaf spots, premature leaf death, reduced grain fill, yield loss",
    treatment_methods: [
      "Foliar fungicide application",
      "Remove crop residue",
      "Promote air circulation",
      "Balanced fertilization"
    ],
    prevention_tips: [
      "Use resistant hybrid varieties",
      "Practice crop rotation",
      "Manage crop residue",
      "Avoid dense planting"
    ],
    environmental_conditions: "Warm, humid conditions (20-30°C), prolonged leaf wetness",
    image_url: Corn,
    severity_indicator: "moderate"
  },
  {
    id: 4,
    name: "Apple Scab",
    scientific_name: "Venturia inaequalis",
    disease_type: "Fungal",
    description: "A serious fungal disease of apples causing scabby lesions on leaves and fruit, reducing fruit quality and marketability.",
    affected_crops: ["Apples", "Pears", "Crabapples"],
    identification_features: [
      "Olive-green to black spots on leaves",
      "Scabby lesions on fruit",
      "Premature leaf drop",
      "Cracking of fruit skin"
    ],
    symptoms: "Dark scabby spots on fruit, leaf spots, defoliation, reduced fruit quality",
    treatment_methods: [
      "Preventive fungicide sprays",
      "Remove fallen leaves",
      "Prune for air circulation",
      "Apply dormant season sprays"
    ],
    prevention_tips: [
      "Plant resistant varieties",
      "Improve air circulation",
      "Remove leaf litter",
      "Time fungicide applications"
    ],
    environmental_conditions: "Cool, wet spring weather (15-24°C), extended wet periods",
    image_url: Apple,
    severity_indicator: "high"
  },
  {
    id: 5,
    name: "Powdery Mildew",
    scientific_name: "Erysiphe cichoracearum",
    disease_type: "Fungal",
    description: "A widespread fungal disease creating white powdery coating on leaves, reducing photosynthesis and plant vigor.",
    affected_crops: ["Cucumbers", "Squash", "Melons", "Pumpkins"],
    identification_features: [
      "White powdery coating on leaves",
      "Starts on upper leaf surfaces",
      "Leaves may curl and distort",
      "Premature yellowing and drop"
    ],
    symptoms: "White powdery growth, leaf yellowing, stunted growth, reduced fruit quality",
    treatment_methods: [
      "Sulfur or potassium bicarbonate spray",
      "Neem oil application",
      "Remove affected leaves",
      "Improve air circulation"
    ],
    prevention_tips: [
      "Plant resistant varieties",
      "Provide adequate spacing",
      "Avoid overhead watering",
      "Monitor humidity levels"
    ],
    environmental_conditions: "Moderate temperatures (20-25°C), high humidity, poor air circulation",
    image_url: powder,
    severity_indicator: "moderate"
  },
  {
    id: 6,
    name: "Bacterial Wilt",
    scientific_name: "Erwinia tracheiphila",
    disease_type: "Bacterial",
    description: "A bacterial disease causing rapid wilting and death of cucumber family plants, spread by cucumber beetles.",
    affected_crops: ["Cucumbers", "Melons", "Squash", "Pumpkins"],
    identification_features: [
      "Sudden wilting of leaves and vines",
      "Sticky bacterial ooze from cut stems",
      "No recovery after watering",
      "Yellowing progresses to brown"
    ],
    symptoms: "Rapid wilting, vine collapse, bacterial streaming, plant death",
    treatment_methods: [
      "Remove infected plants immediately",
      "Control cucumber beetles",
      "No effective chemical treatment",
      "Plant resistant varieties"
    ],
    prevention_tips: [
      "Control cucumber beetles early",
      "Use row covers during early growth",
      "Plant resistant varieties",
      "Remove crop debris"
    ],
    environmental_conditions: "Warm weather, presence of cucumber beetle vectors",
    image_url: wilt,
    severity_indicator: "high"
  }
];

// Disease Card Component with expand/collapse functionality
const DiseaseCard = ({ disease }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDiseaseTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'fungal': return <Droplets className="w-4 h-4" />;
      case 'bacterial': return <Activity className="w-4 h-4" />;
      case 'viral': return <Wind className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  const getDiseaseTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'fungal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bacterial': return 'bg-red-100 text-red-800 border-red-200';
      case 'viral': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'oomycete': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
      <div className="relative">
        <img 
          src={disease.image_url} 
          alt={disease.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className={`${getDiseaseTypeColor(disease.disease_type)} border`}>
            {getDiseaseTypeIcon(disease.disease_type)}
            <span className="ml-1">{disease.disease_type}</span>
          </Badge>
          <Badge className={`${getSeverityColor(disease.severity_indicator)}`}>
            {disease.severity_indicator}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-green-900 mb-1">{disease.name}</CardTitle>
            <p className="text-sm text-green-600 italic">{disease.scientific_name}</p>
          </div>
          <Stethoscope className="w-6 h-6 text-green-600 flex-shrink-0" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm line-clamp-3">{disease.description}</p>
        
        <div>
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
            <Leaf className="w-4 h-4" />
            Affected Crops
          </h4>
          <div className="flex flex-wrap gap-1">
            {disease.affected_crops.slice(0, 3).map((crop, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                {crop}
              </Badge>
            ))}
            {disease.affected_crops.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                +{disease.affected_crops.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Key Symptoms
          </h4>
          <p className="text-sm text-gray-700 line-clamp-2">{disease.symptoms}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
            <Shield className="w-4 h-4" />
            Treatment Methods
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {disease.treatment_methods.slice(0, 2).map((method, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                {method}
              </li>
            ))}
          </ul>
        </div>

        {/* Expanded content - only shows when isExpanded is true */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-4 animate-in slide-in-from-top-2 duration-300">
            {/* All Treatment Methods */}
            {disease.treatment_methods.length > 2 && (
              <div>
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Complete Treatment Methods
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {disease.treatment_methods.map((method, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Identification Features */}
            <div>
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                How to Identify
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {disease.identification_features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Tips */}
            <div>
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Prevention Tips
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {disease.prevention_tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Environmental Conditions */}
            <div>
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
                <Thermometer className="w-4 h-4" />
                Favorable Conditions
              </h4>
              <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                {disease.environmental_conditions}
              </p>
            </div>

            {/* All Affected Crops (if more than 3) */}
            {disease.affected_crops.length > 3 && (
              <div>
                <h4 className="font-semibold text-green-900 mb-2">All Affected Crops</h4>
                <div className="flex flex-wrap gap-1">
                  {disease.affected_crops.map((crop, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Toggle Button */}
        <Button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-green-600 hover:bg-green-700 mt-4"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Hide Details
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 mr-2" />
              View Full Details
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default function DiseaseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [diseaseTypeFilter, setDiseaseTypeFilter] = useState("all");

  const filteredDiseases = mockDiseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.affected_crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         disease.disease_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || disease.severity_indicator === severityFilter;
    const matchesType = diseaseTypeFilter === "all" || disease.disease_type.toLowerCase() === diseaseTypeFilter;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const getDiseaseTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'fungal': return <Droplets className="w-4 h-4" />;
      case 'bacterial': return <Activity className="w-4 h-4" />;
      case 'viral': return <Wind className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto ml-auto md:ml-60">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" className="border-green-200 text-green-700 hover:bg-green-50">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-900">Disease Library</h1>
            <p className="text-green-600 mt-1">Comprehensive guide to common crop diseases and disorders</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                <Input
                  placeholder="Search diseases by name, scientific name, or affected crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {/* Severity Filters */}
                <div className="flex gap-2">
                  <Button
                    variant={severityFilter === "all" ? "default" : "outline"}
                    onClick={() => setSeverityFilter("all")}
                    className={severityFilter === "all" ? "bg-green-600 hover:bg-green-700" : "border-green-200 text-green-700"}
                  >
                    All Severities
                  </Button>
                  <Button
                    variant={severityFilter === "high" ? "default" : "outline"}
                    onClick={() => setSeverityFilter("high")}
                    className={severityFilter === "high" ? "bg-red-600 hover:bg-red-700" : "border-red-200 text-red-700"}
                  >
                    High Risk
                  </Button>
                  <Button
                    variant={severityFilter === "moderate" ? "default" : "outline"}
                    onClick={() => setSeverityFilter("moderate")}
                    className={severityFilter === "moderate" ? "bg-yellow-600 hover:bg-yellow-700" : "border-yellow-200 text-yellow-700"}
                  >
                    Moderate
                  </Button>
                </div>

                {/* Disease Type Filters */}
                <div className="flex gap-2 ml-4 border-l pl-4">
                  <Button
                    variant={diseaseTypeFilter === "all" ? "default" : "outline"}
                    onClick={() => setDiseaseTypeFilter("all")}
                    className={diseaseTypeFilter === "all" ? "bg-green-600 hover:bg-green-700" : "border-green-200 text-green-700"}
                  >
                    All Types
                  </Button>
                  <Button
                    variant={diseaseTypeFilter === "fungal" ? "default" : "outline"}
                    onClick={() => setDiseaseTypeFilter("fungal")}
                    className={diseaseTypeFilter === "fungal" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200 text-blue-700"}
                  >
                    <Droplets className="w-4 h-4 mr-1" />
                    Fungal
                  </Button>
                  <Button
                    variant={diseaseTypeFilter === "bacterial" ? "default" : "outline"}
                    onClick={() => setDiseaseTypeFilter("bacterial")}
                    className={diseaseTypeFilter === "bacterial" ? "bg-red-600 hover:bg-red-700" : "border-red-200 text-red-700"}
                  >
                    <Activity className="w-4 h-4 mr-1" />
                    Bacterial
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disease Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} />
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">No diseases found</h3>
            <p className="text-green-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the schema for crop diseases
export const DiseaseLibrarySchema = {
  "name": "DiseaseLibrary",
  "type": "object",
  "properties": {
    "name": { "type": "string", "description": "Common name of the disease" },
    "scientific_name": { "type": "string", "description": "Scientific classification" },
    "disease_type": { "type": "string", "enum": ["Fungal", "Bacterial", "Viral", "Oomycete"], "description": "Type of pathogen" },
    "description": { "type": "string", "description": "Detailed description of the disease" },
    "affected_crops": { "type": "array", "items": { "type": "string" }, "description": "List of crops commonly affected" },
    "identification_features": { "type": "array", "items": { "type": "string" }, "description": "Key features for identification" },
    "symptoms": { "type": "string", "description": "How the disease manifests in plants" },
    "treatment_methods": { "type": "array", "items": { "type": "string" }, "description": "Recommended treatment approaches" },
    "prevention_tips": { "type": "array", "items": { "type": "string" }, "description": "Prevention strategies" },
    "environmental_conditions": { "type": "string", "description": "Conditions that favor disease development" },
    "image_url": { "type": "string", "description": "Reference image of the disease" },
    "severity_indicator": { "type": "string", "enum": ["low", "moderate", "high", "critical"], "description": "General threat level" }
  },
  "required": ["name", "disease_type", "description", "affected_crops"]
};