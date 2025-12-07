
import React, { useState } from 'react';
import { Save, FileText, Sparkles, Brain, ChevronLeft, Mic, Network, Wand2, Upload, ZoomIn, Sun, Contrast, Eraser, Activity, History, Copy, Glasses, Microscope, Zap, ClipboardCheck, HardDrive, Printer, Ruler, Pen, MousePointer2, LayoutGrid, RefreshCw, Check, Cloud } from 'lucide-react';
import { Patient, ScanImage } from '../types';
import { generateMedicalSummary, generatePatientEducation, analyzeSymptoms } from '../services/geminiService';
import { api } from '../services/apiService';

interface ExamViewProps {
  patient: Patient;
  onBack: () => void;
}

const ExamView: React.FC<ExamViewProps> = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'optometry' | 'examination' | 'procedures' | 'imaging' | 'plan'>('history');
  
  // History & Symptoms
  const [symptoms, setSymptoms] = useState('');
  
  // Clinical Notes & Diagnosis
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState(patient.condition);
  const [treatmentPlan, setTreatmentPlan] = useState('');
  
  // Optometry Data
  const [arValues, setArValues] = useState({ od: { sph: '', cyl: '', axis: '' }, os: { sph: '', cyl: '', axis: '' } });
  const [nctValues, setNctValues] = useState({ od: '', os: '' });
  const [vaValues, setVaValues] = useState({ od: '6/6', os: '6/6' });
  const [isDeviceFetching, setIsDeviceFetching] = useState(false);

  // Procedure Data
  const [laserType, setLaserType] = useState('None');
  const [procedureNotes, setProcedureNotes] = useState('');

  // New State for EHR Sync
  const [isSyncing, setIsSyncing] = useState(false);
  const [ehrStatus, setEhrStatus] = useState<'idle' | 'synced' | 'error'>('idle');
  
  // AI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiEducation, setAiEducation] = useState<string | null>(null);
  const [observationSummary, setObservationSummary] = useState<string | null>(null);

  // Dictation State
  const [isListening, setIsListening] = useState(false);

  // Eye Diagram Markers
  const [markers, setMarkers] = useState<{x: number, y: number, eye: 'OD'|'OS', type: 'red'|'blue'|'green'}[]>([]);
  const [markerType, setMarkerType] = useState<'red'|'blue'|'green'>('red');

  // PACS Viewer State
  const [pacsMode, setPacsMode] = useState<'single' | 'compare'>('single');
  const [selectedScanIds, setSelectedScanIds] = useState<string[]>(['1']);
  const [pacsTool, setPacsTool] = useState<'pointer' | 'ruler' | 'pen'>('pointer');
  const [pacsAnnotations, setPacsAnnotations] = useState<{id: string, x: number, y: number, type: 'ruler' | 'pen', text?: string}[]>([]);

  // Templates
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock Images
  const mockScans: ScanImage[] = [
    { id: '1', type: 'OCT', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Optical_coherence_tomography_retina.jpg', date: '2023-11-28', aiAnalysis: 'Macular thickness normal. No signs of edema.' },
    { id: '2', type: 'Fundus', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Fundus_photograph_of_normal_left_eye.jpg/640px-Fundus_photograph_of_normal_left_eye.jpg', date: '2023-11-28', aiAnalysis: 'Cup-to-disc ratio 0.4. Healthy vasculature.' },
    { id: '3', type: 'OCT', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Optical_coherence_tomography_retina.jpg', date: '2023-10-15', aiAnalysis: 'Previous scan for comparison.' }
  ];

  const templates = [
      { label: "Normal Exam", text: "Lids/Lashes: Normal. Conjunctiva: Clear. Cornea: Clear. AC: Deep & Quiet. Iris: Normal pattern. Lens: Clear. Fundus: Disc pink, margins sharp. Macula healthy." },
      { label: "Cataract (Senile)", text: "Lids: Normal. Cornea: Clear. AC: Normal depth. Lens: NS Grade 2+, Cortical spokes present. Fundus: Hazy view, appears normal." },
      { label: "Conjunctivitis", text: "Lids: Mild edema. Conjunctiva: Diffuse congestion ++, Follicles +. Discharge: Mucoid. Cornea: Clear. AC: Quiet." },
      { label: "Diabetic Retinopathy", text: "Cornea: Clear. Lens: Clear. Fundus: Microaneurysms seen in post-pole. Dot/Blot hemes present. No neovascularization." }
  ];

  const applyTemplate = (text: string) => {
      setClinicalNotes(prev => prev + (prev ? "\n" : "") + text);
      setShowTemplates(false);
  };

  const handleAISummary = async () => {
    if (!clinicalNotes) return;
    setIsAnalyzing(true);
    const summary = await generateMedicalSummary(clinicalNotes);
    setTreatmentPlan(prev => prev + '\n\n--- AI Summary ---\n' + summary);
    setIsAnalyzing(false);
  };

  const handleObservationSummary = async () => {
    if (!clinicalNotes) return;
    setIsAnalyzing(true);
    const summary = await generateMedicalSummary(clinicalNotes);
    setObservationSummary(summary);
    setIsAnalyzing(false);
  };

  const handleAnalyzeSymptoms = async () => {
    if (!symptoms) return;
    setIsAnalyzing(true);
    const analysis = await analyzeSymptoms(symptoms);
    setAiSuggestion(analysis);
    setIsAnalyzing(false);
  };

  const handleGenerateEducation = async () => {
    if (!diagnosis) return;
    setIsAnalyzing(true);
    const edu = await generatePatientEducation(diagnosis);
    setAiEducation(edu);
    setIsAnalyzing(false);
  };

  const handleEHRSync = async () => {
    setIsSyncing(true);
    try {
        await api.patients.syncToEHR(patient.id, { diagnosis, treatmentPlan });
        setEhrStatus('synced');
    } catch (e) {
        setEhrStatus('error');
    } finally {
        setIsSyncing(false);
    }
  };

  const toggleDictation = () => {
    if (isListening) {
        setIsListening(false);
    } else {
        setIsListening(true);
        setTimeout(() => {
            setClinicalNotes(prev => prev + (prev ? " " : "") + "Patient reports mild photophobia in the left eye. Cornea appears clear.");
            setIsListening(false);
        }, 2000);
    }
  };

  const addMarker = (e: React.MouseEvent<HTMLDivElement>, eye: 'OD'|'OS') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMarkers([...markers, { x, y, eye, type: markerType }]);
  };

  const clearMarkers = () => setMarkers([]);

  const importLegacyData = () => {
    setClinicalNotes(prev => prev + "\n[LEGACY RECORD IMPORT - 2021]: Previous cataract surgery OD. Visual Acuity 6/9. IOP 14mmHg.");
    alert("Legacy patient records imported successfully.");
  };

  const fetchDeviceData = () => {
      setIsDeviceFetching(true);
      // Simulate API call to device
      setTimeout(() => {
          setArValues({
              od: { sph: '-1.25', cyl: '-0.50', axis: '180' },
              os: { sph: '-1.50', cyl: '-0.75', axis: '175' }
          });
          setNctValues({ od: '14', os: '15' });
          setIsDeviceFetching(false);
      }, 1000);
  };

  const handleScanClick = (id: string) => {
      if (pacsMode === 'compare') {
          if (selectedScanIds.includes(id)) {
              setSelectedScanIds(selectedScanIds.filter(sid => sid !== id));
          } else if (selectedScanIds.length < 2) {
              setSelectedScanIds([...selectedScanIds, id]);
          } else {
              // Replace the second one if full
              setSelectedScanIds([selectedScanIds[0], id]);
          }
      } else {
          setSelectedScanIds([id]);
      }
  };

  const handlePacsImageClick = (e: React.MouseEvent<HTMLDivElement>, scanId: string) => {
      if (pacsTool === 'pointer') return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPacsAnnotations([...pacsAnnotations, {
          id: scanId,
          x, y,
          type: pacsTool,
          text: pacsTool === 'ruler' ? `${(Math.random() * 50 + 200).toFixed(0)} μm` : 'Note'
      }]);
  };

  const tabs = [
    { id: 'history', label: 'History', icon: FileText },
    { id: 'optometry', label: 'Optometry', icon: Glasses },
    { id: 'examination', label: 'Doctor Workup', icon: Microscope },
    { id: 'procedures', label: 'Laser & FFA', icon: Zap },
    { id: 'imaging', label: 'PACS', icon: HardDrive },
    { id: 'plan', label: 'Diagnosis & Rx', icon: ClipboardCheck }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <img src={patient.avatarUrl} alt={patient.name} className="w-10 h-10 rounded-full border border-slate-200" />
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">{patient.name}</h1>
              <div className="text-xs text-slate-500 flex items-center space-x-2">
                <span>{patient.age} yrs</span>
                <span>•</span>
                <span>{patient.gender}</span>
                <span>•</span>
                <span className="font-mono text-slate-400">#{patient.id.padStart(5, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
             <Cloud className="w-3 h-3 text-emerald-500" />
             <span>All data saved to Cloud</span>
          </div>
          <button 
            onClick={importLegacyData}
            className="hidden md:flex items-center space-x-2 px-3 py-2 text-slate-600 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium hover:bg-amber-100 transition-all"
          >
            <History className="w-4 h-4 text-amber-600" />
            <span>Old Records</span>
          </button>
          <button 
            onClick={handleEHRSync}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                ehrStatus === 'synced' 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isSyncing ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
                <Network className="w-4 h-4" />
            )}
            <span>{ehrStatus === 'synced' ? 'Synced to EHR' : 'Sync to EHR'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium shadow-sm">
            <Save className="w-4 h-4" />
            <span>Save Case</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Clinical Form */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-slate-800 text-white shadow-md transform scale-105' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-slate-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="max-w-5xl space-y-6">
            
            {/* --- TAB: HISTORY --- */}
            {activeTab === 'history' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span>Chief Complaint & History</span>
                    </h3>
                    <button 
                       onClick={handleAnalyzeSymptoms}
                       disabled={isAnalyzing || !symptoms}
                       className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-medium flex items-center hover:bg-indigo-100 disabled:opacity-50 transition-colors border border-indigo-100"
                    >
                      <Brain className="w-3 h-3 mr-1.5" />
                      Analyze Symptoms
                    </button>
                  </div>
                  <textarea 
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none text-slate-700 resize-none transition-shadow"
                    placeholder="Enter patient symptoms (e.g., 'Gradual vision loss in OD, Glare at night')..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                   {/* AI Suggestion Box */}
                   {aiSuggestion && (
                    <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl animate-fadeIn">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-indigo-900 mb-1">Differential Diagnosis & Suggestions</h4>
                            <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                            {aiSuggestion}
                            </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-700 mb-3">Systemic History</h4>
                        <div className="space-y-2">
                            {['Diabetes', 'Hypertension', 'Cardiac', 'Asthma'].map(item => (
                                <label key={item} className="flex items-center space-x-3">
                                    <input type="checkbox" className="rounded text-primary-600" />
                                    <span className="text-slate-600 text-sm">{item}</span>
                                </label>
                            ))}
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-700 mb-3">Ocular History</h4>
                        <div className="space-y-2">
                            {['Glaucoma', 'Cataract Surgery', 'Retinal Detachment', 'Trauma'].map(item => (
                                <label key={item} className="flex items-center space-x-3">
                                    <input type="checkbox" className="rounded text-primary-600" />
                                    <span className="text-slate-600 text-sm">{item}</span>
                                </label>
                            ))}
                        </div>
                     </div>
                </div>
              </div>
            )}

            {/* --- TAB: OPTOMETRY --- */}
            {activeTab === 'optometry' && (
              <div className="space-y-6 animate-fadeIn">
                 {/* Auto Refraction Card */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 text-lg">Auto Refraction (AR)</h3>
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={fetchDeviceData}
                                disabled={isDeviceFetching}
                                className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-100"
                            >
                                {isDeviceFetching ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                                <span>{isDeviceFetching ? 'Fetching...' : 'Fetch from Device'}</span>
                            </button>
                            <div className="text-xs bg-slate-100 px-3 py-1 rounded text-slate-500">Machine: Topcon-800</div>
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-center">
                           <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold">
                               <tr>
                                   <th className="py-2 px-4 rounded-l-lg">Eye</th>
                                   <th className="py-2 px-4">Sphere (SPH)</th>
                                   <th className="py-2 px-4">Cylinder (CYL)</th>
                                   <th className="py-2 px-4 rounded-r-lg">Axis</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                               <tr>
                                   <td className="py-4 font-bold text-slate-700">OD</td>
                                   <td className="px-2"><input value={arValues.od.sph} onChange={e => setArValues({...arValues, od: {...arValues.od, sph: e.target.value}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input value={arValues.od.cyl} onChange={e => setArValues({...arValues, od: {...arValues.od, cyl: e.target.value}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input value={arValues.od.axis} onChange={e => setArValues({...arValues, od: {...arValues.od, axis: e.target.value}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="0°" /></td>
                               </tr>
                               <tr>
                                   <td className="py-4 font-bold text-slate-700">OS</td>
                                   <td className="px-2"><input value={arValues.os.sph} onChange={e => setArValues({...arValues, os: {...arValues.os, sph: e.target.value}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input value={arValues.os.cyl} onChange={e => setArValues({...arValues, os: {...arValues.os, cyl: e.target.value}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input value={arValues.os.axis} onChange={e => setArValues({...arValues, os: {...arValues.os, axis: e.target.value}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="0°" /></td>
                               </tr>
                           </tbody>
                        </table>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Acuity */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Visual Acuity (Unaided)</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-600">OD</span>
                                <input value={vaValues.od} onChange={e => setVaValues({...vaValues, od: e.target.value})} className="w-32 p-2 border border-slate-200 rounded text-center" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-600">OS</span>
                                <input value={vaValues.os} onChange={e => setVaValues({...vaValues, os: e.target.value})} className="w-32 p-2 border border-slate-200 rounded text-center" />
                            </div>
                        </div>
                    </div>

                    {/* NCT / IOP */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">IOP (NCT / Applanation)</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-600">OD</span>
                                <div className="relative w-32">
                                    <input value={nctValues.od} onChange={e => setNctValues({...nctValues, od: e.target.value})} className="w-full p-2 border border-slate-200 rounded text-center" placeholder="--" />
                                    <span className="absolute right-2 top-2 text-xs text-slate-400">mmHg</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-600">OS</span>
                                <div className="relative w-32">
                                    <input value={nctValues.os} onChange={e => setNctValues({...nctValues, os: e.target.value})} className="w-full p-2 border border-slate-200 rounded text-center" placeholder="--" />
                                    <span className="absolute right-2 top-2 text-xs text-slate-400">mmHg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Subjective Acceptance */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-2">Subjective Acceptance (Final Rx)</h3>
                     <p className="text-xs text-slate-500 mb-4">Enter the final power prescription.</p>
                     
                     <div className="overflow-x-auto">
                        <table className="w-full text-center">
                           <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold">
                               <tr>
                                   <th className="py-2 px-4">Eye</th>
                                   <th className="py-2 px-4">Sphere</th>
                                   <th className="py-2 px-4">Cylinder</th>
                                   <th className="py-2 px-4">Axis</th>
                                   <th className="py-2 px-4 text-blue-600">Add</th>
                                   <th className="py-2 px-4 text-green-600">VA (Best)</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                               <tr>
                                   <td className="py-4 font-bold text-slate-700">OD</td>
                                   <td className="px-2"><input className="w-20 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-slate-200 rounded text-center" placeholder="0°" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-blue-200 bg-blue-50/50 rounded text-center" placeholder="+0.00" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-green-200 bg-green-50/50 rounded text-center font-bold" placeholder="6/6" /></td>
                               </tr>
                               <tr>
                                   <td className="py-4 font-bold text-slate-700">OS</td>
                                   <td className="px-2"><input className="w-20 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-slate-200 rounded text-center" placeholder="0°" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-blue-200 bg-blue-50/50 rounded text-center" placeholder="+0.00" /></td>
                                   <td className="px-2"><input className="w-20 p-2 border border-green-200 bg-green-50/50 rounded text-center font-bold" placeholder="6/6" /></td>
                               </tr>
                           </tbody>
                        </table>
                     </div>
                 </div>
              </div>
            )}

            {/* --- TAB: EXAMINATION (Doctor Workup) --- */}
            {activeTab === 'examination' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-slate-400" />
                      <span>Doctor Drawing (Eye Diagram)</span>
                    </h3>
                    <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
                        <button onClick={() => setMarkerType('red')} className={`w-6 h-6 rounded-md bg-red-500 shadow-sm ${markerType === 'red' ? 'ring-2 ring-offset-1 ring-red-500' : ''}`} title="Hemorrhage / Vessel" />
                        <button onClick={() => setMarkerType('blue')} className={`w-6 h-6 rounded-md bg-blue-500 shadow-sm ${markerType === 'blue' ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`} title="Edema / Fluid" />
                        <button onClick={() => setMarkerType('green')} className={`w-6 h-6 rounded-md bg-green-500 shadow-sm ${markerType === 'green' ? 'ring-2 ring-offset-1 ring-green-500' : ''}`} title="Filter / Laser" />
                        <button onClick={clearMarkers} className="px-2 py-0.5 text-xs text-slate-600 hover:bg-white rounded-md flex items-center transition-colors">
                            <Eraser className="w-3 h-3 mr-1" /> Clear
                        </button>
                    </div>
                  </div>
                  <div className="flex justify-around items-center border border-slate-100 rounded-xl p-6 bg-slate-50/50">
                        {/* OD */}
                        <div className="text-center relative group">
                            <span className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">OD (Right)</span>
                            <div 
                                className="w-48 h-48 rounded-full border-4 border-slate-300 bg-white relative cursor-crosshair shadow-inner mx-auto"
                                onClick={(e) => addMarker(e, 'OD')}
                            >
                                <div className="absolute inset-0 m-auto w-20 h-20 rounded-full border-2 border-slate-200 opacity-50" /> {/* Pupil */}
                                <div className="absolute inset-0 m-auto w-0.5 h-full bg-slate-100" /> 
                                <div className="absolute inset-0 m-auto h-0.5 w-full bg-slate-100" /> 
                                {markers.filter(m => m.eye === 'OD').map((m, i) => (
                                    <div key={i} className={`absolute w-3 h-3 rounded-full shadow-sm transform -translate-x-1/2 -translate-y-1/2 border border-white ${
                                        m.type === 'red' ? 'bg-red-500' : m.type === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                                    }`} style={{ left: m.x, top: m.y }} />
                                ))}
                            </div>
                        </div>
                         {/* OS */}
                         <div className="text-center relative group">
                            <span className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">OS (Left)</span>
                            <div 
                                className="w-48 h-48 rounded-full border-4 border-slate-300 bg-white relative cursor-crosshair shadow-inner mx-auto"
                                onClick={(e) => addMarker(e, 'OS')}
                            >
                                <div className="absolute inset-0 m-auto w-20 h-20 rounded-full border-2 border-slate-200 opacity-50" /> 
                                <div className="absolute inset-0 m-auto w-0.5 h-full bg-slate-100" /> 
                                <div className="absolute inset-0 m-auto h-0.5 w-full bg-slate-100" /> 
                                {markers.filter(m => m.eye === 'OS').map((m, i) => (
                                    <div key={i} className={`absolute w-3 h-3 rounded-full shadow-sm transform -translate-x-1/2 -translate-y-1/2 border border-white ${
                                        m.type === 'red' ? 'bg-red-500' : m.type === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                                    }`} style={{ left: m.x, top: m.y }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800">Slit Lamp Examination</h3>
                    <div className="flex space-x-2 relative">
                        {/* Templates Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setShowTemplates(!showTemplates)}
                                className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-lg font-medium flex items-center hover:bg-blue-100 transition-colors"
                            >
                                <Copy className="w-3.5 h-3.5 mr-1.5" />
                                Use Template
                            </button>
                            {showTemplates && (
                                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 max-h-60 overflow-y-auto">
                                    <p className="text-xs font-semibold text-slate-500 uppercase px-2 py-1 mb-1">Select Condition</p>
                                    {templates.map((t, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => applyTemplate(t.text)}
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0"
                                        >
                                            <div className="font-medium text-slate-900">{t.label}</div>
                                            <div className="text-xs text-slate-500 truncate">{t.text}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <button 
                            onClick={handleObservationSummary}
                            disabled={isAnalyzing || !clinicalNotes}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-medium flex items-center transition-colors"
                        >
                            <Wand2 className="w-3.5 h-3.5 mr-1.5" />
                            Summarize
                        </button>
                        <button 
                            onClick={toggleDictation}
                            className={`p-2 rounded-lg transition-all ${isListening ? 'bg-red-50 text-red-600 ring-2 ring-red-200 animate-pulse' : 'text-slate-400 hover:text-primary-600 hover:bg-slate-50'}`}
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                  <textarea 
                    className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none text-slate-700 transition-shadow font-mono text-sm leading-relaxed"
                    placeholder="Describe Cornea, AC, Iris, Lens, Fundus..."
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                  />
                  
                  {observationSummary && (
                    <div className="mt-4 p-4 bg-violet-50 border border-violet-100 rounded-xl animate-fadeIn">
                        <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="w-4 h-4 text-violet-600" />
                            <h4 className="text-sm font-semibold text-violet-900">AI Summary</h4>
                        </div>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{observationSummary}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- TAB: PROCEDURES (Laser & FFA) --- */}
            {activeTab === 'procedures' && (
              <div className="space-y-6 animate-fadeIn">
                  {/* Laser Workup */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                      <div className="flex items-center space-x-3 mb-6">
                          <div className="bg-rose-100 p-2 rounded-lg">
                             <Zap className="w-6 h-6 text-rose-600" />
                          </div>
                          <div>
                              <h3 className="font-bold text-slate-800 text-lg">Laser Workup</h3>
                              <p className="text-xs text-slate-500">Document photocoagulation or capsulotomy details</p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Procedure Type</label>
                              <select 
                                value={laserType} 
                                onChange={(e) => setLaserType(e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                              >
                                  <option>None</option>
                                  <option>Pan Retinal Photocoagulation (PRP)</option>
                                  <option>Macular Grid Laser</option>
                                  <option>YAG Capsulotomy</option>
                                  <option>YAG PI (Iridotomy)</option>
                                  <option>Barrage Laser</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Eye</label>
                              <div className="flex space-x-4">
                                  <label className="flex items-center space-x-2"><input type="radio" name="laserEye" /> <span>OD</span></label>
                                  <label className="flex items-center space-x-2"><input type="radio" name="laserEye" /> <span>OS</span></label>
                                  <label className="flex items-center space-x-2"><input type="radio" name="laserEye" /> <span>OU</span></label>
                              </div>
                          </div>
                      </div>

                      {laserType !== 'None' && (
                          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 animate-fadeIn">
                               <div>
                                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Power (mW)</label>
                                   <input type="number" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="200" />
                               </div>
                               <div>
                                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Spot Size (μm)</label>
                                   <input type="number" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="100" />
                               </div>
                               <div>
                                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Duration (ms)</label>
                                   <input type="number" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="100" />
                               </div>
                               <div>
                                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Shot Count</label>
                                   <input type="number" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="0" />
                               </div>
                          </div>
                      )}
                  </div>

                  {/* FFA Workup */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-indigo-500">
                      <div className="flex items-center space-x-3 mb-6">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                             <Activity className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                              <h3 className="font-bold text-slate-800 text-lg">FFA Workup</h3>
                              <p className="text-xs text-slate-500">Fundus Fluorescein Angiography details</p>
                          </div>
                      </div>

                      <div className="space-y-4">
                           <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2 text-sm font-medium">
                                    <input type="checkbox" className="rounded text-indigo-600" />
                                    <span>Consent Obtained</span>
                                </label>
                                <label className="flex items-center space-x-2 text-sm font-medium">
                                    <input type="checkbox" className="rounded text-indigo-600" />
                                    <span>Sensitivity Test Done</span>
                                </label>
                           </div>
                           
                           <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Angiography Notes</label>
                                <textarea 
                                    className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    placeholder="Arm-to-retina time, phases observed (arterial, venous, recirculation), leakage areas..." 
                                    value={procedureNotes}
                                    onChange={(e) => setProcedureNotes(e.target.value)}
                                />
                           </div>
                      </div>
                  </div>
              </div>
            )}

            {/* --- TAB: IMAGING (PACS) --- */}
            {activeTab === 'imaging' && (
                <div className="space-y-6 animate-fadeIn h-[700px] flex flex-col">
                    <div className="flex justify-between items-center bg-slate-900 p-3 rounded-t-xl">
                        <div className="flex items-center space-x-4 text-slate-300">
                             <h3 className="font-bold text-white text-lg">Netram PACS</h3>
                             <div className="h-4 w-px bg-slate-700" />
                             {/* Tools */}
                             <button 
                                onClick={() => setPacsTool('pointer')}
                                className={`p-1.5 rounded transition-colors ${pacsTool === 'pointer' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                                title="Pointer"
                             >
                                 <MousePointer2 className="w-5 h-5" />
                             </button>
                             <button 
                                onClick={() => setPacsTool('ruler')}
                                className={`p-1.5 rounded transition-colors ${pacsTool === 'ruler' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                                title="Measure (RNFL Thickness)"
                             >
                                 <Ruler className="w-5 h-5" />
                             </button>
                             <button 
                                onClick={() => setPacsTool('pen')}
                                className={`p-1.5 rounded transition-colors ${pacsTool === 'pen' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                                title="Annotate"
                             >
                                 <Pen className="w-5 h-5" />
                             </button>
                             <div className="h-4 w-px bg-slate-700" />
                             <button 
                                onClick={() => setPacsMode(pacsMode === 'single' ? 'compare' : 'single')}
                                className={`p-1.5 rounded transition-colors ${pacsMode === 'compare' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                                title="Comparison View"
                             >
                                 <LayoutGrid className="w-5 h-5" />
                             </button>
                        </div>
                        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-primary-500">
                            <Upload className="w-4 h-4" />
                            <span>Upload DICOM</span>
                        </button>
                    </div>

                    <div className="flex-1 bg-black flex overflow-hidden rounded-b-xl border border-slate-900 shadow-2xl">
                        {/* Thumbnails */}
                        <div className="w-36 bg-slate-900 overflow-y-auto p-2 space-y-2 border-r border-slate-800">
                             {mockScans.map(scan => {
                                 const isSelected = selectedScanIds.includes(scan.id);
                                 return (
                                     <div 
                                        key={scan.id} 
                                        onClick={() => handleScanClick(scan.id)}
                                        className={`aspect-square bg-black rounded border-2 overflow-hidden relative cursor-pointer transition-all ${
                                            isSelected ? 'border-primary-500 ring-2 ring-primary-500/50' : 'border-slate-700 hover:border-slate-500'
                                        }`}
                                    >
                                         <img src={scan.url} className="w-full h-full object-cover opacity-80" alt={scan.type} />
                                         <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black/60 px-1 rounded backdrop-blur-sm">{scan.type}</span>
                                         {isSelected && (
                                             <div className="absolute top-1 left-1 bg-primary-600 rounded-full p-0.5">
                                                 <Check className="w-3 h-3 text-white" />
                                             </div>
                                         )}
                                     </div>
                                 );
                             })}
                        </div>

                        {/* Viewport */}
                        <div className={`flex-1 relative flex bg-black ${pacsMode === 'compare' ? 'flex-row' : ''}`}>
                            {selectedScanIds.map((id, index) => {
                                const scan = mockScans.find(s => s.id === id);
                                if (!scan) return null;
                                return (
                                    <div 
                                        key={id} 
                                        className={`relative flex-1 flex items-center justify-center overflow-hidden border-r border-slate-800 last:border-0 cursor-${pacsTool === 'pointer' ? 'default' : 'crosshair'}`}
                                        onClick={(e) => handlePacsImageClick(e, id)}
                                    >
                                        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                                        
                                        <img src={scan.url} className="max-w-full max-h-full object-contain pointer-events-none select-none" alt="Scan" />
                                        
                                        {/* Overlay Metadata */}
                                        <div className="absolute top-4 left-4 text-white text-xs font-mono space-y-1 pointer-events-none">
                                            <p className="text-primary-400 font-bold">NAME: {patient.name.toUpperCase()}</p>
                                            <p>ID: {patient.id}</p>
                                            <p>DOB: 1980-05-12</p>
                                            <p>DATE: {scan.date}</p>
                                            <p>MOD: {scan.type}</p>
                                        </div>

                                        {/* Annotations Overlay */}
                                        {pacsAnnotations.filter(a => a.id === id).map((a, i) => (
                                            <div key={i} className="absolute pointer-events-none" style={{ left: a.x, top: a.y }}>
                                                {a.type === 'ruler' && (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-24 h-0.5 bg-yellow-400 shadow-sm relative">
                                                            <div className="absolute -left-1 -top-1 w-2 h-2 bg-yellow-400 rounded-full" />
                                                            <div className="absolute -right-1 -top-1 w-2 h-2 bg-yellow-400 rounded-full" />
                                                        </div>
                                                        <span className="text-xs text-yellow-400 font-bold bg-black/50 px-1 rounded mt-1">{a.text}</span>
                                                    </div>
                                                )}
                                                {a.type === 'pen' && (
                                                    <div className="text-red-500 font-bold text-lg">× {a.text}</div>
                                                )}
                                            </div>
                                        ))}

                                        {/* AI Analysis Overlay (Only on first for simplicity in compare) */}
                                        {scan.aiAnalysis && index === 0 && pacsMode === 'single' && (
                                            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700 text-slate-300 text-sm flex items-start space-x-3 max-w-2xl mx-auto pointer-events-none">
                                                <Sparkles className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="font-bold text-white block mb-1">AI Analysis (v2.5)</span>
                                                    <p>{scan.aiAnalysis}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            
                            {selectedScanIds.length === 0 && (
                                <div className="flex-1 flex items-center justify-center text-slate-600 text-sm">
                                    Select a scan to view
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB: PLAN --- */}
            {activeTab === 'plan' && (
              <div className="space-y-6 animate-fadeIn">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Diagnosis</h3>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none font-medium text-lg" 
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="e.g. Ocular Hypertension OD"
                    />
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <h3 className="font-bold text-slate-800">Treatment Plan & Rx</h3>
                      <button 
                        onClick={handleAISummary}
                        disabled={isAnalyzing || !clinicalNotes}
                        className="text-xs bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-2" />
                        Generate Plan from Notes
                      </button>
                    </div>
                    <textarea 
                      className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none text-slate-700 transition-shadow relative z-10 font-mono text-sm"
                      value={treatmentPlan}
                      onChange={(e) => setTreatmentPlan(e.target.value)}
                      placeholder="Medications, Surgery advice, Follow-up..."
                    />
                    <div className="mt-4 flex justify-end">
                         <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                             <Printer className="w-4 h-4" />
                             <span>Print Prescription</span>
                         </button>
                    </div>
                 </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Panel: AI Sidebar */}
        <div className="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-primary-600 mb-1">
              <Brain className="w-5 h-5" />
              <span className="font-bold tracking-tight">Netram Intelligence</span>
            </div>
            <p className="text-xs text-slate-400">Clinical Decision Support System</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Patient Education Card */}
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
              <div className="flex items-center justify-between mb-3">
                 <h4 className="font-semibold text-sky-900 text-sm">Patient Education</h4>
                 <button 
                  onClick={handleGenerateEducation}
                  disabled={isAnalyzing}
                  className="text-xs bg-white text-sky-600 border border-sky-200 px-2 py-1 rounded hover:bg-sky-50 transition-colors"
                 >
                   Generate
                 </button>
              </div>
              <p className="text-xs text-sky-700 mb-3 leading-relaxed">
                Create simplified material for <strong>{diagnosis || 'current condition'}</strong>.
              </p>
              {aiEducation ? (
                <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-sky-100 shadow-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                   {aiEducation}
                </div>
              ) : (
                <div className="h-24 border-2 border-dashed border-sky-200 rounded-lg flex items-center justify-center text-sky-300 text-xs">
                   Content will appear here
                </div>
              )}
            </div>

             {/* Quick Actions */}
             <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-3">Quick Actions</h4>
                <div className="space-y-2">
                   <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-600 transition-colors border border-slate-100">
                      Check Drug Interactions
                   </button>
                   <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-600 transition-colors border border-slate-100">
                      Compare Previous VF Scans
                   </button>
                   <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-600 transition-colors border border-slate-100">
                      Draft Referral Letter
                   </button>
                </div>
             </div>
             
             {/* EHR Info */}
             <div className="border-t border-slate-100 pt-4">
                <h4 className="font-semibold text-slate-800 text-sm mb-2">Connected EHR</h4>
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>System:</span>
                    <span className="font-mono bg-slate-100 px-2 py-1 rounded">Epic / FHIR</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>Ext. ID:</span>
                    <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                        {patient.ehrId || 'Not Linked'}
                    </span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamView;
