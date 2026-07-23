const STORAGE_KEY = "interpretability-roadmap-state-v1";

const defaultState = {
  currentWeek: 1,
  theme: "dark",
  weeks: {},
  selectedJournalWeek: 1,
  lastUpdated: null
};

let state = loadState();
let toastTimer;

const els = {
  navLinks: [...document.querySelectorAll(".nav-link")],
  views: [...document.querySelectorAll(".view")],
  currentWeekCard: document.querySelector("#currentWeekCard"),
  overallProgressCircle: document.querySelector("#overallProgressCircle"),
  overallProgressValue: document.querySelector("#overallProgressValue"),
  masteredWeeksValue: document.querySelector("#masteredWeeksValue"),
  currentPhaseBadge: document.querySelector("#currentPhaseBadge"),
  learnedCount: document.querySelector("#learnedCount"),
  learnedList: document.querySelector("#learnedList"),
  upcomingList: document.querySelector("#upcomingList"),
  phaseRail: document.querySelector("#phaseRail"),
  roadmapContent: document.querySelector("#roadmapContent"),
  roadmapSearch: document.querySelector("#roadmapSearch"),
  roadmapFilter: document.querySelector("#roadmapFilter"),
  positionDialog: document.querySelector("#positionDialog"),
  positionForm: document.querySelector("#positionForm"),
  positionPhase: document.querySelector("#positionPhase"),
  positionWeek: document.querySelector("#positionWeek"),
  positionPreview: document.querySelector("#positionPreview"),
  weekDialog: document.querySelector("#weekDialog"),
  weekDialogContent: document.querySelector("#weekDialogContent"),
  journalStats: document.querySelector("#journalStats"),
  journalWeekList: document.querySelector("#journalWeekList"),
  journalEditor: document.querySelector("#journalEditor"),
  toast: document.querySelector("#toast")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved, weeks: saved?.weeks || {} };
  } catch {
    return { ...defaultState };
  }
}

function saveState(message) {
  state.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) showToast(message);
}

function weekState(weekNumber) {
  return {
    understood: false,
    practised: false,
    gatePassed: false,
    notes: "",
    evidence: "",
    reflection: "",
    ...state.weeks[weekNumber]
  };
}

function setWeekState(weekNumber, patch) {
  state.weeks[weekNumber] = { ...weekState(weekNumber), ...patch };
  saveState();
}

function isMastered(weekNumber) {
  return weekState(weekNumber).gatePassed;
}

function weekProgress(weekNumber) {
  const progress = weekState(weekNumber);
  return [progress.understood, progress.practised, progress.gatePassed].filter(Boolean).length;
}

function currentWeek() {
  return ALL_WEEKS.find(week => week.week === Number(state.currentWeek)) || ALL_WEEKS[0];
}

function currentPhase() {
  return ROADMAP[currentWeek().phaseId];
}

