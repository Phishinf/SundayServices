import React, { useState } from 'react';
import { Volunteer, ValidationAlert } from '../types/bulletin';
import { AlertTriangle, CheckCircle2, UserPlus, RefreshCw, Info, UserCheck } from 'lucide-react';

interface SidebarRightProps {
  alerts: ValidationAlert[];
  volunteers: Volunteer[];
  onShuffleRoster: () => void;
  onUpdateHymnLogic: () => void;
  onDismissAlert: (id: string) => void;
  onAddVolunteer: (newVol: Volunteer) => void;
  onToggleVolunteerAvailability: (id: string) => void;
}

export const SidebarRight: React.FC<SidebarRightProps> = ({
  alerts,
  volunteers,
  onShuffleRoster,
  onUpdateHymnLogic,
  onDismissAlert,
  onAddVolunteer,
  onToggleVolunteerAvailability,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [volName, setVolName] = useState('');
  const [volRole, setVolRole] = useState('');

  const handleCreateVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName.trim() || !volRole.trim()) return;
    const parts = volName.trim().split(' ');
    const initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();

    onAddVolunteer({
      id: 'vol-' + Date.now(),
      initials,
      name: volName.trim(),
      role: volRole.trim(),
      consecutiveWeeks: 0,
      available: true,
    });

    setVolName('');
    setVolRole('');
    setShowAddModal(false);
  };

  return (
    <aside className="w-64 bg-white border-l border-slate-200 flex flex-col h-full shrink-0 select-none overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
          Validation Alerts
        </h3>
        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
          {alerts.length} Active
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Alerts Section */}
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-green-800 font-medium">All operational validation checks passed!</p>
            </div>
          ) : (
            alerts.map((alert) => {
              if (alert.type === 'warning') {
                return (
                  <div
                    key={alert.id}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg shadow-2xs relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-yellow-800 uppercase tracking-tighter">
                        {alert.title}
                      </span>
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="text-yellow-600 hover:text-yellow-900 text-[10px] font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[11px] text-yellow-700 mt-1 leading-tight">
                      {alert.message}
                    </p>
                    {alert.actionType === 'shuffle_roster' && (
                      <button
                        onClick={onShuffleRoster}
                        className="text-[10px] text-yellow-900 font-bold mt-2 underline hover:text-amber-900 flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3 text-amber-700 inline" /> {alert.actionText || 'Shuffle Roster'}
                      </button>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={alert.id}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-2xs relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-tighter">
                      {alert.title}
                    </span>
                    <button
                      onClick={() => onDismissAlert(alert.id)}
                      className="text-blue-600 hover:text-blue-900 text-[10px] font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[11px] text-blue-700 mt-1 leading-tight">{alert.message}</p>
                  {alert.actionType === 'update_hymn' && (
                    <button
                      onClick={onUpdateHymnLogic}
                      className="text-[10px] text-blue-900 font-bold mt-2 underline hover:text-blue-950 block"
                    >
                      {alert.actionText || 'Apply Recommendation'}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Volunteer Roster */}
        <div className="mt-6 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Volunteer Roster
            </label>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"
            >
              <UserPlus className="w-3 h-3" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {volunteers.map((vol) => (
              <div
                key={vol.id}
                className={`flex items-center gap-3 p-1.5 rounded-lg transition-colors ${
                  !vol.available ? 'opacity-50 bg-slate-50' : 'hover:bg-slate-50'
                }`}
              >
                <div
                  onClick={() => onToggleVolunteerAvailability(vol.id)}
                  title="Click to toggle availability"
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer select-none transition-colors ${
                    vol.consecutiveWeeks >= 3
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {vol.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">{vol.name}</p>
                    {vol.consecutiveWeeks >= 3 && (
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                        {vol.consecutiveWeeks}wks
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{vol.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Volunteer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xs w-full p-5 shadow-xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Add Staff / Volunteer</h4>
            <form onSubmit={handleCreateVolunteer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Clara Lewis"
                  value={volName}
                  onChange={(e) => setVolName(e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Role / Assignment</label>
                <input
                  type="text"
                  placeholder="e.g. Organist / Accompanist"
                  value={volRole}
                  onChange={(e) => setVolRole(e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 text-white rounded font-semibold hover:bg-slate-800"
                >
                  Add Volunteer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
