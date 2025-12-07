
import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, CalendarDays, DollarSign } from 'lucide-react';
import { Asset } from '../types';
import { api } from '../services/apiService';

const AssetView: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
        api.assets.getAll().then(setAssets);
    }, []);

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Asset Management</h2>
                <p className="text-slate-500">Track hospital infrastructure, furniture, and IT assets.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(asset => (
                    <div key={asset.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-100 p-3 rounded-xl">
                                <Briefcase className="w-6 h-6 text-slate-600" />
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                asset.condition === 'Good' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                                {asset.condition}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{asset.name}</h3>
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-4">{asset.type} • {asset.id}</p>
                        
                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                {asset.location}
                            </div>
                            <div className="flex items-center">
                                <CalendarDays className="w-4 h-4 mr-2 text-slate-400" />
                                Bought: {asset.purchaseDate}
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                                Value: ${asset.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetView;
