
"use strict";

/* BİZDEN KALAN - ANA UYGULAMA */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const read = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  };

  const write = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);

  // MENÜ SİSTEMİ
  const buttons = document.querySelectorAll("[data-page]");
  const pages = document.querySelectorAll(".page");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.page;

      pages.forEach((page) => {
        page.classList.toggle("active", page.id === target);
      });

      buttons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ANILAR
  function renderMemories() {
    const list = $("memoryList");
    const memories = read("bzk_memories");

    if (!list) return;

    list.innerHTML = memories.length
      ? memories.map((item) => `
        <article>
          <h3>${escapeHTML(item.title)}</h3>
          <small>${escapeHTML(item.date)}</small>
          <p>${escapeHTML(item.note)}</p>
          <button data-delete="memory" data-id="${escapeHTML(item.id)}">
            Anıyı Sil
          </button>
        </article>
      `).join("")
      : "<p>Henüz anı eklenmedi. İlk anınızı oluşturun. ♥</p>";
  }

  $("addMemory")?.addEventListener("click", () => {
    const title = $("memoryTitle").value.trim();
    const date = $("memoryDate").value;
    const note = $("memoryNote").value.trim();

    if (!title) {
      alert("Lütfen anınıza bir başlık yazın.");
      return;
    }

    const memories = read("bzk_memories");

    memories.unshift({
      id: Date.now().toString(),
      title,
      date,
      note
    });

    write("bzk_memories", memories);

    $("memoryTitle").value = "";
    $("memoryDate").value = "";
    $("memoryNote").value = "";

    renderMemories();
    alert("Anınız kaydedildi. ♥");
  });

  // ÖZEL GÜNLER
  function renderDates() {
    const list = $("dateList");
    const dates = read("bzk_dates");

    if (!list) return;

    list.innerHTML = dates.length
      ? dates.map((item) => `
        <article>
          <h3>♥ ${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.date)}</p>
          <button data-delete="date" data-id="${escapeHTML(item.id)}">
            Sil
          </button>
        </article>
      `).join("")
      : "<p>Henüz özel gün eklenmedi.</p>";
  }

  $("addDate")?.addEventListener("click", () => {
    const title = $("dateTitle").value.trim();
    const date = $("specialDate").value;

    if (!title || !date) {
      alert("Lütfen günün adını ve tarihini girin.");
      return;
    }

    const dates = read("bzk_dates");

    dates.push({
      id: Date.now().toString(),
      title,
      date
    });

    write("bzk_dates", dates);

    $("dateTitle").value = "";
    $("specialDate").value = "";

    renderDates();
    alert("Özel gün kaydedildi.");
  });

  // GEZİLEN YERLER
  function renderPlaces() {
    const list = $("placeList");
    const places = read("bzk_places");

    if (!list) return;

    list.innerHTML = places.length
      ? places.map((item) => `
        <article>
          <h3>📍 ${escapeHTML(item.title)}</h3>
          <small>${escapeHTML(item.date)}</small>
          <p>${escapeHTML(item.note)}</p>
          <button data-delete="place" data-id="${escapeHTML(item.id)}">
            Sil
          </button>
        </article>
      `).join("")
      : "<p>Henüz gezi anısı eklenmedi.</p>";
  }

  $("addPlace")?.addEventListener("click", () => {
    const title = $("placeTitle").value.trim();
    const date = $("placeDate").value;
    const note = $("placeNote").value.trim();

    if (!title) {
      alert("Lütfen gezdiğiniz yerin adını yazın.");
      return;
    }

    const places = read("bzk_places");

    places.unshift({
      id: Date.now().toString(),
      title,
      date,
      note
    });

    write("bzk_places", places);

    $("placeTitle").value = "";
    $("placeDate").value = "";
    $("placeNote").value = "";

    renderPlaces();
    alert("Gezi anınız kaydedildi.");
  });

  // MEKTUPLAR
  function renderLetters() {
    const list = $("letterList");
    const letters = read("bzk_letters");

    if (!list) return;

    list.innerHTML = letters.length
      ? letters.map((item) => `
        <article>
          <h3>💌 ${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.text)}</p>
          <button data-delete="letter" data-id="${escapeHTML(item.id)}">
            Mektubu Sil
          </button>
        </article>
      `).join("")
      : "<p>Henüz mektup yazılmadı.</p>";
  }

  $("addLetter")?.addEventListener("click", () => {
    const title = $("letterTitle").value.trim();
    const text = $("letterText").value.trim();

    if (!title || !text) {
      alert("Lütfen mektubun başlığını ve içeriğini yazın.");
      return;
    }

    const letters = read("bzk_letters");

    letters.unshift({
      id: Date.now().toString(),
      title,
      text
    });

    write("bzk_letters", letters);

    $("letterTitle").value = "";
    $("letterText").value = "";

    renderLetters();
    alert("Mektubunuz saklandı. ♥");
  });

  // HİKÂYEMİZ
  const storyText = $("storyText");

  if (storyText) {
    storyText.value = localStorage.getItem("bzk_story") || "";
  }

  $("saveStory")?.addEventListener("click", () => {
    localStorage.setItem("bzk_story", storyText.value);
    alert("Hikâyeniz kaydedildi. ♥");
  });

  // ORTAK SİLME İŞLEMİ
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete]");
    if (!button) return;

    if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      return;
    }

    const type = button.dataset.delete;
    const id = button.dataset.id;

    const keys = {
      memory: "bzk_memories",
      date: "bzk_dates",
      place: "bzk_places",
      letter: "bzk_letters"
    };

    const key = keys[type];
    if (!key) return;

    const records = read(key).filter(
      (item) => item.id !== id
    );

    write(key, records);

    renderMemories();
    renderDates();
    renderPlaces();
    renderLetters();
  });

  // KAYITLARI AÇ
  renderMemories();
  renderDates();
  renderPlaces();
  renderLetters();

  console.log("Bizden Kalan başarıyla başlatıldı.");
});
