const countdownEl = document.getElementById("countdown");

const units = [
    { label: "Days", value: 0 },
    { label: "Hours", value: 0 },
    { label: "Minutes", value: 0 },
    { label: "Seconds", value: 0 }
];

// Create flip cards
units.forEach(u => {
    const row = document.createElement("div");
    row.className = "flip-row";

    const label = document.createElement("div");
    label.className = "flip-side-label";
    label.textContent = u.label;

    const card = document.createElement("div");
    card.className = "flip-card";
    card.setAttribute("data-label", u.label);
    card.textContent = "00";

    row.appendChild(label);
    row.appendChild(card);
    countdownEl.appendChild(row);
});


function pad(n) {
    return String(n).padStart(2, "0");
}

function updateCountdown() {
    const now = new Date().getTime();
    const target = new Date("2027-08-26T00:00:00").getTime();
    let diff = target - now;

    if (diff < 0) diff = 0;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const values = [d, h, m, s].map(pad);

    const cards = countdownEl.querySelectorAll(".flip-card");

    values.forEach((val, i) => {
        const card = cards[i];
        if (card.textContent !== val) {
            card.classList.remove("flip");
            void card.offsetWidth; // reset animation
            card.classList.add("flip");
            card.textContent = val;
        }
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();
