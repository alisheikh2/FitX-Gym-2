import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Field, Confirm, useToast, Skeleton, Badge } from '../../components/admin/ui.jsx';

/** Content editor uses a simple line format:
 *  "# Heading" → h2 block, "- item" → list item, blank-line separated paragraphs. */
function toBlocks(text) {
  const blocks = [];
  let para = [];
  let list = [];
  const flushP = () => { if (para.length) { blocks.push({ type: 'p', text: para.join(' ') }); para = []; } };
  const flushL = () => { if (list.length) { blocks.push({ type: 'ul', items: list }); list = []; } };
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) { flushP(); flushL(); continue; }
    if (t.startsWith('# ')) { flushP(); flushL(); blocks.push({ type: 'h2', text: t.slice(2) }); }
    else if (t.startsWith('- ')) { flushP(); list.push(t.slice(2)); }
    else para.push(t);
  }
  flushP(); flushL();
  return blocks;
}

function fromBlocks(blocks) {
  return (blocks || []).map((b) => b.type === 'h2' ? `# ${b.text}` : b.type === 'ul' ? b.items.map((i) => `- ${i}`).join('\n') : b.text).join('\n\n');
}

const BLANK = { title: '', slug: '', excerpt: '', cover: '', tags: '', contentText: '' };

export default function AdminBlog() {
  const { data: posts, loading, reload } = useFetch('/blog');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  async function save(e) {
    e.preventDefault();
    try {
      const body = {
        title: editing.title,
        slug: editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: editing.excerpt,
        cover: editing.cover,
        tags: editing.tags.split(',').map((t) => t.trim()).filter(Boolean),
        content: toBlocks(editing.contentText),
        status: 'published'
      };
      if (editing._id) await api.put(`/blog/${editing._id}`, body); else await api.post('/blog', body);
      toast('Article saved & published'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="h-display text-3xl text-paper">Blog / Resources</h1>
        <button className="btn-primary btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New Article</button>
      </div>
      {loading ? <Skeleton rows={4} /> : (
        <div className="space-y-3">
          {(posts || []).map((p) => (
            <div key={p._id} className="card p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-paper">{p.title} <Badge tone={p.status === 'published' ? 'ok' : 'neutral'}>{p.status}</Badge></p>
                <p className="text-xs text-muted mt-1">/blog/{p.slug} · {new Date(p.publishedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="text-xs text-brand" onClick={() => setEditing({ ...p, tags: (p.tags || []).join(', '), contentText: fromBlocks(p.content) })}>Edit</button>
                <button className="text-xs text-red-400" onClick={() => setConfirm(p)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit article' : 'New article'} wide>
        {editing && (
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
            <Field label="Title *" className="sm:col-span-2"><input className="input" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
            <Field label="Slug"><input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto" /></Field>
            <Field label="Cover image path"><input className="input" value={editing.cover} onChange={(e) => setEditing({ ...editing, cover: e.target.value })} /></Field>
            <Field label="Excerpt" className="sm:col-span-2"><textarea rows={2} className="input" value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></Field>
            <Field label="Tags (comma separated)"><input className="input" value={editing.tags} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} /></Field>
            <div className="text-xs text-muted self-end pb-2">Format: “# heading”, “- list item”, blank line = new paragraph.</div>
            <Field label="Content" className="sm:col-span-2"><textarea rows={12} className="input font-mono text-xs" value={editing.contentText} onChange={(e) => setEditing({ ...editing, contentText: e.target.value })} /></Field>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm">Publish</button>
            </div>
          </form>
        )}
      </Modal>
      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onYes={async () => { await api.del(`/blog/${confirm._id}`); toast('Article deleted'); reload(); }} title="Delete article?" body={confirm?.title} />
    </div>
  );
}
