import React, { useState } from 'react';
import { ChurchService, Volunteer } from '../types/bulletin';
import { Send, CheckCircle2, Mail, Users, Bell } from 'lucide-react';

interface FinalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ChurchService;
  volunteers: Volunteer[];
  onConfirmFinalize: () => void;
}

export const FinalizeModal: React.FC<FinalizeModalProps> = ({
  isOpen,
  onClose,
  service,
  volunteers,
  onConfirmFinalize,
}) => {
  const [sendToStaff, setSendToStaff] = useState(true);
  const [sendToCongregation, setSendToCongregation] = useState(true);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setSentSuccess(true);
    setTimeout(() => {
      onConfirmFinalize();
      setSentSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Finalize & Distribute Service
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold">
            ✕
          </button>
        </div>

        {sentSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-900">Bulletin Finalized & Sent!</h4>
            <p className="text-xs text-slate-500">
              Dispatched to staff roster and parish mailing list.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">{service.title}</span>
              <span className="text-slate-500 block">
                {service.items.length} Order of Service items &bull; {service.announcements.length}{' '}
                Announcements
              </span>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Distribution Targets:</label>

              <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold text-slate-800 block">Assigned Volunteer Staff</span>
                    <span className="text-[10px] text-slate-500">
                      Send order of service to {volunteers.length} roster members
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={sendToStaff}
                  onChange={(e) => setSendToStaff(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold text-slate-800 block">Congregation E-Newsletter</span>
                    <span className="text-[10px] text-slate-500">
                      Publish weekly bulletin summary to parish email list
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={sendToCongregation}
                  onChange={(e) => setSendToCongregation(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Confirm & Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
