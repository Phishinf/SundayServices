import React, { useEffect, useState } from 'react';
import { ChurchService } from '../types/bulletin';
import { getPublishedServices, subscribeToPublishedServices } from '../utils/publishStore';
import { Printer } from 'lucide-react';
import { TextBlockList } from './bulletin-pages/TextBlockList';
import { RosterTable } from './bulletin-pages/RosterTable';
import { AttendanceTable } from './bulletin-pages/AttendanceTable';
import { BULLETIN_PAGES, BulletinPageKey } from '../utils/bulletinPages';

function pageHasContent(key: BulletinPageKey, service: ChurchService): boolean {
  switch (key) {
    case 'order':
      return true;
    case 'hymns':
      return service.hymnLyrics.length > 0;
    case 'worship':
      return service.worshipNotes.length > 0;
    case 'ministry':
      return service.ministryUpdates.length > 0;
    case 'notices':
      return service.otherNotices.length > 0;
    case 'prayers':
      return service.weeklyPrayers.length > 0;
    case 'roster':
      return service.serviceRoster.length > 0;
    case 'attendance':
      return service.attendance.length > 0;
    default:
      return false;
  }
}

export const CongregationView: React.FC = () => {
  const [published, setPublished] = useState<ChurchService[]>(() => getPublishedServices());
  const [selectedId, setSelectedId] = useState<string>(() => getPublishedServices()[0]?.id ?? '');
  const [activePage, setActivePage] = useState<BulletinPageKey>('order');

  useEffect(() => {
    const refresh = () => {
      const list = getPublishedServices();
      setPublished(list);
      setSelectedId((prev) => (list.some((s) => s.id === prev) ? prev : list[0]?.id ?? ''));
    };
    return subscribeToPublishedServices(refresh);
  }, []);

  const service = published.find((s) => s.id === selectedId) || published[0];

  useEffect(() => {
    setActivePage('order');
  }, [service?.id]);

  if (!service) {
    return (
      <div className="min-h-screen w-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-sm text-center bg-white border border-slate-200 rounded-xl p-8 shadow-xs space-y-3">
          <p className="text-slate-500 text-sm">暫時未有已發佈的崇拜程序，請稍後再回來查看。</p>
          <a
            href="#/admin"
            className="inline-block text-xs text-blue-600 hover:text-blue-800 font-semibold"
          >
            教會同工後台
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-slate-200 flex flex-col items-center py-10 px-4">
      {published.length > 1 && (
        <div className="w-[540px] mb-4 flex items-center justify-between text-xs no-print">
          <label className="text-slate-500 font-semibold">選擇崇拜場次：</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {published.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {(() => {
        const visiblePages = BULLETIN_PAGES.filter((p) => pageHasContent(p.key, service));
        return visiblePages.length > 1 ? (
          <div className="w-[540px] mb-4 flex gap-1 overflow-x-auto no-print">
            {visiblePages.map((page) => (
              <button
                key={page.key}
                onClick={() => setActivePage(page.key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors shrink-0 ${
                  activePage === page.key
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        ) : null;
      })()}

      <div className="w-[540px] min-h-[640px] bg-white paper-shadow p-12 bulletin-font text-[#2a2a2a] relative overflow-hidden bulletin-paper shrink-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900" />

        {activePage === 'order' && (
        <>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            {service.churchName}
          </h2>
          <p className="text-sm italic mt-1 text-slate-700 font-serif">「{service.motto}」</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="w-12 h-px bg-slate-300" />
            {service.date}
            <span className="w-12 h-px bg-slate-300" />
          </div>
        </div>

        <div className="space-y-3.5 text-sm">
          {service.items.map((item) => {
            if (item.type === 'sermon') {
              return (
                <div
                  key={item.id}
                  className="py-4 my-2 text-center border-y border-slate-100/80"
                >
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    {service.sermonTitle}
                  </h3>
                  <p className="text-xs italic text-slate-600 mt-0.5">
                    經文：{service.scripture}
                  </p>
                  {item.leader && (
                    <p className="text-[11px] font-sans font-medium text-slate-500 mt-1 uppercase tracking-wider">
                      {item.leader}
                    </p>
                  )}
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-slate-100 pb-1.5"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-bold uppercase tracking-wide text-xs text-slate-900">
                    {item.label}
                  </span>
                  {item.hymnNumber && (
                    <span className="text-[10px] font-sans bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200 font-semibold">
                      編號 {item.hymnNumber}
                    </span>
                  )}
                </div>
                <span className="text-slate-800 text-right font-serif">{item.detail}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t-2 border-slate-100">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 font-sans mb-2">
            家事分享 ／ 報告事項
          </h4>
          <div className="space-y-1.5">
            {service.announcements.map((ann) => (
              <p key={ann.id} className="text-[11px] leading-relaxed text-slate-800">
                &bull; {ann.text}
              </p>
            ))}
          </div>
        </div>
        </>
        )}

        {activePage === 'hymns' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              詩歌全詞
            </h3>
            <TextBlockList blocks={service.hymnLyrics} emptyHint="本週未有詩歌歌詞。" />
          </div>
        )}

        {activePage === 'worship' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              崇拜資料
            </h3>
            <TextBlockList blocks={service.worshipNotes} emptyHint="本週未有崇拜資料。" />
          </div>
        )}

        {activePage === 'ministry' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              家事分享
            </h3>
            <TextBlockList blocks={service.ministryUpdates} emptyHint="本週未有家事分享項目。" />
          </div>
        )}

        {activePage === 'notices' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              其他報告
            </h3>
            <TextBlockList blocks={service.otherNotices} emptyHint="本週未有其他報告。" />
          </div>
        )}

        {activePage === 'prayers' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              本週代禱
            </h3>
            <TextBlockList blocks={service.weeklyPrayers} emptyHint="本週未有代禱事項。" />
          </div>
        )}

        {activePage === 'roster' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              事奉芳名表
            </h3>
            <RosterTable rows={service.serviceRoster} emptyHint="本週未有事奉芳名表。" />
          </div>
        )}

        {activePage === 'attendance' && (
          <div>
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-slate-900 mb-6 font-sans">
              上週聚會出席人數表
            </h3>
            <AttendanceTable
              rows={service.attendance}
              note={service.attendanceNote}
              emptyHint="本週未有出席人數資料。"
            />
          </div>
        )}

        <div className="mt-10 text-center text-[9px] text-slate-400 uppercase tracking-widest font-sans">
          由 GraceBulletin AI v2.4 自動生成
        </div>
      </div>

      <div className="w-[540px] mt-4 flex items-center justify-between no-print">
        <a href="#/admin" className="text-[11px] text-slate-500 hover:text-slate-700 font-semibold">
          教會同工後台
        </a>
        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" /> 列印
        </button>
      </div>
    </div>
  );
};
