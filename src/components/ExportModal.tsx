import React from 'react';
import { ChurchService } from '../types/bulletin';
import { Printer, FileCheck, Copy, Download } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ChurchService;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${service.churchName.toUpperCase()}
"${service.motto}"
${service.date}

ORDER OF SERVICE:
${service.items.map((i) => `- ${i.label}: ${i.detail}`).join('\n')}

SERMON: ${service.sermonTitle} (${service.scripture})

ANNOUNCEMENTS:
${service.announcements.map((a) => `• ${a.text}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    alert('Bulletin text copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Printer className="w-5 h-5 text-slate-700" />
            Export & Print Bulletin
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold">
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            Exporting bulletin for <strong className="text-slate-900">{service.title}</strong>. Choose your target output format:
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleTriggerPrint}
              className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center space-y-2 transition-colors group"
            >
              <Printer className="w-6 h-6 text-slate-700 mx-auto group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900 block">Print / PDF</span>
              <span className="text-[10px] text-slate-500 block">Standard 8.5x11 high-res layout</span>
            </button>

            <button
              onClick={handleCopyText}
              className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center space-y-2 transition-colors group"
            >
              <Copy className="w-6 h-6 text-slate-700 mx-auto group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900 block">Copy Plain Text</span>
              <span className="text-[10px] text-slate-500 block">For email newsletters & slides</span>
            </button>
          </div>
        </div>

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
