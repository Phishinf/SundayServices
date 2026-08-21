import React, { useState } from 'react';
import { ChurchService } from '../types/bulletin';
import { Printer, FileCheck, Copy, Download, Loader2 } from 'lucide-react';
import { exportMinistryUpdatesToPptx } from '../utils/exportMinistryPps';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ChurchService;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, service }) => {
  const [isExportingPpt, setIsExportingPpt] = useState(false);

  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  const handleExportMinistryPpt = async () => {
    if (isExportingPpt) return;
    setIsExportingPpt(true);
    try {
      await exportMinistryUpdatesToPptx(service);
    } catch (err) {
      console.error(err);
      alert('匯出 PPT 失敗，請重試。');
    } finally {
      setIsExportingPpt(false);
    }
  };

  const handleCopyText = () => {
    const section = (title: string, body: string) => (body.trim() ? `\n\n【${title}】\n${body.trim()}` : '');

    const text = `
${service.churchName}
「${service.motto}」
${service.date}

崇拜程序：
${service.items.map((i) => `- ${i.label}：${i.detail}`).join('\n')}

信息：${service.sermonTitle}（${service.scripture}）

家事分享／報告事項：
${service.announcements.map((a) => `• ${a.text}`).join('\n')}
${section('詩歌全詞', service.hymnLyrics.map((h) => `${h.title}\n${h.body}`).join('\n\n'))}
${section('崇拜資料', service.worshipNotes.map((w) => `${w.title}\n${w.body}`).join('\n\n'))}
${section('家事分享詳情', service.ministryUpdates.map((m) => `${m.title}\n${m.body}`).join('\n\n'))}
${section('其他報告', service.otherNotices.map((n) => `${n.title}\n${n.body}`).join('\n\n'))}
${section('本週代禱', service.weeklyPrayers.map((p) => `${p.title} ${p.body}`).join('\n\n'))}
${section('事奉芳名表', service.serviceRoster.map((r) => `[${r.section}] ${r.role}：本週 ${r.thisWeek}／下週 ${r.nextWeek}`).join('\n'))}
${section('上週聚會出席人數表', service.attendance.map((a) => `${a.meeting}：${a.count}`).join('\n') + (service.attendanceNote ? `\n${service.attendanceNote}` : ''))}
    `.trim();

    navigator.clipboard.writeText(text);
    alert('程序表文字已複製到剪貼簿！');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Printer className="w-5 h-5 text-slate-700" />
            匯出並列印程序表
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold">
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            正在匯出 <strong className="text-slate-900">{service.title}</strong> 的程序表，請選擇輸出格式：
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleTriggerPrint}
              className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center space-y-2 transition-colors group"
            >
              <Printer className="w-6 h-6 text-slate-700 mx-auto group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900 block">列印／PDF</span>
              <span className="text-[10px] text-slate-500 block">列印目前顯示的頁面（如需多頁，請逐頁切換列印）</span>
            </button>

            <button
              onClick={handleCopyText}
              className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center space-y-2 transition-colors group"
            >
              <Copy className="w-6 h-6 text-slate-700 mx-auto group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900 block">複製純文字</span>
              <span className="text-[10px] text-slate-500 block">包含全部頁面內容，適用於電郵通訊及投影片</span>
            </button>

            <button
              onClick={handleExportMinistryPpt}
              disabled={service.ministryUpdates.length === 0 || isExportingPpt}
              className="col-span-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center space-y-2 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-50"
            >
              {isExportingPpt ? (
                <Loader2 className="w-6 h-6 text-slate-700 mx-auto animate-spin" />
              ) : (
                <Download className="w-6 h-6 text-slate-700 mx-auto group-hover:scale-110 transition-transform" />
              )}
              <span className="font-bold text-slate-900 block">
                {isExportingPpt ? '匯出中...' : '家事分享 PPT／投影片'}
              </span>
              <span className="text-[10px] text-slate-500 block">
                {service.ministryUpdates.length === 0
                  ? '本場次尚未有家事分享內容可匯出'
                  : `將「家事分享」共 ${service.ministryUpdates.length} 項內容匯出為 .pptx，可直接開啟並播放投影片`}
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-xs"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
