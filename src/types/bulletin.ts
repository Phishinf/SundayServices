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
  status: 'draft' | 'scheduled' | 'finalized';
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
