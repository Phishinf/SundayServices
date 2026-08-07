import { ChurchService, Volunteer, ValidationAlert, ConfigurationRules, AutomationToggles } from '../types/bulletin';

export const INITIAL_SERVICES: ChurchService[] = [
  {
    id: 'service-1',
    title: '主餐崇拜　二零二六年八月二日',
    date: '二零二六年八月二日　上午 9 時 45 分',
    churchName: '茶果嶺浸信會',
    motto: '同心侍主，共建神家',
    sermonSeries: '知足感恩的心',
    sermonTitle: '知足感恩的心',
    scripture: '出埃及記 20:17、申命記 5:21',
    preacher: '葉秀嫻傳道',
    status: 'draft',
    items: [
      { id: '1', type: 'prelude', label: '安靜', detail: '會眾' },
      { id: '2', type: 'call', label: '宣召', detail: '詩篇 107:1、腓立比書 4:5-7 — 譚鈞平弟兄' },
      { id: '3', type: 'prayer', label: '祈禱', detail: '主席' },
      { id: '4', type: 'hymn', label: '讚美', detail: '歡欣、真神羔羊、要記念我 — 李劉美珊姊妹', hymnNumber: '306、524' },
      { id: '5', type: 'offertory', label: '奉獻祈禱', detail: '黎陸潤卿姊妹' },
      { id: '6', type: 'custom', label: '主餐', detail: '葉秀嫻傳道' },
      { id: '7', type: 'custom', label: '襄禮', detail: '林遠宏執事、蔡月保執事、陳玉娟執事' },
      { id: '8', type: 'hymn', label: '回應詩歌', detail: '除祢以外 — 眾坐' },
      { id: '9', type: 'hymn', label: '回應詩歌', detail: '祢的恩典 — 領詩' },
      { id: '10', type: 'custom', label: '家事分享', detail: '陳玉娟執事' },
      { id: '11', type: 'prayer', label: '牧禱', detail: '葉秀嫻傳道' },
      { id: '12', type: 'benediction', label: '祝禱', detail: '葉秀嫻傳道' },
      { id: '13', type: 'custom', label: '殿樂', detail: '會眾' },
      { id: '14', type: 'custom', label: '彼此祝福', detail: '主賜福你 — 會眾' },
    ],
    announcements: [
      { id: 'a1', text: '茶浸 Y2K 8 月份聚會預告：8 月 8 日（六）下午 2 時於教會舉行，歡迎中學生參加，並與 Peter、祉康傳道聯絡查詢。' },
      { id: 'a2', text: '茶堂「共享空間」逢禮拜二至禮拜五上午 10 時半至下午 4 時開放，歡迎街坊、鄰舍到訪，彼此認識，保持聯絡。' },
      { id: 'a3', text: '2026 年執事選舉現已開始進行，提名將於本主日截止，請各會友把握機會提名，同心侍主、共建神家。' },
      { id: 'a4', text: '青少年暑期活動：機械人及 3D 打印工作坊，8 月 18 日至 20 日下午 3 時至 5 時於觀塘堂舉行，歡迎升小五至升中六學生報名。' },
      { id: 'a5', text: '讀經獎勵計劃：歡迎透過 https://getinbible.vercel.app/ 或 QR code 進入應用程式，深入了解神的話語。' },
      { id: 'a6', text: '同工休假：葉傳道 8 月 11 日至 29 日、潤生傳道 8 月 12 日至 29 日放年假，敬請留意。' },
      { id: 'a7', text: '本會現正聘請幹事及傳道，有意申請者請聯絡葉秀嫻傳道或林遠宏執事，並請弟兄姊妹繼續禱告記念。' },
    ],
  },
  {
    id: 'service-2',
    title: '主日崇拜　二零二六年八月九日',
    date: '二零二六年八月九日　上午 9 時 45 分',
    churchName: '茶果嶺浸信會',
    motto: '同心侍主，共建神家',
    sermonSeries: '同心侍主',
    sermonTitle: '同心侍主',
    scripture: '羅馬書 12:1-2',
    preacher: '陳潤生傳道',
    status: 'scheduled',
    items: [
      { id: '201', type: 'prelude', label: '序樂', detail: '梁湘盈姊妹' },
      { id: '202', type: 'call', label: '宣召', detail: '詩篇 100:1-5 — 蔡錦源弟兄' },
      { id: '203', type: 'prayer', label: '祈禱', detail: '主席' },
      { id: '204', type: 'hymn', label: '讚美詩歌', detail: '你真偉大', hymnNumber: '1' },
      { id: '205', type: 'sermon', label: '信息', detail: '同心侍主', leader: '陳潤生傳道' },
      { id: '206', type: 'offertory', label: '奉獻', detail: '陳潤生傳道' },
      { id: '207', type: 'benediction', label: '祝禱', detail: '陳潤生傳道' },
    ],
    announcements: [
      { id: 'a201', text: '主日學合班：8 月 16 日上午 11 時半至 12 時半，羅潔盈博士主講「新教崇拜中的聖言」，歡迎弟兄姊妹參加。' },
      { id: 'a202', text: '事委會將於今日下午 2 時半舉行，敬請同工及事委預留時間出席。' },
    ],
  },
  {
    id: 'service-3',
    title: '主日崇拜　二零二六年七月廿六日',
    date: '二零二六年七月廿六日　上午 9 時 45 分',
    churchName: '茶果嶺浸信會',
    motto: '同心侍主，共建神家',
    sermonSeries: '宣教的心',
    sermonTitle: '宣教的心',
    scripture: '使徒行傳 1:8',
    preacher: '藍志揚傳道',
    status: 'finalized',
    items: [
      { id: '301', type: 'prelude', label: '序樂', detail: '司琴' },
      { id: '302', type: 'call', label: '宣召', detail: '詩篇 96:1-3' },
      { id: '303', type: 'hymn', label: '讚美詩歌', detail: '普天同慶', hymnNumber: '1' },
      { id: '304', type: 'prayer', label: '祈禱', detail: '主席' },
      { id: '305', type: 'sermon', label: '信息', detail: '宣教的心', leader: '藍志揚傳道' },
      { id: '306', type: 'offertory', label: '獻詩', detail: '詩班獻詩' },
      { id: '307', type: 'benediction', label: '祝福', detail: '藍志揚傳道' },
    ],
    announcements: [
      { id: 'a301', text: '宣教祈禱會：8 月 26 日（三）舉行，藍志揚傳道主領，歡迎弟兄姊妹一同代禱。' },
    ],
  },
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  { id: 'v1', initials: '葉秀', name: '葉秀嫻傳道', role: '主任傳道', consecutiveWeeks: 4, available: true },
  { id: 'v2', initials: '林遠', name: '林遠宏執事', role: '執事（襄禮／總務）', consecutiveWeeks: 3, available: true },
  { id: 'v3', initials: '李劉', name: '李劉美珊姊妹', role: '領詩', consecutiveWeeks: 2, available: true },
  { id: 'v4', initials: '陳潤', name: '陳潤生傳道', role: '客席傳道', consecutiveWeeks: 1, available: true },
  { id: 'v5', initials: '蘇馮', name: '蘇馮恩怡姊妹', role: '司琴／影音', consecutiveWeeks: 1, available: true },
];

