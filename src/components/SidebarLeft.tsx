import React, { useState } from 'react';
import { ConfigurationRules, AutomationToggles } from '../types/bulletin';
import { RefreshCw, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';

interface SidebarLeftProps {
  toggles: AutomationToggles;
  setToggles: React.Dispatch<React.SetStateAction<AutomationToggles>>;
  rules: ConfigurationRules;
  setRules: React.Dispatch<React.SetStateAction<ConfigurationRules>>;
  onRefreshSchedule: () => void;
  isRefreshing: boolean;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({
  toggles,
  setToggles,
  rules,
  setRules,
  onRefreshSchedule,
  isRefreshing,
}) => {
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [tempRules, setTempRules] = useState<ConfigurationRules>(rules);

  const toggleSwitch = (key: keyof AutomationToggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    setRules(tempRules);
    setShowRuleModal(false);
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-full select-none shrink-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-xs font-black text-white shadow-sm">
            B
          </div>
          BulletinPro AI
        </h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
          Church Operations
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Active Automation Toggles */}
        <section>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
            Active Automation
          </label>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
              <span className="text-xs font-medium text-slate-200">Hymn Selection</span>
              <button
                onClick={() => toggleSwitch('hymnSelection')}
                type="button"
                className={`w-8 h-4 rounded-full relative transition-colors focus:outline-none ${
                  toggles.hymnSelection ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                    toggles.hymnSelection ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
              <span className="text-xs font-medium text-slate-200">Volunteer Rotation</span>
              <button
                onClick={() => toggleSwitch('volunteerRotation')}
                type="button"
                className={`w-8 h-4 rounded-full relative transition-colors focus:outline-none ${
                  toggles.volunteerRotation ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                    toggles.volunteerRotation ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
              <span className="text-xs font-medium text-slate-200">Conflict Checker</span>
              <button
                onClick={() => toggleSwitch('conflictCheck')}
                type="button"
                className={`w-8 h-4 rounded-full relative transition-colors focus:outline-none ${
                  toggles.conflictCheck ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                    toggles.conflictCheck ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Configuration Rules */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Configuration Rules
            </label>
            <button
              onClick={() => {
                setTempRules(rules);
                setShowRuleModal(true);
              }}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" /> Edit
            </button>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700 text-xs text-slate-300 rule-border">
              <span className="block font-bold text-slate-100 mb-0.5">Sermon Series</span>
              {rules.sermonSeries}
            </div>

            <div className="p-3 bg-slate-800/50 rounded border border-slate-700 text-xs text-slate-300 rule-border">
              <span className="block font-bold text-slate-100 mb-0.5">Hymn Style</span>
              {rules.hymnStyle}
            </div>

            <div className="p-3 bg-slate-800/50 rounded border border-slate-700 text-xs text-slate-300 rule-border">
              <span className="block font-bold text-slate-100 mb-0.5">Staff Conflict Check</span>
              {rules.conflictCheck ? `Enabled (Buffer: ${rules.bufferMinutes}m)` : 'Disabled'}
            </div>
          </div>
        </section>
      </div>

      {/* Footer / Refresh Button */}
      <div className="p-6 bg-slate-950 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs opacity-80 mb-4 text-slate-300">
          <div
            className={`w-2 h-2 rounded-full ${
              isRefreshing ? 'bg-amber-400 animate-ping' : 'bg-green-500'
            }`}
          />
          <span className="text-[11px] font-medium">
            {isRefreshing ? 'Recalculating logic...' : 'Rules up to date'}
          </span>
        </div>
        <button
          onClick={onRefreshSchedule}
          disabled={isRefreshing}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white py-2.5 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Schedule'}
        </button>
      </div>

      {/* Configuration Rules Edit Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" /> Configure Operations Rules
              </h3>
              <button
                onClick={() => setShowRuleModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRules} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Active Sermon Series Name
                </label>
                <input
                  type="text"
                  value={tempRules.sermonSeries}
                  onChange={(e) =>
                    setTempRules((r) => ({ ...r, sermonSeries: e.target.value }))
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Hymn Style Preference</label>
                <select
                  value={tempRules.hymnStyle}
                  onChange={(e) =>
                    setTempRules((r) => ({ ...r, hymnStyle: e.target.value }))
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Liturgical / Traditional">Liturgical / Traditional</option>
                  <option value="Contemporary Worship">Contemporary Worship</option>
                  <option value="Blended">Blended Style</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="block font-semibold text-slate-200">Staff Conflict Checker</span>
                  <span className="text-[11px] text-slate-400">Flag consecutive volunteer slots</span>
                </div>
                <input
                  type="checkbox"
                  checked={tempRules.conflictCheck}
                  onChange={(e) =>
                    setTempRules((r) => ({ ...r, conflictCheck: e.target.checked }))
                  }
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Buffer Time Between Roles (minutes)
                </label>
                <input
                  type="number"
                  value={tempRules.bufferMinutes}
                  onChange={(e) =>
                    setTempRules((r) => ({
                      ...r,
                      bufferMinutes: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  min={5}
                  max={60}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRuleModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold"
                >
                  Save Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
