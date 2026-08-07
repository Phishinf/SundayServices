import { ChurchService, Volunteer, ValidationAlert, ConfigurationRules, AutomationToggles } from '../types/bulletin';

export const INITIAL_SERVICES: ChurchService[] = [
  {
    id: 'service-1',
    title: 'Sunday Morning Oct 22, 2023',
    date: 'October 22, 2023',
    churchName: 'Grace Community Church',
    motto: 'Established in Faith, Growing in Love',
    sermonSeries: 'The Road to Emmaus',
    sermonTitle: 'The Road to Emmaus: Part IV',
    scripture: 'Luke 24:13-35',
    preacher: 'Rev. Sarah Henderson',
    status: 'draft',
    items: [
      { id: '1', type: 'prelude', label: 'Prelude', detail: 'Adagio in G Major (Bach)' },
      { id: '2', type: 'call', label: 'Call to Worship', detail: 'Rev. Sarah Henderson' },
      { id: '3', type: 'hymn', label: 'Hymn of Praise', detail: 'Great is Thy Faithfulness', hymnNumber: '342' },
      { id: '4', type: 'prayer', label: 'Pastoral Prayer', detail: 'Elder Mark Thompson' },
      { id: '5', type: 'sermon', label: 'Sermon', detail: 'The Road to Emmaus: Part IV', leader: 'Rev. Sarah Henderson' },
      { id: '6', type: 'offertory', label: 'Offertory Anthem', detail: '"O Love Divine" - Sanctuary Choir' },
      { id: '7', type: 'doxology', label: 'Doxology', detail: 'Praise God From Whom All Blessings Flow', hymnNumber: '95' },
      { id: '8', type: 'benediction', label: 'Benediction', detail: 'Rev. Sarah Henderson' }
    ],
    announcements: [
      { id: 'a1', text: 'Harvest Festival planning meeting this Tuesday at 7:00 PM in the Parish Hall.' },
      { id: 'a2', text: 'Wednesday Night Bible Study: Diving deeper into the Gospel of Luke.' },
      { id: 'a3', text: 'Volunteers needed for Sunday School hospitality setup next month.' }
    ]
  },
  {
    id: 'service-2',
    title: 'Evening Prayer Oct 25, 2023',
    date: 'October 25, 2023',
    churchName: 'Grace Community Church',
    motto: 'Established in Faith, Growing in Love',
    sermonSeries: 'Midweek Psalms',
    sermonTitle: 'Rest for the Weary Soul',
    scripture: 'Psalm 23:1-6',
    preacher: 'Elder Mark Thompson',
    status: 'scheduled',
    items: [
      { id: '201', type: 'prelude', label: 'Silent Meditation', detail: 'Organ Improvisation' },
      { id: '202', type: 'call', label: 'Evening Call', detail: 'Elder Mark Thompson' },
      { id: '203', type: 'hymn', label: 'Opening Hymn', detail: 'Abide With Me', hymnNumber: '543' },
      { id: '204', type: 'sermon', label: 'Homily', detail: 'Rest for the Weary Soul', leader: 'Elder Mark Thompson' },
      { id: '205', type: 'benediction', label: 'Evening Blessing', detail: 'Elder Mark Thompson' }
    ],
    announcements: [
      { id: 'a201', text: 'Choir rehearsal following evening prayer in the music suite.' },
      { id: 'a202', text: 'Community food pantry collection continues through Friday.' }
    ]
  },
  {
    id: 'service-3',
    title: 'Reformation Sunday Nov 05, 2023',
    date: 'November 5, 2023',
    churchName: 'Grace Community Church',
    motto: 'Established in Faith, Growing in Love',
    sermonSeries: 'Solas of the Faith',
    sermonTitle: 'A Mighty Fortress is Our God',
    scripture: 'Romans 1:16-17',
    preacher: 'Rev. Sarah Henderson',
    status: 'draft',
    items: [
      { id: '301', type: 'prelude', label: 'Trumpet Prelude', detail: 'Ein Feste Burg (Buxtehude)' },
      { id: '302', type: 'hymn', label: 'Processional Hymn', detail: 'A Mighty Fortress Is Our God', hymnNumber: '110' },
      { id: '303', type: 'prayer', label: 'Reformation Collect', detail: 'Clara Lewis' },
      { id: '304', type: 'sermon', label: 'Festival Sermon', detail: 'A Mighty Fortress is Our God', leader: 'Rev. Sarah Henderson' },
      { id: '305', type: 'offertory', label: 'Choir Anthem', detail: '"Grace Alone" - Combined Choirs' },
      { id: '306', type: 'benediction', label: 'Solemn Benediction', detail: 'Rev. Sarah Henderson' }
    ],
    announcements: [
      { id: 'a301', text: 'Reformation Heritage potluck lunch immediately following service.' }
    ]
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  { id: 'v1', initials: 'SH', name: 'Sarah Henderson', role: 'Lead Pastor', consecutiveWeeks: 4, available: true },
  { id: 'v2', initials: 'MT', name: 'Mark Thompson', role: 'Elder (A/V Desk)', consecutiveWeeks: 3, available: true },
  { id: 'v3', initials: 'CL', name: 'Clara Lewis', role: 'Choir Director', consecutiveWeeks: 2, available: true },
  { id: 'v4', initials: 'DR', name: 'David Ross', role: 'Guest Preacher', consecutiveWeeks: 1, available: true },
  { id: 'v5', initials: 'EB', name: 'Emily Bennett', role: 'Youth Leader / usher', consecutiveWeeks: 1, available: true }
];

export const INITIAL_ALERTS: ValidationAlert[] = [
  {
    id: 'alt-1',
    type: 'warning',
    title: 'Rotation Note',
    message: 'Mark Thompson has served as Elder for 3 consecutive weeks.',
    actionText: 'Shuffle Roster',
    actionType: 'shuffle_roster'
  },
  {
    id: 'alt-2',
    type: 'info',
    title: 'Hymn Logic',
    message: '"Great is Thy Faithfulness" matches 88% of your Sermon tags.',
    actionText: 'Optimize Hymn',
    actionType: 'update_hymn'
  }
];

export const INITIAL_RULES: ConfigurationRules = {
  sermonSeries: 'The Road to Emmaus',
  hymnStyle: 'Liturgical / Traditional',
  conflictCheck: true,
  bufferMinutes: 15
};

export const INITIAL_TOGGLES: AutomationToggles = {
  hymnSelection: true,
  volunteerRotation: true,
  conflictCheck: true,
  autoFormat: true
};

export const HYMN_LIBRARY = [
  { number: '342', title: 'Great is Thy Faithfulness', tags: ['faithfulness', 'grace', 'hope', 'emmaus', 'trust'], style: 'Traditional' },
  { number: '95', title: 'Praise God From Whom All Blessings Flow', tags: ['doxology', 'praise', 'thanksgiving'], style: 'Traditional' },
  { number: '110', title: 'A Mighty Fortress Is Our God', tags: ['strength', 'reformation', 'protection'], style: 'Liturgical' },
  { number: '543', title: 'Abide With Me', tags: ['evening', 'comfort', 'peace'], style: 'Traditional' },
  { number: '204', title: 'Come Thou Fount of Every Blessing', tags: ['grace', 'praise', 'joy'], style: 'Traditional' },
  { number: '128', title: 'Be Thou My Vision', tags: ['guidance', 'prayer', 'wisdom'], style: 'Traditional' },
  { number: '450', title: 'Crown Him With Many Crowns', tags: ['praise', 'king', 'majesty'], style: 'Liturgical' },
  { number: '312', title: 'How Great Thou Art', tags: ['creation', 'worship', 'praise'], style: 'Blended' }
];
