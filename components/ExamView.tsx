
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Save, FileText, Sparkles, Brain, ChevronLeft, Mic, Network, Wand2, Upload, ZoomIn, Sun, Contrast, Eraser, Activity, History, Copy, Glasses, Microscope, Zap, ClipboardCheck, HardDrive, Printer, Ruler, Pen, MousePointer2, LayoutGrid, RefreshCw, Check, Cloud, Send, MessageSquare, StopCircle, Volume2, ShieldCheck, Cpu, Calculator, Divide, ScanLine, Box, Glasses as GlassesIcon } from 'lucide-react';
import { Patient, ScanImage, ChatMessage, User } from '../types';
import { generateMedicalSummary, generatePatientEducation, analyzeSymptoms, generateScribeNotes, queryPatientData, getDecisionSupport } from '../services/geminiService';
import { api } from '../services/apiService';

interface ExamViewProps {
  patient: Patient;
  onBack: () => void;
  currentUser: User;
}

const ExamView: React.FC<ExamViewProps> = ({ patient, onBack, currentUser }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'optometry' | 'examination' | 'procedures' | 'imaging' | 'plan'>('history');
  
  // Optimization: Consolidate related states to reduce re-renders and hook overhead
  const [clinicalState, setClinicalState] = useState({
    symptoms: '',
    notes: '',
    diagnosis: patient.condition,
    plan: ''
  });

  const [optometryState, setOptometryState] = useState({
    ar: { od: { sph: '', cyl: '', axis: '' }, os: { sph: '', cyl: '', axis: '' } },
    nct: { od: '', os: '' },
    va: { od: '6/6', os: '6/6' }
  });

  // UI States
  const [uiState, setUiState] = useState({
      isAnalyzing: false,
      isSyncing: false,
      isDeviceFetching: false,
      ehrStatus: 'idle' as 'idle' | 'synced' | 'error',
      showTemplates: false,
      showCalculator: false,
      calculatorType: 'IOL' as 'IOL' | 'Transposition'
  });

  // AI & Data States
  const [aiData, setAiData] = useState({
      suggestion: null as string | null,
      education: null as string | null,
      summary: null as string | null,
      cds: null as {confidence: number, recommendations: string[], models: string[]} | null
  });

  // Scribe State
  const [isScribeActive, setIsScribeActive] = useState(false);
  const [scribeText, setScribeText] = useState('');
  const scribeIntervalRef = useRef<number | null>(null);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
      { id: '1', role: 'ai', text: `Hello ${currentUser.name}. I am your EyeCloud Copilot. I have analyzed ${patient.name}'s records. Ask me anything about their history or for clinical decision support.`, timestamp: new Date() }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Interactive Tools State
  const [markers, setMarkers] = useState<{x: number, y: number, eye: 'OD'|'OS', type: 'red'|'blue'|'green'}[]>([]);
  const [markerType, setMarkerType] = useState<'red'|'blue'|'green'>('red');
  const [pacsState, setPacsState] = useState({
      mode: 'single' as 'single' | 'compare' | '3d',
      selectedIds: ['1'] as string[],
      tool: 'pointer' as 'pointer' | 'ruler' | 'pen',
      annotations: [] as any[]
  });

  // --- Effects ---

  useEffect(() => {
    if (currentUser.role === 'OPTOMETRIST') setActiveTab('optometry');
  }, [currentUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
     if (clinicalState.diagnosis.length > 3) {
         getDecisionSupport(clinicalState.diagnosis, clinicalState.notes).then(data => {
             setAiData(prev => ({ ...prev, cds: data }));
         });
     }
  }, [clinicalState.diagnosis]); // Notes excluded to avoid too frequent calls

  // --- Handlers (Memoized) ---

  const handleStateUpdate = (section: 'clinical' | 'optometry' | 'ui', key: string, value: any) => {
      if (section === 'clinical') setClinicalState(prev => ({ ...prev, [key]: value }));
      if (section === 'optometry') setOptometryState(prev => ({ ...prev, [key]: value }));
      if (section === 'ui') setUiState(prev => ({ ...prev, [key]: value }));
  };

  const handleAISummary = async () => {
    if (!clinicalState.notes) return;
    setUiState(prev => ({ ...prev, isAnalyzing: true }));
    const summary = await generateMedicalSummary(clinicalState.notes);
    setClinicalState(prev => ({ ...prev, plan: prev.plan + '\n\n--- AI Summary ---\n' + summary }));
    setUiState(prev => ({ ...prev, isAnalyzing: false }));
  };

  const handleObservationSummary = async () => {
    if (!clinicalState.notes) return;
    setUiState(prev => ({ ...prev, isAnalyzing: true }));
    const summary = await generateMedicalSummary(clinicalState.notes);
    setAiData(prev => ({ ...prev, summary }));
    setUiState(prev => ({ ...prev, isAnalyzing: false }));
  };

  const handleAnalyzeSymptoms = async () => {
    if (!clinicalState.symptoms) return;
    setUiState(prev => ({ ...prev, isAnalyzing: true }));
    const analysis = await analyzeSymptoms(clinicalState.symptoms);
    setAiData(prev => ({ ...prev, suggestion: analysis }));
    setUiState(prev => ({ ...prev, isAnalyzing: false }));
  };

  const fetchDeviceData = useCallback(() => {
      setUiState(prev => ({ ...prev, isDeviceFetching: true }));
      setTimeout(() => {
          setOptometryState({
              ar: { od: { sph: '-1.25', cyl: '-0.50', axis: '180' }, os: { sph: '-1.50', cyl: '-0.75', axis: '175' } },
              nct: { od: '14', os: '15' },
              va: { od: '6/6', os: '6/6' }
          });
          setUiState(prev => ({ ...prev, isDeviceFetching: false }));
      }, 1000);
  }, []);

  // --- Scribe Logic ---
  const toggleScribe = useCallback(() => {
    if (isScribeActive) {
        setIsScribeActive(false);
        if (scribeIntervalRef.current) window.clearInterval(scribeIntervalRef.current);
    } else {
        setIsScribeActive(true);
        const phrases = ["Patient is a 45 year old female...", "Complaining of blurring...", "No history of trauma.", "IOP is 18 mmHg.", "Cornea is clear."];
        let i = 0;
        setScribeText("");
        scribeIntervalRef.current = window.setInterval(() => {
            if (i < phrases.length) {
                setScribeText(prev => prev + (prev ? " " : "") + phrases[i]);
                i++;
            } else {
                if(scribeIntervalRef.current) window.clearInterval(scribeIntervalRef.current);
            }
        }, 1500);
    }
  }, [isScribeActive]);

  const processScribeNotes = async () => {
      setUiState(prev => ({ ...prev, isAnalyzing: true }));
      const formatted = await generateScribeNotes(scribeText);
      setClinicalState(prev => ({ ...prev, notes: prev.notes + "\n" + formatted }));
      setScribeText("");
      setIsScribeActive(false);
      setUiState(prev => ({ ...prev, isAnalyzing: false }));
  };

  // --- Render Helpers for Tabs ---

  const renderHistoryTab = () => (
    <div className="space-y-6 animate-fadeIn">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-slate-400" />
                <span>Chief Complaint & History</span>
            </h3>
            <div className="flex space-x-2">
                    <button onClick={toggleScribe} className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isScribeActive ? 'bg-red-50 text-red-600 border-red-200 ring-2 ring-red-100' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                    <Mic className="w-3.5 h-3.5" /><span>{isScribeActive ? 'Listening...' : 'AI Scribe'}</span>
                </button>
                <button onClick={handleAnalyzeSymptoms} disabled={uiState.isAnalyzing || !clinicalState.symptoms} className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-medium flex items-center hover:bg-indigo-100 disabled:opacity-50 transition-colors border border-indigo-100">
                    <Brain className="w-3 h-3 mr-1.5" />Analyze Symptoms
                </button>
            </div>
            </div>
            <textarea 
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none text-slate-700 resize-none transition-shadow"
            placeholder="Enter patient symptoms..."
            value={clinicalState.symptoms}
            onChange={(e) => handleStateUpdate('clinical', 'symptoms', e.target.value)}
            />
            {aiData.suggestion && (
            <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl animate-fadeIn">
                <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-indigo-900 mb-1">Differential Diagnosis</h4>
                    <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{aiData.suggestion}</div>
                </div>
                </div>
            </div>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-3">Systemic History</h4>
                <div className="space-y-2">{['Diabetes', 'Hypertension', 'Cardiac', 'Asthma'].map(item => (<label key={item} className="flex items-center space-x-3"><input type="checkbox" className="rounded text-primary-600" /><span className="text-slate-600 text-sm">{item}</span></label>))}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-3">Ocular History</h4>
                <div className="space-y-2">{['Glaucoma', 'Cataract Surgery', 'Retinal Detachment', 'Trauma'].map(item => (<label key={item} className="flex items-center space-x-3"><input type="checkbox" className="rounded text-primary-600" /><span className="text-slate-600 text-sm">{item}</span></label>))}</div>
            </div>
        </div>
    </div>
  );

  const renderOptometryTab = () => (
    <div className="space-y-6 animate-fadeIn">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Auto Refraction (AR)</h3>
            <div className="flex items-center space-x-3">
                <button onClick={fetchDeviceData} disabled={uiState.isDeviceFetching} className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-100">
                    {uiState.isDeviceFetching ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                    <span>{uiState.isDeviceFetching ? 'Fetching...' : 'Fetch from Device'}</span>
                </button>
                <div className="text-xs bg-slate-100 px-3 py-1 rounded text-slate-500">Machine: Topcon-800</div>
            </div>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-center">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold">
                    <tr><th className="py-2 px-4 rounded-l-lg">Eye</th><th className="py-2 px-4">Sphere</th><th className="py-2 px-4">Cylinder</th><th className="py-2 px-4 rounded-r-lg">Axis</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr>
                        <td className="py-4 font-bold text-slate-700">OD</td>
                        <td className="px-2"><input value={optometryState.ar.od.sph} onChange={e => setOptometryState({...optometryState, ar: {...optometryState.ar, od: {...optometryState.ar.od, sph: e.target.value}}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                        <td className="px-2"><input value={optometryState.ar.od.cyl} onChange={e => setOptometryState({...optometryState, ar: {...optometryState.ar, od: {...optometryState.ar.od, cyl: e.target.value}}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                        <td className="px-2"><input value={optometryState.ar.od.axis} onChange={e => setOptometryState({...optometryState, ar: {...optometryState.ar, od: {...optometryState.ar.od, axis: e.target.value}}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="0°" /></td>
                    </tr>
                    <tr>
                        <td className="py-4 font-bold text-slate-700">OS</td>
                        <td className="px-2"><input value={optometryState.ar.os.sph} onChange={e => setOptometryState({...optometryState, ar: {...optometryState.ar, os: {...optometryState.ar.os, sph: e.target.value}}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                        <td className="px-2"><input value={optometryState.ar.os.cyl} onChange={e => setOptometryState({...optometryState, ar: {...optometryState.ar, os: {...optometryState.ar.os, cyl: e.target.value}}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="-0.00" /></td>
                        <td className="px-2"><input value={optometryState.ar.os.axis} onChange={e => setOptometryState({...optometryState, ar: {...optometryState.ar, os: {...optometryState.ar.os, axis: e.target.value}}})} className="w-24 p-2 border border-slate-200 rounded text-center" placeholder="0°" /></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex items-center space-x-3">
            <img src={patient.avatarUrl} alt={patient.name} className="w-10 h-10 rounded-full border border-slate-200" />
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">{patient.name}</h1>
              <div className="text-xs text-slate-500 flex items-center space-x-2">
                <span>{patient.age} yrs</span><span>•</span><span>{patient.gender}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setUiState(prev => ({...prev, showCalculator: !prev.showCalculator}))} className="flex items-center space-x-2 px-3 py-2 border rounded-lg text-xs font-medium bg-white hover:bg-slate-50">
              <Calculator className="w-4 h-4" /><span className="hidden sm:inline">Calculators</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium shadow-sm">
            <Save className="w-4 h-4" /><span>Save Case</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {uiState.showCalculator && (
             <div className="absolute top-4 right-4 z-50 bg-white shadow-2xl rounded-xl border border-slate-200 w-80 animate-fadeIn">
                <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                   <span className="font-bold text-slate-700 text-sm">Ophthalmic Tools</span>
                   <button onClick={() => setUiState(prev => ({...prev, showCalculator: false}))}><ChevronLeft className="w-4 h-4 rotate-180" /></button>
                </div>
                <div className="p-4"><p className="text-xs text-center text-slate-400">Calculator Component Loaded</p></div>
             </div>
          )}

          {isScribeActive && (
             <div className="fixed bottom-8 left-8 right-96 z-50 bg-slate-900/90 text-white p-4 rounded-xl shadow-2xl backdrop-blur flex items-center justify-between border border-slate-700 animate-slideInUp">
                 <div className="flex items-center space-x-4"><Mic className="w-6 h-6 text-red-500 animate-pulse" /><p className="text-xs text-slate-400">{scribeText || "Listening..."}</p></div>
                 <button onClick={processScribeNotes} className="px-3 py-1.5 bg-primary-600 rounded-lg text-xs font-bold">Generate</button>
             </div>
          )}

          <div className="flex space-x-1 mb-6 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            {[{id: 'history', icon: FileText, label: 'History'}, {id: 'optometry', icon: GlassesIcon, label: 'Optometry'}, {id: 'examination', icon: Microscope, label: 'Workup'}, {id: 'procedures', icon: Zap, label: 'Procedures'}, {id: 'imaging', icon: HardDrive, label: 'PACS'}, {id: 'plan', icon: ClipboardCheck, label: 'Plan'}].map((tab: any) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-800 text-white shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <tab.icon className="w-4 h-4" /><span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="max-w-5xl space-y-6">
            {activeTab === 'history' && renderHistoryTab()}
            {activeTab === 'optometry' && renderOptometryTab()}
            {activeTab === 'examination' && (
                <div className="space-y-6 animate-fadeIn">
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Doctor Workup</h3>
                        <textarea className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Slit lamp notes..." value={clinicalState.notes} onChange={e => handleStateUpdate('clinical', 'notes', e.target.value)} />
                     </div>
                </div>
            )}
            {activeTab === 'plan' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Diagnosis & Plan</h3>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-lg mb-4" value={clinicalState.diagnosis} onChange={e => handleStateUpdate('clinical', 'diagnosis', e.target.value)} placeholder="Diagnosis" />
                        <textarea className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl" value={clinicalState.plan} onChange={e => handleStateUpdate('clinical', 'plan', e.target.value)} placeholder="Treatment Plan" />
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamView;