export const INITIAL_ALERTS: ValidationAlert[] = [
  {
    id: 'alt-1',
    type: 'warning',
    title: '事奉輪替提示',
    message: '林遠宏執事已連續 3 週擔任襄禮／總務事奉。',
    actionText: '調配事奉表',
    actionType: 'shuffle_roster',
  },
  {
    id: 'alt-2',
    type: 'info',
    title: '詩歌配對建議',
    message: '「真神羔羊」與本週信息主題「知足感恩的心」相符度達 88%。',
    actionText: '套用建議詩歌',
    actionType: 'update_hymn',
  },
];

export const INITIAL_RULES: ConfigurationRules = {
  sermonSeries: '知足感恩的心',
  hymnStyle: '禮儀傳統詩歌',
  conflictCheck: true,
  bufferMinutes: 15,
};

export const INITIAL_TOGGLES: AutomationToggles = {
  hymnSelection: true,
  volunteerRotation: true,
  conflictCheck: true,
  autoFormat: true,
};

export const HYMN_LIBRARY = [
  { number: '306', title: '歡欣', tags: ['感謝', '讚美', '榮耀'], style: '傳統' },
  { number: '524', title: '要記念我', tags: ['主餐', '紀念', '捨己'], style: '傳統' },
  { number: '401', title: '真神羔羊', tags: ['救贖', '羔羊', '敬拜'], style: '傳統' },
  { number: '402', title: '除祢以外', tags: ['主餐', '倚靠', '安慰'], style: '敬拜讚美' },
  { number: '403', title: '祢的恩典', tags: ['恩典', '奉獻', '跟隨'], style: '敬拜讚美' },
  { number: '404', title: '主賜福你', tags: ['祝福', '差遣', '團契'], style: '傳統' },
  { number: '109', title: '奇異恩典', tags: ['恩典', '救贖', '感恩'], style: '傳統' },
  { number: '1', title: '普天同慶', tags: ['讚美', '敬拜', '榮耀'], style: '禮儀' },
];
