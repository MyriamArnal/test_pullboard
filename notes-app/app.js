(() => {
  const key = "notes-app.items";
  const load = () => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
  let notes = load(); let selectedId = notes[0]?.id || null;
  const $ = (id) => document.getElementById(id);
  const empty = $("empty-state"), layout = $("notes-layout"), list = $("note-list"), title = $("note-title"), body = $("note-body"), status = $("save-status");
  const save = () => { localStorage.setItem(key, JSON.stringify(notes)); status.textContent = "Saved locally"; };
  const current = () => notes.find((note) => note.id === selectedId);
  const render = () => {
    const hasNotes = notes.length > 0; empty.hidden = hasNotes; layout.hidden = !hasNotes; $("note-count").textContent = hasNotes ? `${notes.length}` : "";
    list.innerHTML = notes.map((note) => `<button class="note-item ${note.id === selectedId ? "active" : ""}" data-id="${note.id}"><strong>${escapeHtml(note.title || "Untitled note")}</strong><small>${escapeHtml(note.body || "No content yet")}</small></button>`).join("");
    const note = current(); if (note) { title.value = note.title; body.value = note.body; }
    list.querySelectorAll(".note-item").forEach((item) => item.addEventListener("click", () => { selectedId = item.dataset.id; render(); }));
  };
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  const create = () => { const note = { id: crypto.randomUUID(), title: "", body: "" }; notes.unshift(note); selectedId = note.id; save(); render(); title.focus(); };
  const update = () => { const note = current(); if (!note) return; note.title = title.value; note.body = body.value; save(); render(); };
  const remove = () => { if (!current() || !window.confirm("Delete this note?")) return; notes = notes.filter((note) => note.id !== selectedId); selectedId = notes[0]?.id || null; save(); render(); };
  $("new-note").addEventListener("click", create); $("empty-create").addEventListener("click", create); title.addEventListener("input", update); body.addEventListener("input", update); $("delete-note").addEventListener("click", remove); render();
})();
