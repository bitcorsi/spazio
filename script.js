/* ==========================================================
   Portale Maker - script.js
   Gestisce:
   ✓ Lista corsi
   ✓ Filtro ricerca
   ✓ Dettaglio corso
   ✓ Connessione Airtable con campi reali
========================================================== */

/* ----------------------------------------------------------
   🔑 CONFIGURAZIONE (INSERISCI I TUOI DATI)
---------------------------------------------------------- */
const API_KEY = "patgJP8D7vLtC1PA1.19ec4450820a3f1ee8fe3053adb0a325608ce241c5e8ed3d316d9f0d8290418a";
const BASE_ID = "appmMqXZlrXlGD6HN";
const TABLE = "Corsi"; // Nome esatto TAB Airtable

const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

/* ----------------------------------------------------------
   🔥 FUNZIONE GENERICA AIRTABLE
---------------------------------------------------------- */
async function fetchAirtable(extra = "") {
  const res = await fetch(`${API_URL}${extra}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  return await res.json();
}

/* ==========================================================
   📌 LISTA CORSI (corsi.html)
========================================================== */
async function loadCourses() {
  const container = document.getElementById("lista-corsi");
  if (!container) return;

  container.innerHTML = "<p>Caricamento corsi...</p>";

  // Recupera solo corsi pubblicati
  const filter = encodeURIComponent(`pubblicato = 1`);
  const data = await fetchAirtable(`?filterByFormula=${filter}&maxRecords=300`);

  if (!data.records || data.records.length === 0) {
    container.innerHTML = "<p>Nessun corso disponibile.</p>";
    return;
  }

  renderCourses(data.records);
}

/* ----------------------------------------------------------
   🎨 CREA CARDS ELENCO CORSI
---------------------------------------------------------- */
function renderCourses(records) {
  const container = document.getElementById("lista-corsi");
  container.innerHTML = "";

  records.forEach(rec => {
    const c = rec.fields;

    const id = rec.id;
    const img = c.immagine || "https://via.placeholder.com/600x400?text=Portale+Maker";

    container.innerHTML += `
      <div class="course-card">
        <img src="${img}" alt="${c.titolo}" />
        <div class="course-info">

          <h3 class="course-title">${c.titolo}</h3>

          <p class="course-meta">
            ${c.categoria || ""} • 
            ${c.eta_min || ""}–${c.eta_max || ""} anni
          </p>

          <a class="btn" href="corso.html?id=${id}">Dettagli</a>
        </div>
      </div>
    `;
  });
}

/* ----------------------------------------------------------
   🔎 FILTRO RICERCA (live)
---------------------------------------------------------- */
function filterCourses(q) {
  const cards = document.querySelectorAll(".course-card");
  q = q.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector(".course-title").textContent.toLowerCase();
    const meta = card.querySelector(".course-meta").textContent.toLowerCase();

    card.style.display = (title.includes(q) || meta.includes(q)) ? "block" : "none";
  });
}

/* ==========================================================
   📄 DETTAGLIO CORSO (corso.html)
========================================================== */
async function loadCourseDetail() {
  const container = document.getElementById("corso-container");
  if (!container) return;

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

  if (typeof renderCourseDetail === "function") {
    renderCourseDetail(data);
  }
}

/* ==========================================================
   🚀 AUTO-INIT
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadCourses();       // per corsi.html
  loadCourseDetail();  // per corso.html
});
