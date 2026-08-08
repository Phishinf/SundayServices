// The full bulletin (26-31-0802主餐崇拜.md) spans several distinct printed
// pages/sections beyond the order-of-service card. These tabs mirror that
// structure 1:1 so digitizing it can happen gradually, page by page, rather
// than collapsing everything into a single simplified view.
export const BULLETIN_PAGES = [
  { key: 'order', label: '崇拜程序' },
  { key: 'hymns', label: '詩歌全詞' },
  { key: 'worship', label: '崇拜資料' },
  { key: 'ministry', label: '家事分享' },
  { key: 'notices', label: '其他報告' },
  { key: 'prayers', label: '本週代禱' },
  { key: 'roster', label: '事奉表' },
  { key: 'attendance', label: '出席人數' },
] as const;

export type BulletinPageKey = (typeof BULLETIN_PAGES)[number]['key'];
