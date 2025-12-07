import React, { useRef, useEffect } from 'react';
import { Headset, Box, Layers, Activity, Play, Monitor, RefreshCw, Cpu, Brain, Zap } from 'lucide-react';

const ARVRTherapyView: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Simulate Digital Twin rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let rotation = 0;

        const render = () => {
            rotation += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw a wireframe eye (simplified simulation of Three.js)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 80;

            ctx.strokeStyle = '#0ea5e9';
            ctx.lineWidth = 2;
            
            // Sphere
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Iris plane (rotating)
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radius * Math.cos(rotation), radius, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Lens
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radius * 0.4 * Math.cos(rotation), radius * 0.4, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
            ctx.fill();
            
            // Data points
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            ctx.arc(centerX + radius * Math.cos(rotation + 1), centerY + radius * 0.5, 3, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => window.cancelAnimationFrame(animationFrameId);
    }, []);

    const therapies = [
        { title: "Amblyopia Space Shooter", type: "Gamified Therapy", duration: "20 mins", status: "Active" },
        { title: "Vergence Trainer Pro", type: "Muscle Balance", duration: "15 mins", status: "Pending" },
        { title: "Visual Field Explorer", type: "Diagnostic VR", duration: "10 mins", status: "Completed" },
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Vision Rehabilitation & Digital Twin</h2>
                    <p className="text-slate-500">Immersive therapy using WebXR, A-Frame and Three.js.</p>
                </div>
                <div className="flex space-x-2">
                    <span className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg flex items-center border border-slate-700">
                        <Headset className="w-3 h-3 mr-2" /> WebXR Ready
                    </span>
                    <span className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center shadow-lg shadow-indigo-200">
                        <Cpu className="w-3 h-3 mr-2" /> Digital Twin Active
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Digital Twin */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-2xl p-1 overflow-hidden shadow-2xl relative">
                        <div className="absolute top-4 left-4 z-10">
                            <h3 className="text-white font-bold flex items-center">
                                <Box className="w-5 h-5 mr-2 text-emerald-400" />
                                Patient Digital Twin
                            </h3>
                            <p className="text-slate-400 text-xs mt-1">Real-time physiological model</p>
                        </div>
                        <div className="absolute top-4 right-4 z-10 flex space-x-2">
                            <button className="bg-slate-800/80 text-white p-2 rounded-lg hover:bg-slate-700 backdrop-blur"><Layers className="w-4 h-4" /></button>
                            <button className="bg-slate-800/80 text-white p-2 rounded-lg hover:bg-slate-700 backdrop-blur"><Activity className="w-4 h-4" /></button>
                        </div>
                        <div className="w-full h-[400px] bg-black flex items-center justify-center relative">
                            <canvas ref={canvasRef} width={600} height={400} className="max-w-full" />
                            
                            {/* Overlay Stats */}
                            <div className="absolute bottom-4 left-4 bg-slate-800/50 backdrop-blur p-3 rounded-xl border border-slate-700">
                                <div className="text-xs text-slate-300">IOP Prediction</div>
                                <div className="text-emerald-400 font-mono font-bold text-lg">14.2 mmHg</div>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-slate-800/50 backdrop-blur p-3 rounded-xl border border-slate-700">
                                <div className="text-xs text-slate-300">RNFL Integrity</div>
                                <div className="text-blue-400 font-mono font-bold text-lg">98%</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                                <Brain className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-slate-800">AI Progression</h4>
                            <p className="text-xs text-slate-500 mt-1">Predictive modeling of glaucoma progression based on 5-year trend data.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="bg-rose-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                                <Zap className="w-5 h-5 text-rose-600" />
                            </div>
                            <h4 className="font-bold text-slate-800">Surgical Sim</h4>
                            <p className="text-xs text-slate-500 mt-1">Pre-operative planning using AR overlays on the digital twin.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                                <Monitor className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h4 className="font-bold text-slate-800">Remote Monitor</h4>
                            <p className="text-xs text-slate-500 mt-1">WebRTC live stream from patient's home VR headset.</p>
                        </div>
                    </div>
                </div>

                {/* Right: VR Therapy Sessions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Assigned VR Therapy</h3>
                        <div className="space-y-4">
                            {therapies.map((t, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <Headset className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700 text-sm group-hover:text-indigo-700">{t.title}</div>
                                            <div className="text-[10px] text-slate-500">{t.type} • {t.duration}</div>
                                        </div>
                                    </div>
                                    <button className="bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-3 h-3 fill-current" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
                            + Assign New Module
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center space-x-2 mb-4">
                             <RefreshCw className="w-5 h-5 animate-spin-slow" />
                             <h3 className="font-bold">Sync Status</h3>
                        </div>
                        <div className="space-y-3">
                             <div className="flex justify-between text-sm text-indigo-100 border-b border-white/10 pb-2">
                                 <span>Headset</span>
                                 <span className="font-bold text-white">Meta Quest 3</span>
                             </div>
                             <div className="flex justify-between text-sm text-indigo-100 border-b border-white/10 pb-2">
                                 <span>Last Session</span>
                                 <span className="font-bold text-white">2 hrs ago</span>
                             </div>
                             <div className="flex justify-between text-sm text-indigo-100">
                                 <span>Adherence</span>
                                 <span className="font-bold text-emerald-300">92%</span>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ARVRTherapyView;