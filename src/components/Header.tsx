import React, { useState } from 'react';
import { ChurchService } from '../types/bulletin';
import { Plus, Printer, Send, Sparkles, CheckCircle, FileText, ExternalLink } from 'lucide-react';
import { STATUS_SHORT_LABELS } from '../utils/workflow';

interface HeaderProps {
  services: ChurchService[];
  selectedServiceId: string;
  onSelectService: (id: string) => void;
  onAddNewService: () => void;
  onExportPDF: () => void;
  onFinalizeAndSend: () => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onAutoGenerateAI: () => void;
  onOpenCongregationView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  services,
  selectedServiceId,
  onSelectService,
  onAddNewService,
  onExportPDF,
  onFinalizeAndSend,
  isEditing,
  setIsEditing,
  onAutoGenerateAI,
  onOpenCongregationView,
}) => {
  const selectedService = services.find((s) => s.id === selectedServiceId);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-10 shadow-xs">
      {/* Service Selector */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <span className="text-slate-400 font-semibold uppercase text-xs tracking-wider">崇拜場次：</span>
        <div className="flex items-center gap-2">
          <select
            value={selectedServiceId}
            onChange={(e) => onSelectService(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}（{STATUS_SHORT_LABELS[service.status] || service.status}）
              </option>
            ))}
          </select>

          <button
            onClick={onAddNewService}
            title="新增崇拜場次"
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {selectedService && (
          <span
            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
              selectedService.status === 'finalized'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-amber-100 text-amber-800 border border-amber-200'
            }`}
          >
            {STATUS_SHORT_LABELS[selectedService.status] || selectedService.status}
          </span>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenCongregationView}
          title="在新分頁開啟會眾版程序表"
          className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 text-slate-700 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          會眾版連結
        </button>

        <button
          onClick={onAutoGenerateAI}
          className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          AI 智能優化
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-3.5 py-1.5 border rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            isEditing
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          {isEditing ? '檢視程序表' : '編輯程序'}
        </button>

        <button
          onClick={onExportPDF}
          className="px-4 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          匯出 PDF
        </button>

        <button
          onClick={onFinalizeAndSend}
          disabled={selectedService?.status !== 'finalized'}
          title={
            selectedService?.status !== 'finalized'
              ? '需先完成牧師審閱及執事複核，方可發送'
              : undefined
          }
          className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 flex items-center gap-1.5 shadow-xs transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300"
        >
          <Send className="w-4 h-4" />
          定稿並發送
        </button>
      </div>
    </header>
  );
};
