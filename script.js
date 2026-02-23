var CYCLE_START_SUNDAY = new Date("2026-01-04T00:00:00");

var weeklyMenus = [
  {
    weekName: "Vecka A",
    days: [
      { day: "Måndag", dish: "Krämig butternutsoppa", desc: "Rostad pumpa, lätt chili och citronyoghurt." },
      { day: "Tisdag", dish: "Chevré- och tomatpaj", desc: "Serveras med honungsdressad grönsallad." },
      { day: "Onsdag", dish: "Bönbiffar med rostad potatis", desc: "Svarta bönor, vitlök, örter och kall yoghurtsås." },
      { day: "Torsdag", dish: "Ugnsbakad lax", desc: "Dillpotatis, citron och smörslungade ärtor." },
      { day: "Fredag", dish: "Blomkålsrisotto", desc: "Parmesan, svamp och krispig grönkålstopping." },
      { day: "Lördag", dish: "Kycklingwok med nudlar", desc: "Ingefära, soja, lime och sesamfrön." },
      { day: "Söndag", dish: "Söndagsstek på högrev", desc: "Rotsaker i ugn och rödvinssky." }
    ]
  },
  {
    weekName: "Vecka B",
    days: [
      { day: "Måndag", dish: "Chili sin carne", desc: "Serveras med ris, koriander och lime." },
      { day: "Tisdag", dish: "Fiskgratäng med räkor", desc: "Vitvinssås, dill och potatismos." },
      { day: "Onsdag", dish: "Vegetarisk lasagne", desc: "Grillad zucchini, tomatsås och mozzarella." },
      { day: "Torsdag", dish: "Ärtsoppa och pannkakor", desc: "Klassisk torsdag med sylt och grädde." },
      { day: "Fredag", dish: "Hemgjord pizza", desc: "Två toppings: margherita och svamp/truffel." },
      { day: "Lördag", dish: "Pulled pork-burgare", desc: "Coleslaw, picklad lök och rostad potatis." },
      { day: "Söndag", dish: "Lammfärsbiffar", desc: "Serveras med bulgur, mynta och tzatziki." }
    ]
  },
  {
    weekName: "Vecka C",
    days: [
      { day: "Måndag", dish: "Torsk med äggsås", desc: "Kokt potatis, ärtor och brynt smör." },
      { day: "Tisdag", dish: "Linsgryta med naan", desc: "Röd curry, kokosmjölk och koriander." },
      { day: "Onsdag", dish: "Kebabgryta", desc: "Mild tomatsås med paprika och bulgur." },
      { day: "Torsdag", dish: "Korv stroganoff", desc: "Serveras med ris och saltgurka." },
      { day: "Fredag", dish: "Tacopaj", desc: "Blandfärs, majs, ost och krispig sallad." },
      { day: "Lördag", dish: "Svamprisotto", desc: "Karljohan, parmesan och citronzest." },
      { day: "Söndag", dish: "Helstekt kyckling", desc: "Rostad potatis, sky och ugnsbakade morötter." }
    ]
  },
  {
    weekName: "Vecka D",
    days: [
      { day: "Måndag", dish: "Moussaka", desc: "Aubergine, potatis och krämig béchamel." },
      { day: "Tisdag", dish: "Falafelbowl", desc: "Hummus, tabbouleh, picklad rödlök och tahini." },
      { day: "Onsdag", dish: "Biff stroganoff", desc: "Syrlig smetana, svamp och persilja." },
      { day: "Torsdag", dish: "Pannbiff med lök", desc: "Potatismos, gräddsås och lingon." },
      { day: "Fredag", dish: "Sushibowl", desc: "Lax, avokado, ris, gurka och chilimayo." },
      { day: "Lördag", dish: "Enchiladas", desc: "Gratinerade med ost, salsa och koriander." },
      { day: "Söndag", dish: "Laxsida i ugn", desc: "Färskpotatis, sparris och hollandaisesås." }
    ]
  }
];

function getSundayStart(date) {
  var d = new Date(date);
  var day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

function getCurrentMenuIndex() {
  var now = new Date();
  var currentSunday = getSundayStart(now);
  var startSunday = getSundayStart(CYCLE_START_SUNDAY);

  var diffMs = currentSunday.getTime() - startSunday.getTime();
  var weeksSinceStart = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return ((weeksSinceStart % 4) + 4) % 4;
}

function renderMenu() {
  var idx = getCurrentMenuIndex();
  var menu = weeklyMenus[idx];

  var titleEl = document.getElementById("weekTitle");
  if (titleEl) {
    titleEl.textContent = menu.weekName + " • Aktiv meny";
  }

  var list = document.getElementById("menuList");
  if (!list) return;

  list.innerHTML = "";

  for (var i = 0; i < menu.days.length; i++) {
    var item = menu.days[i];
    var li = document.createElement("li");
    li.className = "menu-item";
    li.innerHTML =
      '<span class="day">' + item.day + '</span>' +
      '<span class="dish">' + item.dish + '</span>' +
      '<span class="desc">' + item.desc + '</span>';
    list.appendChild(li);
  }
}

renderMenu();
setInterval(renderMenu, 60 * 60 * 1000);
