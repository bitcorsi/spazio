/* ==========================================================
   Portale Maker - script.js
   Gestisce caricamento corsi, dettaglio corso e ricerca.
   Compatibile con Airtable API v0 (Personal Access Token)
========================================================== */

/* ----------------------------------------------------------
   🔑 CONFIGURAZIONE (INSERISCI I TUOI DATI QUI)
---------------------------------------------------------- */
const API_KEY = "INSERISCI_TUA_API_KEY";
const BASE_ID = "INSERISCI_TUO_BASE_ID";
const TABLE = "Corsi"; // Nome esatto della tabella Airtable

const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

/* ----------------------------------------------------------
   🔥 CHIAMATA GENERICA A AIRTABLE
---------------------------------------------------------- */
async function fetchAirtable(params = "") {
  const res = await fetch(`${API_URL}${params}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  return await res.json();
}

/* ----------------------------------------------------------
   📌 LISTA CORSI (per corsi.html)
---------------------------------------------------------- */
async function loadCourses() {
  const container = document.getElementById("lista-corsi");
  if (!container) return; // Non siamo in corsi.html

  container.innerHTML = "<p>Caricamento corsi...</p>";

  const data = await fetchAirtable("?maxRecords=200&sort[0][field]=titolo");

  if (!data.records || data.records.length === 0) {
    container.innerHTML = "<p>Nessun corso disponibile al momento.</p>";
    return;
  }

  renderCourses(data.records);
}

/* ----------------------------------------------------------
   🎨 RENDER CARD CORSI
---------------------------------------------------------- */
function renderCourses(records) {
  const container = document.getElementById("lista-corsi");
  container.innerHTML = "";

  records.forEach(rec => {
    const c = rec.fields;
    const id = rec.id;

    const img = c.immagine || "https://via.placeholder.com/400x250?text=Portale+Maker";

    container.innerHTML += `
      <div class="course-card">
        <img src="${img}" alt="${c.titolo}" />
        <div class="course-info">
          <h3 class="course-title">${c.titolo || "Senza titolo"}</h3>
          <p class="course-meta">${c.eta_min || ""}–${c.eta_max || ""} anni • ${c.orario || ""}</p>
          <a class="btn" style="margin-top:10px;" href="corso.html?id=${id}">Dettagli</a>
        </div>
      </div>
    `;
  });
}

/* ----------------------------------------------------------
   🔎 FILTRO RICERCA
---------------------------------------------------------- */
function filterCourses(query) {
  const cards = document.querySelectorAll(".course-card");

  cards.forEach(card => {
    const title = card.querySelector(".course-title").textContent.toLowerCase();
    const meta = card.querySelector(".course-meta").textContent.toLowerCase();

    card.style.display = (title.includes(query) || meta.includes(query))
      ? "block"
      : "none";
  });
}

/* ----------------------------------------------------------
   📄 DETTAGLIO CORSO (per corso.html)
---------------------------------------------------------- */
async function loadCourseDetail() {
  const container = document.getElementById("corso-container");
  if (!container) return; // Non siamo in corso.html

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>ID corso non trovato.</p>";
    return;
  }

  const data = await fetchAirtable(`/${id}`);

  if (!data.fields) {
    container.innerHTML = "<p>Corso non trovato.</p>";
    return;
  }

  // Usa la funzione definita dentro corso.html
  if (typeof renderCourseDetail === "function") {
    renderCourseDetail(data);
  }
}

/* ----------------------------------------------------------
   🚀 AUTO-INIT
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadCourses();       // Per corsi.html
  loadCourseDetail();  // Per corso.html
});
