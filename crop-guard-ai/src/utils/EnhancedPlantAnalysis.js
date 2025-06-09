// ====================================================================
// ROBOFLOW + GROQ INTEGRATION
// ====================================================================
// Roboflow for disease detection + Groq for AI recommendations

class EnhancedPlantAnalysis {
 constructor() {
  this.roboflowApiKey = import.meta.env.VITE_ROBOFLOW_API_KEY;
  this.groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  this.roboflowEndpoint = 'https://detect.roboflow.com/plantvillage-dataset/1';
}

  // ====================================================================
  // ROBOFLOW DISEASE DETECTION
  // ====================================================================

  async detectPlantDisease(imageFile) {
    try {
      const base64Image = await this.imageToBase64(imageFile);
      
      const response = await fetch(
        `${this.roboflowEndpoint}?api_key=${this.roboflowApiKey}&confidence=50&overlap=50`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: base64Image
        }
      );

      if (!response.ok) {
        throw new Error(`Roboflow API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return this.processRoboflowResults(result);

    } catch (error) {
      console.error('Roboflow detection error:', error);
      throw error;
    }
  }

  processRoboflowResults(apiResponse) {
    const { predictions } = apiResponse;
    
    if (!predictions || predictions.length === 0) {
      return {
        disease_detected: false,
        disease_name: null,
        confidence_score: 0,
        severity_level: 'none'
      };
    }

    const topPrediction = predictions.reduce((max, pred) => 
      pred.confidence > max.confidence ? pred : max
    );

    return {
      disease_detected: true,
      disease_name: topPrediction.class,
      confidence_score: topPrediction.confidence / 100,
      severity_level: this.calculateSeverity(topPrediction.confidence),
      all_detections: predictions
    };
  }

  // ====================================================================
  // GROQ AI RECOMMENDATIONS
  // ====================================================================

  async getGroqRecommendations(diseaseInfo) {
    try {
      const prompt = this.createPromptForLLM(diseaseInfo);
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are an agricultural expert specializing in plant disease management. Always respond with valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return this.parseGroqResponse(result);

    } catch (error) {
      console.error('Groq API error:', error);
      return this.getFallbackRecommendations(diseaseInfo);
    }
  }

  // ====================================================================
  // PROMPT CREATION
  // ====================================================================

  createPromptForLLM(diseaseInfo) {
    if (!diseaseInfo.disease_detected) {
      return `A plant appears healthy with no diseases detected. Provide 3 general plant care tips and 3 prevention strategies to keep plants healthy. 

Format your response as JSON:
{
  "treatment_recommendation": "general care advice",
  "prevention_tips": ["tip1", "tip2", "tip3"],
  "recovery_timeline": "ongoing maintenance",
  "warning_signs": ["sign1", "sign2", "sign3"]
}`;
    }

    return `Plant disease detected: ${diseaseInfo.disease_name} with ${(diseaseInfo.confidence_score * 100).toFixed(1)}% confidence. Severity: ${diseaseInfo.severity_level}.

Please provide:
1. Immediate treatment recommendation 
2. 4-5 specific prevention tips
3. Timeline for expected recovery
4. Warning signs to watch for

Format response as JSON:
{
  "treatment_recommendation": "detailed treatment steps",
  "prevention_tips": ["tip1", "tip2", "tip3", "tip4", "tip5"],
  "recovery_timeline": "expected timeline",
  "warning_signs": ["sign1", "sign2", "sign3"]
}

Keep advice practical and actionable for home gardeners.`;
  }

  // ====================================================================
  // RESPONSE PARSER
  // ====================================================================

  parseGroqResponse(result) {
    try {
      const content = result.choices[0]?.message?.content || '';
      
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Validate required fields
        if (parsed.treatment_recommendation && parsed.prevention_tips) {
          return parsed;
        }
      }
      
      // If JSON parsing fails, try to extract text manually
      return this.extractFromText(content);
      
    } catch (error) {
      console.error('Error parsing Groq response:', error);
      return this.getFallbackRecommendations();
    }
  }

  extractFromText(text) {
    // Fallback text parsing if JSON fails
    const lines = text.split('\n').filter(line => line.trim());
    
    return {
      treatment_recommendation: lines.find(line => 
        line.toLowerCase().includes('treatment') || 
        line.toLowerCase().includes('recommend')
      ) || 'Follow general plant care practices.',
      prevention_tips: [
        'Monitor plants regularly',
        'Ensure proper drainage',
        'Practice crop rotation',
        'Remove diseased material promptly'
      ],
      recovery_timeline: '2-4 weeks with proper treatment',
      warning_signs: ['Spreading symptoms', 'Worsening discoloration', 'Wilting leaves']
    };
  }

  // ====================================================================
  // MAIN ANALYSIS FUNCTION
  // ====================================================================

  async analyzeComplete(imageFile) {
    try {
      // Step 1: Detect disease with Roboflow
      console.log('🔍 Detecting disease...');
      const diseaseResults = await this.detectPlantDisease(imageFile);
      
      // Step 2: Get AI recommendations from Groq
      console.log('🤖 Getting AI recommendations...');
      const aiRecommendations = await this.getGroqRecommendations(diseaseResults);
      
      // Step 3: Combine results
      return {
        // Disease detection
        pest_detected: diseaseResults.disease_detected,
        pest_name: diseaseResults.disease_name || 'No disease detected',
        confidence_score: diseaseResults.confidence_score,
        severity_level: diseaseResults.severity_level,
        
        // Crop identification
        crop_type: this.extractCropFromDisease(diseaseResults.disease_name),
        
        // AI-generated recommendations
        treatment_recommendation: aiRecommendations.treatment_recommendation,
        prevention_tips: aiRecommendations.prevention_tips || [],
        recovery_timeline: aiRecommendations.recovery_timeline || '2-4 weeks with proper treatment',
        warning_signs: aiRecommendations.warning_signs || [],
        
        // Meta info
        immediate_action_needed: diseaseResults.severity_level === 'high',
        image_url: URL.createObjectURL(imageFile),
        analysis_source: 'roboflow + groq',
        timestamp: new Date().toISOString(),
        
        // Additional details for debugging
        roboflow_raw: diseaseResults,
        groq_raw: aiRecommendations
      };

    } catch (error) {
      console.error('Complete analysis error:', error);
      throw error;
    }
  }

  // ====================================================================
  // HELPER FUNCTIONS
  // ====================================================================

  async imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  calculateSeverity(confidence) {
    if (confidence > 80) return 'high';
    if (confidence > 60) return 'moderate';
    if (confidence > 40) return 'low';
    return 'uncertain';
  }

  extractCropFromDisease(diseaseName) {
    if (!diseaseName) return 'Unknown';
    
    const crops = ['tomato', 'potato', 'corn', 'apple', 'grape', 'pepper', 'strawberry', 'bean', 'cucumber', 'lettuce'];
    for (const crop of crops) {
      if (diseaseName.toLowerCase().includes(crop)) {
        return crop.charAt(0).toUpperCase() + crop.slice(1);
      }
    }
    return 'Unknown crop';
  }

  getFallbackRecommendations(diseaseInfo = {}) {
    return {
      treatment_recommendation: diseaseInfo.disease_detected 
        ? 'Consult with local agricultural extension service for specific treatment advice. Remove affected plant parts and improve air circulation.'
        : 'Continue regular plant monitoring and maintain good garden hygiene. Ensure proper watering and nutrition.',
      prevention_tips: [
        'Regular plant inspection and monitoring',
        'Proper plant spacing for air circulation',
        'Avoid overhead watering when possible',
        'Remove diseased plant material promptly',
        'Practice crop rotation annually',
        'Use disease-resistant plant varieties'
      ],
      recovery_timeline: '2-4 weeks with proper treatment',
      warning_signs: ['Spreading symptoms', 'New discoloration', 'Wilting leaves', 'Stunted growth']
    };
  }

  // ====================================================================
  // VALIDATION HELPERS
  // ====================================================================

  validateApiKeys() {
    const errors = [];
    
    if (!this.roboflowApiKey) {
      errors.push('Roboflow API key is missing. Add REACT_APP_ROBOFLOW_API_KEY to your .env.local file.');
    }
    
    if (!this.groqApiKey) {
      errors.push('Groq API key is missing. Add REACT_APP_GROQ_API_KEY to your .env.local file.');
    }
    
    return errors;
  }
}

// ====================================================================
// USAGE IN REACT COMPONENT
// ====================================================================

const analyzeImageWithAI = async () => {
  if (!selectedFile) return;

  setAnalyzing(true);
  setError(null);

  try {
    const analyzer = new EnhancedPlantAnalysis();
    
    // Validate API keys first
    const keyErrors = analyzer.validateApiKeys();
    if (keyErrors.length > 0) {
      throw new Error(`Configuration error: ${keyErrors.join(' ')}`);
    }
    
    // Run complete analysis
    const results = await analyzer.analyzeComplete(selectedFile);
    
    setResults(results);

  } catch (error) {
    setError(`Analysis failed: ${error.message}`);
    console.error('AI analysis error:', error);
  } finally {
    setAnalyzing(false);
  }
};

export default EnhancedPlantAnalysis;