function masteredWeeks() {
  return ALL_WEEKS.filter(week => isMastered(week.week));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function depthClass(depth) {
  return depth.toLowerCase();
}

function weekStatus(weekNumber) {
  if (isMastered(weekNumber)) return ["Mastered", "mastered-label"];
  if (weekProgress(weekNumber) > 0) return ["In progress", "progress-label"];
  if (weekNumber === Number(state.currentWeek)) return ["Current", "progress-label"];
  if (weekNumber < Number(state.currentWeek)) return ["Needs evidence", ""];
  return ["Upcoming", ""];
}

function renderOverview() {
  const current = currentWeek();
  const phase = currentPhase();
  const mastered = masteredWeeks();
  const overall = Math.round((mastered.length / ALL_WEEKS.length) * 100);
  const currentProgress = weekProgress(current.week);

  els.overallProgressValue.textContent = `${overall}%`;
  els.masteredWeeksValue.textContent = `${mastered.length} of 48 weeks`;
  els.currentPhaseBadge.textContent = `Phase ${phase.id}`;
  els.overallProgressCircle.style.strokeDashoffset = String(465 - (465 * overall) / 100);

  els.currentWeekCard.style.setProperty("--phase-colour", current.colour);
  els.currentWeekCard.innerHTML = `
    <div>
      <div class="week-kicker">Phase ${phase.id} · Week ${current.week}</div>
      <h3>${escapeHtml(current.title)}</h3>
      <p>${escapeHtml(phase.outcome)}</p>
      <div class="depth-tags">
        ${current.depth.map(depth => `<span class="depth-tag ${depthClass(depth)}">${escapeHtml(depth)}</span>`).join("")}
      </div>
    </div>
    <div class="current-focus">
      <h4>This week's focus</h4>
      <ul>${current.focus.slice(0, 4).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
    <div class="current-progress">
      <h4>Mastery evidence</h4>
      <div class="mini-progress" style="--phase-colour:${current.colour}"><span style="--progress:${(currentProgress / 3) * 100}%"></span></div>
      <strong>${currentProgress}/3</strong>
      <small>${currentProgress === 3 ? "Mastery gate passed" : "Understand · Practise · Pass gate"}</small>
    </div>
  `;

  els.learnedCount.textContent = `${mastered.length} mastered`;
  if (mastered.length === 0) {
    els.learnedList.innerHTML = `
      <div class="empty-state">
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8"></path></svg>
          <strong>Your evidence trail begins here</strong>
          <p>Pass a week's mastery gate and it will appear in this record of what you have built.</p>
        </div>
      </div>`;
  } else {
    els.learnedList.innerHTML = mastered.slice(-5).reverse().map(week => `
      <button class="learned-item" data-open-week="${week.week}" style="--item-colour:${week.colour}">
        <span class="item-index">${week.week}</span>
        <span><strong>${escapeHtml(week.title)}</strong><small>Phase ${week.phaseId} · ${escapeHtml(week.phaseShortTitle)}</small></span>
        <span class="status-mark"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"></path></svg></span>
      </button>
    `).join("");
  }

  const upcoming = ALL_WEEKS.filter(week => week.week > current.week).slice(0, 3);
  if (upcoming.length === 0) {
    els.upcomingList.innerHTML = `
      <div class="empty-state">
        <div><strong>The roadmap is complete</strong><p>Your portfolio and evidence now point towards the next research question.</p></div>
      </div>`;
  } else {
    els.upcomingList.innerHTML = upcoming.map(week => `
      <button class="upcoming-item" data-open-week="${week.week}" style="--item-colour:${week.colour}">
        <span class="item-index">${week.week}</span>
        <span><strong>${escapeHtml(week.title)}</strong><small>Phase ${week.phaseId} · ${week.depth.join(" + ")}</small></span>
        <span class="upcoming-arrow">→</span>
      </button>
    `).join("");
  }
}

function renderPhaseRail() {
  const activePhase = currentPhase().id;
  els.phaseRail.innerHTML = ROADMAP.map(phase => `
    <button class="phase-chip ${phase.id === activePhase ? "active" : ""}" data-phase-scroll="${phase.id}" style="--chip-colour:${phase.colour}">
      <span>Phase ${phase.id} · Weeks ${phase.weeks[0]}${phase.weeks[0] !== phase.weeks[1] ? `–${phase.weeks[1]}` : ""}</span>
      <strong>${escapeHtml(phase.shortTitle)}</strong>
    </button>
  `).join("");
}

function filteredWeeks() {
  const query = els.roadmapSearch.value.trim().toLowerCase();
  const filter = els.roadmapFilter.value;
  return ALL_WEEKS.filter(week => {
    const haystack = [week.title, week.phaseTitle, week.outcome, week.challenge, ...week.focus, ...week.depth].join(" ").toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (filter === "current" && week.phaseId !== currentPhase().id) return false;
    if (filter === "mastered" && !isMastered(week.week)) return false;
    if (filter === "in-progress" && weekProgress(week.week) === 0) return false;
    if (filter === "in-progress" && isMastered(week.week)) return false;
    if (filter === "upcoming" && week.week <= Number(state.currentWeek)) return false;
    return true;
  });
}

function renderRoadmap() {
  renderPhaseRail();
  const visibleWeeks = filteredWeeks();
  if (visibleWeeks.length === 0) {
    els.roadmapContent.innerHTML = `<div class="no-results">No roadmap weeks match this search and filter.</div>`;
    return;
  }

  els.roadmapContent.innerHTML = ROADMAP.map(phase => {
    const phaseWeeks = visibleWeeks.filter(week => week.phaseId === phase.id);
    if (!phaseWeeks.length) return "";
    const masteredCount = phase.weekData.filter(week => isMastered(week.week)).length;
    const phasePercent = Math.round((masteredCount / phase.weekData.length) * 100);
    return `
      <section class="phase-section" id="phase-${phase.id}" style="--phase-colour:${phase.colour}">
        <header class="phase-header">
          <div class="phase-number">0${phase.id}</div>
          <div class="phase-title">
            <h2>${escapeHtml(phase.title)}</h2>
            <p>${escapeHtml(phase.outcome)}</p>
          </div>
          <div class="phase-summary">
            <strong>${masteredCount}/${phase.weekData.length}</strong>
            <small>weeks mastered</small>
          </div>
          <div class="phase-progress"><span style="--phase-progress:${phasePercent}%"></span></div>
        </header>
        <div class="week-grid">
          ${phaseWeeks.map(week => {
            const [statusText, statusClass] = weekStatus(week.week);
            return `
              <button class="week-card ${week.week === Number(state.currentWeek) ? "current" : ""} ${isMastered(week.week) ? "mastered" : ""}" data-open-week="${week.week}">
                <span class="week-number"><span>Week</span><strong>${week.week}</strong></span>
                <span class="week-info">
                  <h3>${escapeHtml(week.title)}</h3>
                  <p>${escapeHtml(week.focus.slice(0, 2).join(" · "))}</p>
                  <span class="depth-tags">${week.depth.map(depth => `<span class="depth-tag ${depthClass(depth)}">${escapeHtml(depth)}</span>`).join("")}</span>
                </span>
                <span class="week-status">
                  <span class="${statusClass}">${statusText}</span>
                  <span>${weekProgress(week.week)}/3 evidence</span>
                </span>
              </button>`;
          }).join("")}
        </div>
      </section>`;
  }).join("");
}

function renderJournal() {
  const selected = ALL_WEEKS.find(week => week.week === Number(state.selectedJournalWeek)) || currentWeek();
  const notesCount = ALL_WEEKS.filter(week => weekState(week.week).notes.trim() || weekState(week.week).reflection.trim()).length;
  const evidenceCount = ALL_WEEKS.filter(week => weekState(week.week).evidence.trim()).length;

  els.journalStats.innerHTML = `
    <div class="journal-stat"><strong>${notesCount}</strong><span>weeks noted</span></div>
    <div class="journal-stat"><strong>${evidenceCount}</strong><span>evidence links</span></div>`;

  els.journalWeekList.innerHTML = ALL_WEEKS.map(week => {
    const progress = weekState(week.week);
    const hasEntry = progress.notes.trim() || progress.reflection.trim() || progress.evidence.trim();
    return `
      <button class="journal-week-button ${week.week === selected.week ? "active" : ""}" data-journal-week="${week.week}" style="--week-colour:${week.colour}">
        <span>${week.week}</span>
        <span>
          <strong>${escapeHtml(week.title)}</strong>
          <small>${hasEntry ? "Entry saved" : `Phase ${week.phaseId}`}</small>
        </span>
      </button>`;
  }).join("");

  const progress = weekState(selected.week);
  els.journalEditor.innerHTML = `
    <div class="editor-heading">
      <div>
        <p class="eyebrow" style="color:${selected.colour}">Phase ${selected.phaseId} · Week ${selected.week}</p>
        <h2>${escapeHtml(selected.title)}</h2>
        <p>${escapeHtml(selected.challenge)}</p>
      </div>
      <button class="button button-ghost compact" data-open-week="${selected.week}">Open mastery view</button>
    </div>
    <form class="editor-form" id="journalForm">
      <label>
        Learning notes
        <textarea name="notes" placeholder="What did you understand? What remains unclear?">${escapeHtml(progress.notes)}</textarea>
      </label>
      <label>
        Evidence or repository link
        <input name="evidence" type="text" value="${escapeHtml(progress.evidence)}" placeholder="https://github.com/... or a concise evidence description">
      </label>
      <label>
        Reflection
        <textarea name="reflection" placeholder="What changed in your mental model? What will you test next?">${escapeHtml(progress.reflection)}</textarea>
      </label>
      <div class="editor-save-row">
        <span class="autosave-copy">Saved only in this browser. Export a backup periodically.</span>
        <button class="button button-primary" type="submit">Save entry</button>
      </div>
    </form>`;
}

function renderAll() {
  document.documentElement.dataset.theme = state.theme;
  renderOverview();
  renderRoadmap();
  renderJournal();
}

function switchView(viewName) {
  els.navLinks.forEach(link => link.classList.toggle("active", link.dataset.view === viewName));
  els.views.forEach(view => view.classList.toggle("active", view.id === `${viewName}View`));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPositionDialog() {
  els.positionPhase.innerHTML = ROADMAP.map(phase =>
    `<option value="${phase.id}" ${phase.id === currentPhase().id ? "selected" : ""}>Phase ${phase.id} — ${escapeHtml(phase.title)}</option>`
  ).join("");
  populatePositionWeeks(currentPhase().id, state.currentWeek);
  updatePositionPreview();
  els.positionDialog.showModal();
}

function populatePositionWeeks(phaseId, selectedWeek) {
  const phase = ROADMAP[Number(phaseId)];
  els.positionWeek.innerHTML = phase.weekData.map(week =>
    `<option value="${week.week}" ${Number(selectedWeek) === week.week ? "selected" : ""}>Week ${week.week} — ${escapeHtml(week.title)}</option>`
  ).join("");
}

function updatePositionPreview() {
  const week = ALL_WEEKS.find(item => item.week === Number(els.positionWeek.value)) || currentWeek();
  els.positionPreview.innerHTML = `<strong>Week ${week.week}: ${escapeHtml(week.title)}</strong><span>${escapeHtml(week.challenge)}</span>`;
}

function openWeekDialog(weekNumber) {
  const week = ALL_WEEKS.find(item => item.week === Number(weekNumber));
  if (!week) return;
  const phase = ROADMAP[week.phaseId];
  const progress = weekState(week.week);

  els.weekDialogContent.innerHTML = `
    <div class="week-dialog-inner" style="--phase-colour:${week.colour}">
      <div class="week-dialog-top">
        <div>
          <div class="dialog-week-label">Phase ${phase.id} · Week ${week.week}</div>
          <h2>${escapeHtml(week.title)}</h2>
          <p>${escapeHtml(phase.outcome)}</p>
          <div class="depth-tags">${week.depth.map(depth => `<span class="depth-tag ${depthClass(depth)}">${escapeHtml(depth)}</span>`).join("")}</div>
        </div>
        <button class="icon-button close-button" data-close-week aria-label="Close week details">
          <svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      <div class="week-dialog-grid">
        <section class="dialog-section">
          <h3>Learn and practise</h3>
          <ul>${week.focus.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section class="dialog-section">
          <h3>This week's challenge</h3>
          <p>${escapeHtml(week.challenge)}</p>
          <h3 style="margin-top:19px">Phase evidence</h3>
          <p>${escapeHtml(phase.evidence)}</p>
        </section>
        <section class="dialog-section wide">
          <h3>Mastery record</h3>
          <div class="mastery-checks">
            <label class="mastery-check">
              <input type="checkbox" data-mastery-field="understood" ${progress.understood ? "checked" : ""}>
              <span><strong>I can explain it</strong><br>I can predict simple examples and explain the central ideas in plain and mathematical language.</span>
            </label>
            <label class="mastery-check">
              <input type="checkbox" data-mastery-field="practised" ${progress.practised ? "checked" : ""}>
              <span><strong>I have practised at the required depth</strong><br>I implemented or investigated it without copying a complete solution.</span>
            </label>
            <label class="mastery-check">
              <input type="checkbox" data-mastery-field="gatePassed" ${progress.gatePassed ? "checked" : ""}>
              <span><strong>I passed the mastery gate</strong><br>I tested myself against the phase gate and saved credible evidence.</span>
            </label>
          </div>
          <div class="gate-warning">
            <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z"></path></svg>
            <span>“Mastered” is counted only when the mastery gate is passed. Earlier weeks are not automatically completed when you move your current position.</span>
          </div>
        </section>
        <section class="dialog-section wide">
          <h3>Phase mastery gate</h3>
          <ul>${phase.gate.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section class="dialog-section wide">
          <h3>Suggested material</h3>
          <div class="resource-links">
            ${phase.resources.map(([label, url]) => `<a class="resource-link" href="${url}" target="_blank" rel="noreferrer">${escapeHtml(label)} ↗</a>`).join("")}
          </div>
        </section>
      </div>

      <div class="week-dialog-actions">
        <span class="dialog-status">${progress.gatePassed ? "Mastered — gate evidence recorded" : `${weekProgress(week.week)}/3 mastery signals recorded`}</span>
        <div>
          <button class="button button-ghost" data-journal-from-dialog="${week.week}">Add notes or evidence</button>
          ${week.week !== Number(state.currentWeek) ? `<button class="button button-primary" data-set-current="${week.week}">Make current week</button>` : ""}
        </div>
      </div>
    </div>`;

  els.weekDialog.dataset.week = String(week.week);
  els.weekDialog.showModal();
}

function handleMasteryChange(input) {
  const weekNumber = Number(els.weekDialog.dataset.week);
  const field = input.dataset.masteryField;
  const patch = { [field]: input.checked };
  if (field === "gatePassed" && input.checked) {
    patch.understood = true;
    patch.practised = true;
  }
  setWeekState(weekNumber, patch);
  renderAll();
  openWeekDialogRefresh(weekNumber);
  showToast(field === "gatePassed" && input.checked ? `Week ${weekNumber} marked as mastered` : "Mastery record updated");
}

function openWeekDialogRefresh(weekNumber) {
  els.weekDialog.close();
  openWeekDialog(weekNumber);
}

function setCurrentWeek(weekNumber) {
  state.currentWeek = Number(weekNumber);
  saveState(`Current position moved to Week ${weekNumber}`);
  renderAll();
}

function saveJournalEntry(form) {
  const data = new FormData(form);
  setWeekState(state.selectedJournalWeek, {
    notes: String(data.get("notes") || ""),
    evidence: String(data.get("evidence") || ""),
    reflection: String(data.get("reflection") || "")
  });
  saveState("Journal entry saved");
  renderJournal();
}

function exportProgress() {
  const exportData = {
    app: "Interpretability Learning Dashboard",
    version: 1,
    exportedAt: new Date().toISOString(),
    state
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `interpretability-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Progress backup exported");
}

function importProgress(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      const nextState = imported.state || imported;
      if (!nextState || !Number.isInteger(Number(nextState.currentWeek)) || Number(nextState.currentWeek) < 1 || Number(nextState.currentWeek) > 48) {
        throw new Error("Invalid dashboard backup");
      }
      state = { ...defaultState, ...nextState, weeks: nextState.weeks || {} };
      saveState("Progress backup imported");
      renderAll();
    } catch {
      showToast("This file is not a valid dashboard backup");
    }
  };
  reader.readAsText(file);
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
}

document.addEventListener("click", event => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) switchView(viewButton.dataset.view);

  const weekButton = event.target.closest("[data-open-week]");
  if (weekButton) openWeekDialog(weekButton.dataset.openWeek);

  const phaseButton = event.target.closest("[data-phase-scroll]");
  if (phaseButton) {
    const target = document.querySelector(`#phase-${phaseButton.dataset.phaseScroll}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const journalButton = event.target.closest("[data-journal-week]");
  if (journalButton) {
    state.selectedJournalWeek = Number(journalButton.dataset.journalWeek);
    saveState();
    renderJournal();
  }

  if (event.target.closest("[data-close-week]")) els.weekDialog.close();

  const setCurrentButton = event.target.closest("[data-set-current]");
  if (setCurrentButton) {
    els.weekDialog.close();
    setCurrentWeek(setCurrentButton.dataset.setCurrent);
  }

  const journalFromDialog = event.target.closest("[data-journal-from-dialog]");
  if (journalFromDialog) {
    state.selectedJournalWeek = Number(journalFromDialog.dataset.journalFromDialog);
    saveState();
    els.weekDialog.close();
    switchView("journal");
    renderJournal();
  }
});

document.addEventListener("change", event => {
  if (event.target.matches("[data-mastery-field]")) handleMasteryChange(event.target);
});

document.addEventListener("submit", event => {
  if (event.target.id === "journalForm") {
    event.preventDefault();
    saveJournalEntry(event.target);
  }
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveState();
  document.documentElement.dataset.theme = state.theme;
});

document.querySelector("#updatePositionButton").addEventListener("click", openPositionDialog);
document.querySelector("#continueButton").addEventListener("click", () => openWeekDialog(state.currentWeek));
document.querySelector("#viewCurrentDetails").addEventListener("click", () => openWeekDialog(state.currentWeek));
document.querySelector("#exploreRoadmapButton").addEventListener("click", () => switchView("roadmap"));
document.querySelector("#exportButton").addEventListener("click", exportProgress);
document.querySelector("#importInput").addEventListener("change", event => importProgress(event.target.files[0]));

els.roadmapSearch.addEventListener("input", renderRoadmap);
els.roadmapFilter.addEventListener("change", renderRoadmap);

els.positionPhase.addEventListener("change", () => {
  populatePositionWeeks(els.positionPhase.value, ROADMAP[Number(els.positionPhase.value)].weeks[0]);
  updatePositionPreview();
});
els.positionWeek.addEventListener("change", updatePositionPreview);

els.positionForm.addEventListener("submit", event => {
  const submitter = event.submitter;
  if (submitter?.value === "cancel") return;
  event.preventDefault();
  setCurrentWeek(els.positionWeek.value);
  els.positionDialog.close();
});

els.positionDialog.addEventListener("click", event => {
  if (event.target === els.positionDialog) els.positionDialog.close();
});
els.weekDialog.addEventListener("click", event => {
  if (event.target === els.weekDialog) els.weekDialog.close();
});

renderAll();
