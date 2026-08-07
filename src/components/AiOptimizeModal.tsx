import React, { useState } from 'react';
import { ChurchService } from '../types/bulletin';
import { HYMN_LIBRARY } from '../data/initialData';
import { Sparkles, Music, Check, RefreshCw } from 'lucide-react';

interface AiOptimizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ChurchService;
  onApplyHymn: (hymnNumber: string, title: string) => void;
  onAddGeneratedAnnouncement: (text: string) => void;
}

export const AiOptimizeModal: React.FC<AiOptimizeModalProps> = ({
  isOpen,
  onClose,
  service,
  onApplyHymn,
  onAddGeneratedAnnouncement,
}) => {
  const [activeTab, setActiveTab] = useState<'hymn' | 'announcement'>('hymn');
  const [generating, setGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleGenerateAnnouncements = () => {
    setGenerating(true);
    setTimeout(() => {
      setAiSuggestions([
        'Youth Ministry Fall Retreat registration opens this Sunday; early bird rate ends Nov 1st.',
        'Weekly Prayer Walk meets in the courtyard every Thursday morning at 7:30 AM.',
        'Deacons Fund Special Offering will be collected next Lord’s Day for local outreach.',
      ]);
      setGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Bulletin Assistant
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('hymn')}
            className={`py-2 px-4 border-b-2 transition-colors ${
              activeTab === 'hymn'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sermon-Hymn Matcher
          </button>
          <button
            onClick={() => {
              setActiveTab('announcement');
              if (aiSuggestions.length === 0) handleGenerateAnnouncements();
            }}
            className={`py-2 px-4 border-b-2 transition-colors ${
              activeTab === 'announcement'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Announcement Helper
          </button>
        </div>

        {/* Tab 1: Hymn Matcher */}
        {activeTab === 'hymn' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-purple-900">
              <span className="font-bold block mb-1">Active Sermon Context:</span>
              <p className="font-serif italic text-sm">"{service.sermonTitle}"</p>
              <p className="text-[11px] opacity-80 mt-1">Scripture: {service.scripture}</p>
            </div>

            <label className="font-bold text-slate-700 block">
              Recommended Hymns based on Theological Theme:
            </label>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {HYMN_LIBRARY.map((hymn) => (
                <div
                  key={hymn.number}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="font-bold text-slate-900">
                      No. {hymn.number} - {hymn.title}
                    </span>
                    <div className="flex gap-1 mt-1">
                      {hymn.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onApplyHymn(hymn.number, hymn.title);
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <Check className="w-3 h-3" /> Insert
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Announcement Helper */}
        {activeTab === 'announcement' && (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700">Generated Church Bulletins Drafts:</span>
              <button
                onClick={handleGenerateAnnouncements}
                disabled={generating}
                className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className={`w-3 h-3 ${generating ? 'animate-spin' : ''}`} /> Regenerate
              </button>
            </div>

            {generating ? (
              <div className="py-8 text-center text-slate-500">
                <Sparkles className="w-6 h-6 text-purple-500 animate-spin mx-auto mb-2" />
                Drafting contextual church announcements...
              </div>
            ) : (
              <div className="space-y-2">
                {aiSuggestions.map((text, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between gap-3 hover:border-purple-300 transition-colors"
                  >
                    <p className="text-slate-800 leading-relaxed text-[11px]">&bull; {text}</p>
                    <button
                      onClick={() => {
                        onAddGeneratedAnnouncement(text);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded font-semibold text-[11px] shrink-0"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
