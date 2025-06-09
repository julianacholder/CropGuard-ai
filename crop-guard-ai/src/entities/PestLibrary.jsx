import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bug, 
  Search, 
  ArrowLeft, 
  AlertTriangle,
  Leaf,
  Shield,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { getSeverityColor } from "@/utils";
import whitefliesImage from "../assets/whiteflies.jpeg";
import aphids from "../assets/aphids.jpeg";
import spiderMites from "../assets/spider-mite.jpg";
import cutworm from "../assets/cutworms.jpg";

// Mock pest data for UI testing
const mockPests = [
  {
    id: 1,
    name: "Aphids",
    scientific_name: "Aphidoidea",
    description: "Small, soft-bodied insects that feed on plant sap. They reproduce rapidly and can cause significant damage.",
    affected_crops: ["Tomatoes", "Peppers", "Lettuce", "Roses"],
    identification_features: [
      "Small (1-4mm) green, black, or red insects",
      "Cluster on stems and undersides of leaves",
      "Sticky honeydew secretion",
      "Winged and wingless forms"
    ],
    damage_patterns: "Yellowing leaves, stunted growth, curled leaves, sticky honeydew coating",
    treatment_methods: [
      "Insecticidal soap spray",
      "Neem oil application",
      "Beneficial insects (ladybugs)",
      "Strong water spray"
    ],
    prevention_tips: [
      "Regular plant inspection",
      "Avoid over-fertilizing with nitrogen",
      "Encourage beneficial insects",
      "Remove weeds that harbor aphids"
    ],
    image_url: aphids,
    severity_indicator: "moderate"
  },
  {
    id: 2,
    name: "Spider Mites",
    scientific_name: "Tetranychidae",
    description: "Tiny arachnids that feed on plant cells, causing stippling and webbing on leaves.",
    affected_crops: ["Tomatoes", "Cucumbers", "Beans", "Strawberries"],
    identification_features: [
      "Extremely small (0.5mm) red or yellow dots",
      "Fine webbing on leaves",
      "Stippled or bronzed leaf appearance",
      "Active in hot, dry conditions"
    ],
    damage_patterns: "Stippled leaves, fine webbing, leaf drop, reduced plant vigor",
    treatment_methods: [
      "Increase humidity",
      "Miticide application",
      "Predatory mites release",
      "Strong water spray"
    ],
    prevention_tips: [
      "Maintain adequate humidity",
      "Avoid water stress",
      "Regular monitoring",
      "Quarantine new plants"
    ],
    image_url: spiderMites,
    severity_indicator: "high"
  },
  {
    id: 3,
    name: "Whiteflies",
    scientific_name: "Aleyrodidae",
    description: "Small white flying insects that feed on plant sap and transmit plant viruses.",
    affected_crops: ["Tomatoes", "Peppers", "Cucumbers", "Eggplant"],
    identification_features: [
      "Small white flying insects (1-2mm)",
      "Found on undersides of leaves",
      "Flutter when disturbed",
      "Yellow, sticky eggs on leaves"
    ],
    damage_patterns: "Yellowing leaves, honeydew secretion, sooty mold, virus transmission",
    treatment_methods: [
      "Yellow sticky traps",
      "Insecticidal soap",
      "Beneficial insects",
      "Reflective mulch"
    ],
    prevention_tips: [
      "Install yellow sticky traps",
      "Screen greenhouse vents",
      "Remove infected plants",
      "Encourage beneficial insects"
    ],
    image_url: whitefliesImage,
    severity_indicator: "moderate"
  },
  {
    id: 4,
    name: "Cutworms",
    scientific_name: "Noctuidae",
    description: "Caterpillars that cut through plant stems at soil level, causing plants to topple over.",
    affected_crops: ["Tomatoes", "Peppers", "Corn", "Cabbage"],
    identification_features: [
      "Gray or brown caterpillars (2-5cm)",
      "Curl into C-shape when disturbed",
      "Active at night",
      "Hide in soil during day"
    ],
    damage_patterns: "Cut stems at soil level, severed seedlings, chewed leaves",
    treatment_methods: [
      "Collar barriers around plants",
      "Beneficial nematodes",
      "Bacillus thuringiensis (Bt)",
      "Hand picking at night"
    ],
    prevention_tips: [
      "Clear garden debris",
      "Use plant collars",
      "Till soil before planting",
      "Delay planting in infested areas"
    ],
    image_url: cutworm,
    severity_indicator: "high"
  }
];

export default function PestLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredPests = mockPests.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.affected_crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSeverity = severityFilter === "all" || pest.severity_indicator === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto ml-auto md:ml-60 ">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon" className="border-green-200 text-green-700 hover:bg-green-50">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-green-900">Pest Library</h1>
            <p className="text-green-600 mt-1">Comprehensive guide to common agricultural pests</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                <Input
                  placeholder="Search pests by name, scientific name, or affected crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={severityFilter === "all" ? "default" : "outline"}
                  onClick={() => setSeverityFilter("all")}
                  className={severityFilter === "all" ? "bg-green-600 hover:bg-green-700" : "border-green-200 text-green-700"}
                >
                  All Pests
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
            </div>
          </CardContent>
        </Card>

        {/* Pest Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPests.map((pest) => (
            <Card key={pest.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={pest.image_url} 
                  alt={pest.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${getSeverityColor(pest.severity_indicator)}`}
                >
                  {pest.severity_indicator}
                </Badge>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-green-900 mb-1">{pest.name}</CardTitle>
                    <p className="text-sm text-green-600 italic">{pest.scientific_name}</p>
                  </div>
                  <Bug className="w-6 h-6 text-green-600 flex-shrink-0" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm line-clamp-3">{pest.description}</p>
                
                <div>
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
                    <Leaf className="w-4 h-4" />
                    Affected Crops
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {pest.affected_crops.slice(0, 3).map((crop, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {crop}
                      </Badge>
                    ))}
                    {pest.affected_crops.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{pest.affected_crops.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Treatment Methods
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {pest.treatment_methods.slice(0, 2).map((method, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPests.length === 0 && (
          <div className="text-center py-12">
            <Bug className="w-16 h-16 text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">No pests found</h3>
            <p className="text-green-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the schema too, in case it's needed elsewhere
export const PestLibrarySchema = {
  "name": "PestLibrary",
  "type": "object",
  "properties": {
    "name": { "type": "string", "description": "Common name of the pest" },
    "scientific_name": { "type": "string", "description": "Scientific classification" },
    "description": { "type": "string", "description": "Detailed description of the pest" },
    "affected_crops": { "type": "array", "items": { "type": "string" }, "description": "List of crops commonly affected" },
    "identification_features": { "type": "array", "items": { "type": "string" }, "description": "Key features for identification" },
    "damage_patterns": { "type": "string", "description": "How the pest damages crops" },
    "treatment_methods": { "type": "array", "items": { "type": "string" }, "description": "Recommended treatment approaches" },
    "prevention_tips": { "type": "array", "items": { "type": "string" }, "description": "Prevention strategies" },
    "image_url": { "type": "string", "description": "Reference image of the pest" },
    "severity_indicator": { "type": "string", "enum": ["low", "moderate", "high", "critical"], "description": "General threat level" }
  },
  "required": ["name", "description", "affected_crops"]
};