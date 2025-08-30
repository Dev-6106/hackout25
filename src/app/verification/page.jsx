"use client";
import React, { useState, useEffect } from 'react';
import { 
  Camera, Upload, CheckCircle, XCircle, AlertCircle, 
  Loader2, Brain, Shield, Zap, Info, ChevronRight,
  TreePine, AlertTriangle, Trash2, Construction,
  Image as ImageIcon, MapPin, Calendar, Clock,Activity
} from 'lucide-react';
import Image from 'next/image';

const AIImageVerification = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, uploading, analyzing, complete, failed
  const [verificationResults, setVerificationResults] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Analysis steps for visual feedback
  const analysisSteps = [
    { name: 'Uploading Image', icon: Upload, duration: 1000 },
    { name: 'Detecting Objects', icon: Brain, duration: 2000 },
    { name: 'Analyzing Location', icon: MapPin, duration: 1500 },
    { name: 'Checking Satellite Data', icon: Zap, duration: 2000 },
    { name: 'Validating Report', icon: Shield, duration: 1000 }
  ];

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setVerificationStatus('idle');
      setVerificationResults(null);
    }
  };

  // Simulate AI verification process
  const runAIVerification = async () => {
    setVerificationStatus('uploading');
    setAnalysisStep(0);
    
    // Simulate each analysis step
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration));
    }

    // Simulate AI results
    const mockResults = {
      verified: true,
      confidence: 94.7,
      timestamp: new Date().toISOString(),
      detectedIssues: [
        {
          type: 'deforestation',
          confidence: 92.3,
          severity: 'high',
          description: 'Clear cutting of mangrove trees detected'
        },
        {
          type: 'debris',
          confidence: 87.5,
          severity: 'medium',
          description: 'Construction debris visible in protected area'
        }
      ],
      locationMatch: {
        verified: true,
        confidence: 96.8,
        coordinates: { lat: 19.0760, lng: 72.8777 },
        nearestLandmark: 'Mumbai Mangroves Reserve - Sector 4'
      },
      satelliteComparison: {
        changeDetected: true,
        changePercentage: 12.5,
        lastClearImage: '2024-01-10',
        affectedArea: '2.3 hectares'
      },
      recommendations: [
        'High priority - Immediate field verification recommended',
        'Alert local forest department',
        'Deploy rapid response team'
      ]
    };

    setVerificationResults(mockResults);
    setVerificationStatus('complete');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Image Verification
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our advanced AI system analyzes reported incidents using computer vision, 
          satellite data, and machine learning to ensure accuracy and prioritize responses.
        </p>
      </div>

      {/* Main Verification Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-green-600" />
            Upload Evidence
          </h2>

          {!previewUrl ? (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer bg-gray-50 hover:bg-green-50">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload image
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG or HEIC • Max 10MB
                </p>
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  width={500} 
                  height={300}
                  className="w-full h-auto object-cover"
                />
                {verificationStatus === 'complete' && verificationResults?.verified && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={runAIVerification}
                  disabled={verificationStatus !== 'idle'}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {verificationStatus === 'idle' ? (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Verify with AI
                    </>
                  ) : verificationStatus !== 'complete' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verified
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setVerificationStatus('idle');
                    setVerificationResults(null);
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Progress/Results */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-blue-600" />
            AI Analysis
          </h2>

          {verificationStatus === 'idle' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500">
                Upload an image to begin AI verification
              </p>
            </div>
          )}

          {(verificationStatus === 'uploading' || verificationStatus === 'analyzing') && (
            <div className="space-y-4">
              {analysisSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === analysisStep;
                const isComplete = index < analysisStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center p-4 rounded-lg transition-all ${
                      isActive ? 'bg-blue-50 border border-blue-200' :
                      isComplete ? 'bg-green-50 border border-green-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      isActive ? 'bg-blue-600' :
                      isComplete ? 'bg-green-600' :
                      'bg-gray-300'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <span className={`font-medium ${
                      isActive ? 'text-blue-900' :
                      isComplete ? 'text-green-900' :
                      'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                    {isActive && (
                      <Loader2 className="w-4 h-4 ml-auto text-blue-600 animate-spin" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {verificationStatus === 'complete' && verificationResults && (
            <div className="space-y-6">
              {/* Confidence Score */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                                   <span className="text-lg font-medium text-gray-700">Overall Confidence</span>
                  <span className="text-2xl font-bold text-green-600">{verificationResults.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${verificationResults.confidence}%` }}
                  />
                </div>
              </div>

              {/* Detected Issues */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Detected Issues
                </h3>
                <div className="space-y-3">
                  {verificationResults.detectedIssues.map((issue, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      issue.severity === 'high' ? 'bg-red-50 border-red-200' :
                      issue.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {issue.type === 'deforestation' && <TreePine className="w-4 h-4 text-red-600" />}
                            {issue.type === 'debris' && <Trash2 className="w-4 h-4 text-yellow-600" />}
                            {issue.type === 'construction' && <Construction className="w-4 h-4 text-orange-600" />}
                            <span className="font-medium text-gray-900 capitalize">
                              {issue.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                          issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {issue.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Verification */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location Verification
                </h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Location Match</span>
                    <span className="font-medium text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {verificationResults.locationMatch.confidence}% Match
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {verificationResults.locationMatch.nearestLandmark}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Coordinates: {verificationResults.locationMatch.coordinates.lat}, {verificationResults.locationMatch.coordinates.lng}
                  </p>
                </div>
              </div>

              {/* Satellite Comparison */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  Satellite Analysis
                </h3>
                <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Change Detected</span>
                    <span className={`font-medium ${
                      verificationResults.satelliteComparison.changeDetected ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {verificationResults.satelliteComparison.changeDetected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {verificationResults.satelliteComparison.changeDetected && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Change Percentage</span>
                        <span className="font-medium text-red-600">
                          {verificationResults.satelliteComparison.changePercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Affected Area</span>
                        <span className="font-medium text-gray-900">
                          {verificationResults.satelliteComparison.affectedArea}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Clear Image</span>
                        <span className="font-medium text-gray-900">
                          {new Date(verificationResults.satelliteComparison.lastClearImage).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-green-600" />
                  AI Recommendations
                </h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {verificationResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-600 transition-all">
                  Submit Verified Report
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  Flag for Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How AI Verification Works */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          How Our AI Verification Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ImageIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Image Analysis</h3>
                        <p className="text-sm text-gray-600">
              Computer vision identifies mangrove damage, pollution, and illegal activities
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Location Verification</h3>
            <p className="text-sm text-gray-600">
              GPS data is cross-referenced with known mangrove locations
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Satellite Comparison</h3>
            <p className="text-sm text-gray-600">
              Recent satellite imagery confirms changes in vegetation
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Threat Assessment</h3>
            <p className="text-sm text-gray-600">
              AI prioritizes incidents based on severity and environmental impact
            </p>
          </div>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Detection Accuracy</h3>
            <span className="text-2xl font-bold text-green-600">98.2%</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Our AI correctly identifies mangrove threats with industry-leading accuracy
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Deforestation</span>
              <span className="font-medium">99.1%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pollution</span>
              <span className="font-medium">97.8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Encroachment</span>
              <span className="font-medium">96.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Processing Speed</h3>
            <span className="text-2xl font-bold text-blue-600">30s</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Average time to complete full verification and analysis
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Real-time image processing</span>
            </div>
            <div className="flex items-center text-sm">
              <Zap className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Instant satellite comparison</span>
            </div>
            <div className="flex items-center text-sm">
              <Brain className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Automated threat assessment</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Reports Verified</h3>
            <span className="text-2xl font-bold text-purple-600">24.5K</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Total reports processed and verified by our AI system
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium text-green-600">+2,341</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">False Positives</span>
              <span className="font-medium text-red-600"> 2%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg Daily</span>
              <span className="font-medium">78</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent AI Verifications */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-green-600" />
          Recent AI Verifications
        </h2>
        
        <div className="space-y-4">
          {[
            {
              id: 1,
              location: 'Sundarbans East',
              type: 'Illegal Cutting',
              confidence: 96.2,
              status: 'verified',
              time: '5 minutes ago',
              severity: 'high'
            },
            {
              id: 2,
              location: 'Mumbai Mangroves',
              type: 'Waste Dumping',
              confidence: 89.7,
              status: 'verified',
              time: '12 minutes ago',
              severity: 'medium'
            },
            {
              id: 3,
              location: 'Bhitarkanika',
              type: 'Encroachment',
              confidence: 78.3,
              status: 'review',
              time: '25 minutes ago',
                            severity: 'low'
            },
            {
              id: 4,
              location: 'Pichavaram',
              type: 'Pollution',
              confidence: 94.5,
              status: 'verified',
              time: '1 hour ago',
              severity: 'high'
            }
          ].map((verification) => (
            <div key={verification.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  verification.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {verification.status === 'verified' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{verification.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      verification.severity === 'high' ? 'bg-red-100 text-red-700' :
                      verification.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {verification.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {verification.location} • {verification.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{verification.confidence}%</div>
                <div className="text-xs text-gray-500">AI Confidence</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mt-12">
        <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">AI Models Used</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>YOLOv8</strong> - Real-time object detection for identifying threats</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>ResNet-152</strong> - Deep learning for vegetation analysis</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>U-Net</strong> - Semantic segmentation for area calculation</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Custom CNN</strong> - Trained on 50K+ mangrove images</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Data Sources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Sentinel-2</strong> - 10m resolution satellite imagery</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Landsat 8</strong> - Historical comparison data</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Community Database</strong> - Verified incident history</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Weather APIs</strong> - Environmental context data</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageVerification;
             