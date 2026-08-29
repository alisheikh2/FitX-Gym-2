/* Shared rich-text renderer: converts **bold** markers into <strong>.
   Used wherever coach bios / structured content are displayed so the
   literal ** markers never leak into the UI. */
export function renderRich(text) {
  if (text == null) return text;
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-navy">{part}</strong> : part));
}
