// Referenssöndag för rotationsstart (ändra vid behov)
// Rotationen byter vecka varje söndag 00:00 lokal tid.
const CYCLE_START_SUNDAY = new Date("2026-01-04T00:00:00");

const weeklyMenus = [
  {
    weekName: "Vecka A",
    days: [
      { day: "Måndag", dish: "Kycklinggryta med ris" },
      { day: "Tisdag", dish: "Ugnslax med dillpotatis" },
      { day: "Onsdag", dish: "Vegetarisk lasagne" },
      { day: "Torsdag", dish: "Köttbullar med mos" },
      { day: "Fredag", dish: "Taco-buffé" },
      { day: "Lördag", dish: "Pasta carbonara" },
      { day: "Söndag", dish: "Söndagsstek med rotsaker" }
    ]
  },
  {
    weekName: "Vecka B",
    days: [
      { day: "Måndag", dish: "Chili sin carne med ris" },
      { day: "Tisdag", dish: "Fiskgratäng med citron" },
      { day: "Onsdag", dish: "Kycklingwok med nudlar" },
      { day: "Torsdag", dish: "Ärtsoppa & pannkakor" },
      { day: "Fredag", dish: "Hemgjord pizza" },
      { day: "Lördag", dish: "Pulled pork-burgare" },
      { day: "Söndag", dish: "Lammfärsbiffar med tzatziki" }
    ]
  },
  {
    weekName: "Vecka C",
    days: [
      { day: "Måndag", dish: "Torsk med äggsås" },
      { day: "Tisdag", dish: "Linsgryta med naan" },
      { day: "Onsdag", dish: "Kebabgryta med bulgur" },
      { day: "Torsdag", dish: "Korv stroganoff" },
      { day: "Fredag", dish: "Tacopaj med sallad" },
      { day: "Lördag", dish: "Risotto med svamp" },
      { day: "Söndag", dish: "Helstekt kyckling" }
    ]
  },
  {
    weekName: "Vecka D",
    days: [
      { day: "Måndag", dish: "Moussaka" },
      { day: "Tisdag", dish: "Falafel med hummus" },
      { day: "Onsdag", dish: "Biff stroganoff" },
      { day: "Torsdag", dish: "Pannbiff med lök" },
      { day: "Fredag", dish: "Sushi bowls" },
      { day: "Lördag", dish: "Enchiladas" },
      { day: "Söndag", dish: "Laxsida i ugn" }
    ]
  }
];

function getSundayStart(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = söndag
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

function getCurrentMenuIndex() {
  const now = new Date();
  const currentSunday = getSundayStart(now);
  const startSunday = getSundayStart(CYCLE_START_SUNDAY);

  const diffMs = currentSunday.getTime() - startSunday.getTime();
  const weeksSinceStart = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));

  // Säker modulo även om datum är före start
  return ((weeksSinceStart % 4) + 4) % 4;
}

function renderMenu() {
  const idx = getCurrentMenuIndex();
  const menu = weeklyMenus[idx];

  const title = document.getElementById("weekTitle");
  const list = document.getElementById("menuList");

  title.textContent = `${menu.weekName} • Aktiv meny`;

  list.innerHTML = "";
  menu.days.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="day">${item.day}</span><span class="dish">${item.dish}</span>`;
    list.appendChild(li);
  });
}

renderMenu();

// Kontrollera varje timme om vi passerat söndagsskifte
setInterval(renderMenu, 60 * 60 * 1000);
