import React, { useState } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { Header } from './components/Header';
import { BulletinPreview } from './components/BulletinPreview';
import { SidebarRight } from './components/SidebarRight';
import { AiOptimizeModal } from './components/AiOptimizeModal';
import { ExportModal } from './components/ExportModal';
import { FinalizeModal } from './components/FinalizeModal';

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
} from './types/bulletin';

export default function App() {
  const [services, setServices] = useState<ChurchService[]>(INITIAL_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('service-1');
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [alerts, setAlerts] = useState<ValidationAlert[]>(INITIAL_ALERTS);
  const [rules, setRules] = useState<ConfigurationRules>(INITIAL_RULES);
  const [toggles, setToggles] = useState<AutomationToggles>(INITIAL_TOGGLES);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState<boolean>(false);

  const activeService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const handleUpdateActiveService = (updated: ChurchService) => {
    setServices((prev) =>
      prev.map((serv) => (serv.id === updated.id ? updated : serv))
    );
  };

  const handleAddNewService = () => {
    const titlePrompt = prompt('Enter new service title (e.g. Advent Sunday Dec 03):');
    if (!titlePrompt) return;

    const newId = 'service-' + Date.now();
    const newService: ChurchService = {
      id: newId,
      title: titlePrompt,
      date: 'December 3, 2023',
      churchName: activeService.churchName,
      motto: activeService.motto,
      sermonSeries: rules.sermonSeries,
      sermonTitle: 'Lessons & Carols',
      scripture: 'Isaiah 9:2-7',
      preacher: 'Rev. Sarah Henderson',
      status: 'draft',
      items: [
        { id: '1', type: 'prelude', label: 'Prelude', detail: 'Chorale Prelude (Bach)' },
        { id: '2', type: 'call', label: 'Call to Worship', detail: 'Rev. Sarah Henderson' },
        { id: '3', type: 'hymn', label: 'Opening Hymn', detail: 'O Come, O Come Emmanuel', hymnNumber: '211' },
        { id: '4', type: 'sermon', label: 'Sermon', detail: 'Lessons & Carols', leader: 'Rev. Sarah Henderson' },
        { id: '5', type: 'benediction', label: 'Benediction', detail: 'Rev. Sarah Henderson' },
      ],
      announcements: [
        { id: 'a1', text: 'Welcome visitors! Please fill out a connection card in the pews.' },
      ],
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
              title: 'Rotation Note',
              message: 'Staff workload imbalance detected: 1 member over 3 weeks.',
              actionText: 'Shuffle Roster',
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
        title: 'Roster Balanced',
        message: 'Staff schedule rotated; fatigue buffer extended to 15m.',
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
          detail: 'Great is Thy Faithfulness',
          hymnNumber: '342',
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

  const handleConfirmFinalize = () => {
    handleUpdateActiveService({
      ...activeService,
      status: 'finalized',
    });
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
      />

      {/* Center Main Stage */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
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
        />

        <BulletinPreview
          service={activeService}
          onUpdateService={handleUpdateActiveService}
          isEditing={isEditing}
          onOpenAiAssist={() => setShowAiModal(true)}
        />
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
