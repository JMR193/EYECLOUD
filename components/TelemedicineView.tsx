

import React from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, User, FileText } from 'lucide-react';

const TelemedicineView: React.FC = () => {
    return (
        <div className="flex h-full bg-slate-900 overflow-hidden">
             {/* Main Video Area */}
             <div className="flex-1 flex flex-col relative">
                 
                 {/* Header Overlay */}
                 <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/50 to-transparent">
                     <div className="text-white">
                         <h2 className="font-bold text-lg">Dr. A. Sharma</h2>
                         <p className="text-xs opacity-70">Consultation with Sarah Jenkins</p>
                     </div>
                     <div className="bg-red-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                         Recording (HIPAA Compliant)
                     </div>
                 </div>

                 {/* Patient Video Placeholder */}
                 <div className="flex-1 bg-slate-800 flex items-center justify-center relative">
                     <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop" 
                        className="w-full h-full object-cover opacity-80"
                        alt="Patient Video"
                     />
                     
                     {/* Doctor PIP */}
                     <div className="absolute bottom-4 right-4 w-48 h-32 bg-black border-2 border-slate-700 rounded-lg overflow-hidden shadow-2xl">
                          <img 
                            src="https://i.pravatar.cc/150?u=dr" 
                            className="w-full h-full object-cover"
                            alt="Doctor Self View"
                          />
                     </div>
                 </div>

                 {/* Controls Bar */}
                 <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center space-x-4">
                     <button className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"><Mic className="w-5 h-5" /></button>
                     <button className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"><Video className="w-5 h-5" /></button>
                     <button className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"><PhoneOff className="w-6 h-6" /></button>
                     <button className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"><MessageSquare className="w-5 h-5" /></button>
                     <button className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"><FileText className="w-5 h-5" /></button>
                 </div>
             </div>

             {/* Right Panel: Patient Info & Chat */}
             <div className="w-80 bg-white border-l border-slate-200 hidden lg:flex flex-col">
                 <div className="p-4 border-b border-slate-100">
                     <div className="flex items-center space-x-3 mb-4">
                         <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" />
                         <div>
                             <h3 className="font-bold text-slate-800">Sarah Jenkins</h3>
                             <p className="text-xs text-slate-500">ID: 10294</p>
                         </div>
                     </div>
                     <div className="grid grid-cols-2 gap-2 text-xs">
                         <div className="bg-slate-50 p-2 rounded">
                             <span className="block text-slate-400">Last IOP</span>
                             <span className="font-bold text-slate-700">18 mmHg</span>
                         </div>
                         <div className="bg-slate-50 p-2 rounded">
                             <span className="block text-slate-400">Condition</span>
                             <span className="font-bold text-slate-700">Glaucoma</span>
                         </div>
                     </div>
                 </div>
                 
                 <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
                     <div className="flex flex-col space-y-3">
                         <div className="self-start bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-slate-700 border border-slate-200">
                             Hello Doctor, my eye redness has increased.
                         </div>
                         <div className="self-end bg-primary-600 text-white p-2 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm">
                             I can see that. Is there any pain?
                         </div>
                     </div>
                 </div>

                 <div className="p-4 border-t border-slate-200">
                     <input className="w-full bg-slate-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500" placeholder="Type a message..." />
                 </div>
             </div>
        </div>
    );
};

export default TelemedicineView;