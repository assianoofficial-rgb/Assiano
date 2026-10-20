import React from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { CategoryType } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryType;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [activeTab, setActiveTab] = React.useState<'kurti' | 'abaya' | 'three-piece'>('kurti');

  React.useEffect(() => {
    if (category === 'abaya') setActiveTab('abaya');
    else if (category === 'three-piece') setActiveTab('three-piece');
    else setActiveTab('kurti');
  }, [category, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#E10613]" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Assiano Size & Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 pb-2 border-b border-neutral-100 flex gap-4 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('kurti')}
            className={`pb-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'kurti'
                ? 'border-[#E10613] text-[#E10613]'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            Kurtis & Tunics
          </button>
          <button
            onClick={() => setActiveTab('abaya')}
            className={`pb-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'abaya'
                ? 'border-[#E10613] text-[#E10613]'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            Abayas & Borkas
          </button>
          <button
            onClick={() => setActiveTab('three-piece')}
            className={`pb-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'three-piece'
                ? 'border-[#E10613] text-[#E10613]'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            Three-Piece Sets
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'kurti' && (
            <div>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                All measurements are in inches. Kurtis are cut with regular ease for comfort in humid weather. If you prefer a loose relaxed fit, we recommend ordering one size up.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-neutral-200">
                  <thead className="bg-neutral-100 uppercase tracking-wider text-[11px] text-neutral-700">
                    <tr>
                      <th className="p-3 border-b">Size</th>
                      <th className="p-3 border-b">Bust / Chest</th>
                      <th className="p-3 border-b">Waist</th>
                      <th className="p-3 border-b">Hip</th>
                      <th className="p-3 border-b">Standard Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-mono tabular-nums">
                    <tr>
                      <td className="p-3 font-semibold font-sans">36 (Small)</td>
                      <td className="p-3">36"</td>
                      <td className="p-3">32"</td>
                      <td className="p-3">38"</td>
                      <td className="p-3">42" - 44"</td>
                    </tr>
                    <tr className="bg-neutral-50/50">
                      <td className="p-3 font-semibold font-sans">38 (Medium)</td>
                      <td className="p-3">38"</td>
                      <td className="p-3">34"</td>
                      <td className="p-3">40"</td>
                      <td className="p-3">42" - 44"</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold font-sans">40 (Large)</td>
                      <td className="p-3">40"</td>
                      <td className="p-3">36"</td>
                      <td className="p-3">42"</td>
                      <td className="p-3">43" - 45"</td>
                    </tr>
                    <tr className="bg-neutral-50/50">
                      <td className="p-3 font-semibold font-sans">42 (XL)</td>
                      <td className="p-3">42"</td>
                      <td className="p-3">38"</td>
                      <td className="p-3">44"</td>
                      <td className="p-3">44" - 46"</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold font-sans">44 (XXL)</td>
                      <td className="p-3">44"</td>
                      <td className="p-3">40"</td>
                      <td className="p-3">46"</td>
                      <td className="p-3">44" - 46"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'abaya' && (
            <div>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Abaya sizes are designated by vertical height from shoulder to hemline. Assiano abayas have generous chest & hip sweeps to ensure modest and graceful draping.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-neutral-200">
                  <thead className="bg-neutral-100 uppercase tracking-wider text-[11px] text-neutral-700">
                    <tr>
                      <th className="p-3 border-b">Size Tag</th>
                      <th className="p-3 border-b">Recommended Height</th>
                      <th className="p-3 border-b">Abaya Length</th>
                      <th className="p-3 border-b">Bust / Body Sweep</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-mono tabular-nums">
                    <tr>
                      <td className="p-3 font-semibold font-sans">52</td>
                      <td className="p-3 font-sans">5'0" - 5'2" (152 - 157 cm)</td>
                      <td className="p-3">52"</td>
                      <td className="p-3">Free Flare (Up to 44")</td>
                    </tr>
                    <tr className="bg-neutral-50/50">
                      <td className="p-3 font-semibold font-sans">54</td>
                      <td className="p-3 font-sans">5'3" - 5'5" (160 - 165 cm)</td>
                      <td className="p-3">54"</td>
                      <td className="p-3">Free Flare (Up to 46")</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold font-sans">56</td>
                      <td className="p-3 font-sans">5'6" - 5'8" (168 - 173 cm)</td>
                      <td className="p-3">56"</td>
                      <td className="p-3">Free Flare (Up to 48")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'three-piece' && (
            <div className="space-y-3 text-xs text-neutral-700">
              <p>
                Our Three-Piece sets are provided in <strong>premium unstitched fabric</strong>, enabling you to tailor them to your exact bespoke measurements.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <span className="font-semibold block text-neutral-900 mb-1">Kameez / Tunic</span>
                  <span className="font-mono tabular-nums text-neutral-600">2.85 - 3.00 Yards</span>
                  <p className="text-[11px] text-neutral-500 mt-1">Pre-embroidered front neckline & borders</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <span className="font-semibold block text-neutral-900 mb-1">Salwar / Pants</span>
                  <span className="font-mono tabular-nums text-neutral-600">2.50 Yards</span>
                  <p className="text-[11px] text-neutral-500 mt-1">Ample fabric for cigarette pants or palazzos</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs">
                  <span className="font-semibold block text-neutral-900 mb-1">Dupatta / Scarf</span>
                  <span className="font-mono tabular-nums text-neutral-600">2.50 Yards</span>
                  <p className="text-[11px] text-neutral-500 mt-1">Full width sheer organza or soft georgette</p>
                </div>
              </div>
            </div>
          )}

          {/* Need help footer */}
          <div className="mt-6 p-3 bg-amber-50/60 border border-amber-200 rounded-xs flex items-center justify-between text-xs">
            <span className="text-amber-900">
              Need custom alterations or sizing assistance? Chat with our Dhaka stylist team.
            </span>
            <a
              href="https://www.facebook.com/share/1CAKiLxa7D/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E10613] font-semibold hover:underline"
            >
              Message Us ↗
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAFAF8] border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#141416] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
