import React, { useEffect, useState } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { Header } from './components/Header';
import { BulletinPreview } from './components/BulletinPreview';
import { SidebarRight } from './components/SidebarRight';
import { AiOptimizeModal } from './components/AiOptimizeModal';
import { ExportModal } from './components/ExportModal';
import { FinalizeModal } from './components/FinalizeModal';
import { WorkflowStatusBar } from './components/WorkflowStatusBar';
import { VoiceOfficerAssistant } from './components/VoiceOfficerAssistant';

import {
  INITIAL_SERVICES,
  INITIAL_VOLUNTEERS,
  INITIAL_ALERTS,
  INITIAL_RULES,
  INITIAL_TOGGLES,
} from './data/initialData';

import {
  ChurchService,
  Volunteer,
  ValidationAlert,
  ConfigurationRules,
  AutomationToggles,
  EditorialRole,
} from './types/bulletin';

import { getPublishedServices, publishService } from './utils/publishStore';

export default function AdminApp() {
  const [services, setServices] = useState<ChurchService[]>(INITIAL_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('service-1');
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [alerts, setAlerts] = useState<ValidationAlert[]>(INITIAL_ALERTS);
  const [rules, setRules] = useState<ConfigurationRules>(INITIAL_RULES);
  const [toggles, setToggles] = useState<AutomationToggles>(INITIAL_TOGGLES);
  const [currentRole, setCurrentRole] = useState<EditorialRole>('officer');

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState<boolean>(false);

  const activeService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  // Seed the congregation-facing publish store with this week's bulletin on first run,
  // so the congregation page isn't empty before staff ever open Finalize & Send.
  useEffect(() => {
    if (getPublishedServices().length === 0) {
      publishService(INITIAL_SERVICES[0]);
    }
  }, []);

  const handleUpdateActiveService = (updated: ChurchService) => {
    setServices((prev) =>
      prev.map((serv) => (serv.id === updated.id ? updated : serv))
    );
  };

  const handleAddNewService = () => {
    const titlePrompt = prompt('請輸入新崇拜場次名稱（例：將臨期主日 12月3日）：');
    if (!titlePrompt) return;

    const newId = 'service-' + Date.now();
    const newService: ChurchService = {
      id: newId,
      title: titlePrompt,
      date: '二零二六年十二月三日',
      churchName: activeService.churchName,
      motto: activeService.motto,
      sermonSeries: rules.sermonSeries,
      sermonTitle: '將臨期的盼望',
      scripture: '以賽亞書 9:2-7',
      preacher: '葉秀嫻傳道',
      status: 'draft',
      items: [
        { id: '1', type: 'prelude', label: '序樂', detail: '司琴' },
        { id: '2', type: 'call', label: '宣召', detail: '葉秀嫻傳道' },
        { id: '3', type: 'hymn', label: '始頌', detail: '普世歡騰', hymnNumber: '211' },
        { id: '4', type: 'sermon', label: '信息', detail: '將臨期的盼望', leader: '葉秀嫻傳道' },
        { id: '5', type: 'benediction', label: '祝禱', detail: '葉秀嫻傳道' },
      ],
      announcements: [
        { id: 'a1', text: '歡迎新來賓！請於座位上填寫連繫卡，方便教會與您保持聯絡。' },
      ],
      hymnLyrics: [],
      worshipNotes: [],
      ministryUpdates: [],
      otherNotices: [],
      weeklyPrayers: [],
      serviceRoster: [],
      attendance: [],
    };

    setServices((prev) => [...prev, newService]);
    setSelectedServiceId(newId);
  };

  const handleRefreshSchedule = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);

      // Evaluate logic rules
      const hasOverworked = volunteers.some((v) => v.consecutiveWeeks >= 3);
      if (hasOverworked) {
        setAlerts((prev) => {
          if (prev.some((a) => a.actionType === 'shuffle_roster')) return prev;
          return [
            {
              id: 'alt-' + Date.now(),
              type: 'warning',
              title: '事奉輪替提示',
              message: '偵測到事奉負荷不均：有 1 位同工已連續事奉超過 3 週。',
              actionText: '調配事奉表',
              actionType: 'shuffle_roster',
            },
            ...prev,
          ];
        });
      }
    }, 700);
  };

  const handleShuffleRoster = () => {
    // Reset consecutive weeks & shuffle roster order
    setVolunteers((prev) =>
      prev.map((v) => ({
        ...v,
        consecutiveWeeks: Math.max(1, v.consecutiveWeeks - 2),
      }))
    );

    // Remove warning alert & add positive alert
    setAlerts((prev) => [
      {
        id: 'alt-shuffled-' + Date.now(),
        type: 'info',
        title: '事奉表已調配',
        message: '同工事奉排程已輪替，緩衝時間已延長至 15 分鐘。',
      },
      ...prev.filter((a) => a.actionType !== 'shuffle_roster'),
    ]);
  };

  const handleUpdateHymnLogic = () => {
    // Update active service hymn with optimal theological match
    const updatedItems = activeService.items.map((item) => {
      if (item.type === 'hymn') {
        return {
          ...item,
          detail: '奇異恩典',
          hymnNumber: '109',
        };
      }
      return item;
    });

    handleUpdateActiveService({
      ...activeService,
      items: updatedItems,
    });

    setAlerts((prev) => prev.filter((a) => a.actionType !== 'update_hymn'));
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddVolunteer = (newVol: Volunteer) => {
    setVolunteers((prev) => [...prev, newVol]);
  };

  const handleToggleVolunteerAvailability = (id: string) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, available: !v.available } : v))
    );
  };

  const handleApplyHymn = (hymnNumber: string, title: string) => {
    const updatedItems = activeService.items.map((item) => {
      if (item.type === 'hymn') {
        return { ...item, detail: title, hymnNumber };
      }
      return item;
    });

    handleUpdateActiveService({
      ...activeService,
      items: updatedItems,
    });
  };

  const handleAddGeneratedAnnouncement = (text: string) => {
    handleUpdateActiveService({
      ...activeService,
      announcements: [
        ...activeService.announcements,
        { id: 'ann-ai-' + Date.now(), text },
      ],
    });
  };

  const handleConfirmFinalize = (opts: { sendToCongregation: boolean }) => {
    // Status is already 'finalized' by this point (set via deacon approval below);
    // this step only handles distribution to staff / the congregation page.
    if (opts.sendToCongregation) {
      publishService(activeService);
    }
  };

  const handleSubmitForReview = () => {
    handleUpdateActiveService({ ...activeService, status: 'pastor_review' });
    setAlerts((prev) => [
      {
        id: 'wf-' + Date.now(),
        type: 'info',
        title: '已提交審閱',
        message: `「${activeService.title}」已提交予牧師／傳道審閱。`,
      },
      ...prev,
    ]);
  };

  const handleWorkflowApprove = () => {
    if (activeService.status === 'pastor_review' && currentRole === 'pastor') {
      handleUpdateActiveService({ ...activeService, status: 'deacon_review' });
      setAlerts((prev) => [
        {
          id: 'wf-' + Date.now(),
          type: 'info',
          title: '牧師已審閱通過',
          message: `「${activeService.title}」已轉交執事作最後複核。`,
        },
        ...prev,
      ]);
    } else if (activeService.status === 'deacon_review' && currentRole === 'deacon') {
      handleUpdateActiveService({ ...activeService, status: 'finalized' });
      setAlerts((prev) => [
        {
          id: 'wf-' + Date.now(),
          type: 'info',
          title: '執事已複核定稿',
          message: `「${activeService.title}」已完成審批，可以發送。`,
        },
        ...prev,
      ]);
    }
  };

  const handleWorkflowReject = () => {
    const reason = (prompt('請輸入退回原因（可留空）：') || '').trim();
    const stageLabel = activeService.status === 'pastor_review' ? '牧師／傳道' : '執事';
    handleUpdateActiveService({ ...activeService, status: 'draft' });
    setAlerts((prev) => [
      {
        id: 'wf-' + Date.now(),
        type: 'warning',
        title: '已退回重編',
        message: reason
          ? `${stageLabel}退回重編：${reason}`
          : `${stageLabel}已將程序表退回，請幹事重新編輯後再提交審閱。`,
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 text-slate-900 overflow-hidden">
      {/* Left Operations & Rules Sidebar */}
      <SidebarLeft
        toggles={toggles}
        setToggles={setToggles}
        rules={rules}
        setRules={setRules}
        onRefreshSchedule={handleRefreshSchedule}
        isRefreshing={isRefreshing}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
      />

      {/* Center Main Stage */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0 relative">
        <Header
          services={services}
          selectedServiceId={selectedServiceId}
          onSelectService={setSelectedServiceId}
          onAddNewService={handleAddNewService}
          onExportPDF={() => setShowExportModal(true)}
          onFinalizeAndSend={() => setShowFinalizeModal(true)}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onAutoGenerateAI={() => setShowAiModal(true)}
          onOpenCongregationView={() => window.open('#/congregation', '_blank')}
        />

        <BulletinPreview
          service={activeService}
          onUpdateService={handleUpdateActiveService}
          isEditing={isEditing}
          onOpenAiAssist={() => setShowAiModal(true)}
          currentRole={currentRole}
          onSubmitForReview={handleSubmitForReview}
          onWorkflowApprove={handleWorkflowApprove}
          onWorkflowReject={handleWorkflowReject}
        />

        {currentRole === 'officer' && (
          <VoiceOfficerAssistant
            service={activeService}
            onUpdateService={handleUpdateActiveService}
          />
        )}
      </main>

      {/* Right Validation & Staff Roster Sidebar */}
      <SidebarRight
        alerts={alerts}
        volunteers={volunteers}
        onShuffleRoster={handleShuffleRoster}
        onUpdateHymnLogic={handleUpdateHymnLogic}
        onDismissAlert={handleDismissAlert}
        onAddVolunteer={handleAddVolunteer}
        onToggleVolunteerAvailability={handleToggleVolunteerAvailability}
      />

      {/* Modals */}
      <AiOptimizeModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        service={activeService}
        onApplyHymn={handleApplyHymn}
        onAddGeneratedAnnouncement={handleAddGeneratedAnnouncement}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        service={activeService}
      />

      <FinalizeModal
        isOpen={showFinalizeModal}
        onClose={() => setShowFinalizeModal(false)}
        service={activeService}
        volunteers={volunteers}
        onConfirmFinalize={handleConfirmFinalize}
      />
    </div>
  );
}
