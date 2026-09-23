// Draws the inner solar system as an SVG. The planets move at their real
// relative speeds, with one Earth year taking 12 seconds. Run: node orrery.mjs > orrery.svg

const cx = 365, cy = 150;
const secondsPerDay = 12 / 365.25;

// name, orbit radius in px (not to scale), period in days, size, color, start angle
const planets = [
  ["Mercury", 24, 87.97, 1.8, "#9a9a9a", 40],
  ["Venus", 40, 224.7, 2.8, "#d9a441", 200],
  ["Earth", 58, 365.25, 3, "#5b7fc1", 310],
  ["Mars", 76, 687.0, 2.2, "#c8553d", 120],
  ["Jupiter", 104, 4332.6, 6, "#c9a27e", 250],
  ["Saturn", 136, 10759, 5, "#d8c38a", 20],
];

const round = (n) => Math.round(n * 100) / 100;

function spin(radius, days, start, inner) {
  const dur = round(days * secondsPerDay);
  return `<g><animateTransform attributeName="transform" type="rotate" from="${start} ${cx} ${cy}" to="${start - 360} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>${inner(cx + radius, cy)}</g>`;
}

let body = `<circle cx="${cx}" cy="${cy}" r="7" fill="#e2b93b"/>\n`;
for (const [name, r] of planets) {
  body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d5d5d5" stroke-width="0.8"/>\n`;
}
for (const [name, r, days, size, color, start] of planets) {
  body += spin(r, days, start, (x, y) => {
    let dot = `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}"/>`;
    if (name === "Earth") {
      // the moon goes round the earth once every 27.3 days
      dot += `<g><animateTransform attributeName="transform" type="rotate" from="0 ${x} ${y}" to="-360 ${x} ${y}" dur="${round(27.32 * secondsPerDay)}s" repeatCount="indefinite"/><circle cx="${x + 7}" cy="${y}" r="1" fill="#777"/></g>`;
    }
    if (name === "Saturn") {
      dot += `<ellipse cx="${x}" cy="${y}" rx="10" ry="3" fill="none" stroke="${color}" stroke-width="1" transform="rotate(-20 ${x} ${y})"/>`;
    }
    return dot;
  }) + "\n";
}
for (const [name, r] of planets) {
  body += `<text x="${cx}" y="${cy - r - 2}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8" fill="#999">${name}</text>\n`;
}

console.log(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 300" width="730" height="300">
${body}</svg>`);
