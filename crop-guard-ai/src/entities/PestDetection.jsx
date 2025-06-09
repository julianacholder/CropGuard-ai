export const PestDetectionSchema = {
  "name": "PestDetection",
  "type": "object",
  "properties": {
    "image_url": {
      "type": "string",
      "description": "URL of the uploaded crop/pest image"
    },
    "detected_pest": {
      "type": "string", 
      "description": "Name of the detected pest"
    },
    "confidence_score": {
      "type": "number",
      "description": "AI confidence level (0-100)"
    },
    "severity_level": {
      "type": "string",
      "enum": [
        "low",
        "moderate", 
        "high",
        "critical"
      ],
      "description": "Infestation severity assessment"
    },
    "crop_type": {
      "type": "string",
      "description": "Type of crop affected"
    },
    "location": {
      "type": "string",
      "description": "Farm location or field identifier"
    },
    "treatment_recommendation": {
      "type": "string",
      "description": "AI-generated treatment suggestions"
    },
    "status": {
      "type": "string",
      "enum": [
        "detected",
        "treating",
        "resolved"
      ],
      "default": "detected",
      "description": "Current status of the pest issue"
    },
    "notes": {
      "type": "string",
      "description": "Additional farmer notes"
    }
  },
  "required": [
    "image_url",
    "detected_pest", 
    "confidence_score"
  ]
};

// For now, create a simple component if this is being imported as a React component
export default function PestDetection() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-900">Pest Detection</h1>
      <p className="text-green-600">Pest detection functionality coming soon...</p>
    </div>
  );
}