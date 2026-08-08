export interface ServiceItem {
  id: string;
  type: 'prelude' | 'call' | 'hymn' | 'prayer' | 'sermon' | 'offertory' | 'doxology' | 'benediction' | 'custom';
  label: string;
  detail: string;
  leader?: string;
  hymnNumber?: string;
}

export interface Announcement {
  id: string;
  text: string;
}

// Editorial approval pipeline: officer drafts -> pastor reviews -> deacon
// final cross-check -> finalized (ready to publish/send). A reject at either
// review stage sends the bulletin back to 'draft' for the officer to re-edit.
export type ServiceStatus = 'draft' | 'pastor_review' | 'deacon_review' | 'finalized';

export type EditorialRole = 'officer' | 'pastor' | 'deacon';

export interface ChurchService {
  id: string;
  title: string; // e.g. "Sunday Morning Oct 22, 2023"
  date: string; // e.g. "October 22, 2023"
  churchName: string;
  motto: string;
  sermonTitle: string;
  sermonSeries: string;
  scripture: string;
  preacher: string;
  items: ServiceItem[];
  announcements: Announcement[];
  status: ServiceStatus;
}

export interface Volunteer {
  id: string;
  initials: string;
  name: string;
  role: string;
  consecutiveWeeks: number;
  available: boolean;
}

export interface ValidationAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  actionText?: string;
  actionType?: 'shuffle_roster' | 'update_hymn' | 'resolve_conflict' | 'dismiss';
}

export interface ConfigurationRules {
  sermonSeries: string;
  hymnStyle: string;
  conflictCheck: boolean;
  bufferMinutes: number;
}

export interface AutomationToggles {
  hymnSelection: boolean;
  volunteerRotation: boolean;
  conflictCheck: boolean;
  autoFormat: boolean;
}
