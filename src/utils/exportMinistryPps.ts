// Turns "家事分享" (ministryUpdates) into a downloadable .pptx deck — one
// slide per item plus a title slide — so officers can project it during
// announcements instead of retyping it into PowerPoint by hand.

import type PptxGenJS from 'pptxgenjs';
import { ChurchService, TextBlock } from '../types/bulletin';

const FONT = 'Microsoft JhengHei';
const INK = '1E293B'; // slate-800
const MUTED = '64748B'; // slate-500
const ACCENT = '2563EB'; // blue-600

const SLIDE_W = 10;
const SLIDE_H = 5.63; // 16:9

function bodyFontSize(body: string): number {
  const len = body.length;
  if (len > 500) return 12;
  if (len > 320) return 14;
  if (len > 180) return 16;
  if (len > 80) return 18;
  return 22;
}

function addTitleSlide(pptx: PptxGenJS, service: ChurchService): void {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  slide.addText(service.churchName, {
    x: 0.5, y: 1.5, w: SLIDE_W - 1, h: 0.9,
    align: 'center', fontFace: FONT, fontSize: 32, bold: true, color: INK,
  });
  slide.addText(`「${service.motto}」`, {
    x: 0.5, y: 2.35, w: SLIDE_W - 1, h: 0.5,
    align: 'center', fontFace: FONT, fontSize: 16, italic: true, color: MUTED,
  });
  slide.addText('家事分享', {
    x: 0.5, y: 3.05, w: SLIDE_W - 1, h: 0.8,
    align: 'center', fontFace: FONT, fontSize: 28, bold: true, color: ACCENT,
  });
  slide.addText(service.date, {
    x: 0.5, y: 3.9, w: SLIDE_W - 1, h: 0.5,
    align: 'center', fontFace: FONT, fontSize: 14, color: MUTED,
  });
}

function addItemSlide(pptx: PptxGenJS, item: TextBlock): void {
  const slide = pptx.addSlide();
  slide.background = { color: 'FFFFFF' };

  slide.addText(item.title, {
    x: 0.5, y: 0.4, w: SLIDE_W - 1, h: 0.7,
    align: 'left', fontFace: FONT, fontSize: 24, bold: true, color: ACCENT,
  });

  const bodyTop = item.meta ? 1.5 : 1.15;
  if (item.meta) {
    slide.addText(item.meta, {
      x: 0.5, y: 1.05, w: SLIDE_W - 1, h: 0.4,
      align: 'left', fontFace: FONT, fontSize: 12, italic: true, color: MUTED,
    });
  }

  slide.addText(item.body, {
    x: 0.5, y: bodyTop, w: SLIDE_W - 1, h: SLIDE_H - bodyTop - 0.4,
    align: 'left', valign: 'top', fontFace: FONT,
    fontSize: bodyFontSize(item.body), color: INK,
    lineSpacingMultiple: 1.3, fit: 'shrink',
  });
}

export async function exportMinistryUpdatesToPptx(service: ChurchService): Promise<void> {
  // Loaded on demand — pptxgenjs is sizeable and most sessions never export a deck.
  const { default: PptxGenJS } = await import('pptxgenjs');
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'BULLETIN_16x9', width: SLIDE_W, height: SLIDE_H });
  pptx.layout = 'BULLETIN_16x9';

  addTitleSlide(pptx, service);
  service.ministryUpdates.forEach((item) => addItemSlide(pptx, item));

  await pptx.writeFile({ fileName: `家事分享　${service.title}.pptx` });
}
