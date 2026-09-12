/* Generates public/Tushar_Sheikh_CV.pdf — run: node scripts/generate-cv.cjs */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "Tushar_Sheikh_CV.pdf");

const BLUE = "#4285f4";
const RED = "#ea4335";
const YELLOW = "#f5a800";
const GREEN = "#34a853";
const INK = "#1f2937";
const SOFT = "#55606e";
const LINE = "#e5e7eb";

const doc = new PDFDocument({ size: "A4", margins: { top: 46, bottom: 42, left: 48, right: 48 } });
doc.pipe(fs.createWriteStream(OUT));

const W = doc.page.width - 96; // content width
const x0 = 48;

/* ───── helpers ───── */
function rule(color = LINE, w = W) {
  doc.moveTo(x0, doc.y).lineTo(x0 + w, doc.y).lineWidth(0.8).strokeColor(color).stroke();
}
function sectionTitle(txt, color) {
  doc.moveDown(0.9);
  const y = doc.y;
  doc.rect(x0, y + 1, 3, 11).fill(color);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(11.5).text(txt.toUpperCase(), x0 + 10, y, { characterSpacing: 1.2 });
  doc.moveDown(0.25);
  rule();
  doc.moveDown(0.45);
  doc.x = x0;
}
function bullet(txt) {
  const y = doc.y;
  doc.circle(x0 + 3, y + 4.5, 1.5).fill(SOFT);
  doc.fillColor(INK).font("Helvetica").fontSize(9.5).text(txt, x0 + 12, y, { width: W - 12, lineGap: 1.5 });
  doc.moveDown(0.25);
  doc.x = x0;
}
function roleHeader(role, org, period, color) {
  const y = doc.y;
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(10.8).text(role, x0, y, { width: W - 110, continued: false });
  doc.fillColor(color).font("Helvetica-Bold").fontSize(9).text(period, x0, y + 1.5, { width: W, align: "right" });
  doc.fillColor(SOFT).font("Helvetica-Oblique").fontSize(9.5).text(org, x0, doc.y, { width: W });
  doc.moveDown(0.3);
  doc.x = x0;
}
function skillLine(label, value) {
  const y = doc.y;
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(9.5).text(label + ":", x0 + 12, y, { continued: true, lineGap: 2 });
  doc.font("Helvetica").fillColor(SOFT).text(" " + value, { width: W - 12, lineGap: 2 });
  doc.moveDown(0.2);
  doc.x = x0;
}

/* ───── header band ───── */
doc.rect(0, 0, doc.page.width, 6).fill(BLUE);
doc.rect(0, 0, doc.page.width / 4, 6).fill(RED);
doc.rect(doc.page.width / 2, 0, doc.page.width / 4, 6).fill(YELLOW);
doc.rect((doc.page.width / 4) * 3, 0, doc.page.width / 4, 6).fill(GREEN);

doc.y = 52;
doc.fillColor(INK).font("Helvetica-Bold").fontSize(27).text("TUSHAR SHEIKH", x0, doc.y, { characterSpacing: 1 });
doc.moveDown(0.15);
doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(11)
  .text("Customer Support Specialist  |  Digital Content Creator  |  AI & Developer Tools Specialist", x0);
doc.moveDown(0.5);
doc.fillColor(SOFT).font("Helvetica").fontSize(9)
  .text("Sirajganj, Bangladesh   •   ariyantushar37@gmail.com   •   +880186159908", x0);
doc.moveDown(0.2);
doc.fillColor(SOFT).fontSize(9)
  .text("GitHub: github.com/tusharx3   •   X: x.com/tushar_087 (2.2k+ audience)   •   IG: ariyan_tushar_007", x0);
doc.moveDown(0.6);
rule("#cbd5e1");

/* ───── summary ───── */
sectionTitle("Executive Summary", BLUE);
doc.fillColor(INK).font("Helvetica").fontSize(9.5).text(
  "Adaptable and fast-learning tech professional with hands-on experience in high-volume Customer Support, Remote Team Collaboration, and Digital Content Creation. Currently pursuing a B.Sc. in Zoology alongside maintaining a strong presence in digital communities and tech platforms. Proven track record of supporting 400+ active students, managing large Discord communities, and building a 2.2k+ audience on X. Advanced skill in combining modern AI platforms (ChatGPT, Gemini, Claude, Grok) with developer tools and graphics software to optimize operations and deliver impactful visual campaigns.",
  x0, doc.y, { width: W, lineGap: 2, align: "justify" }
);

/* ───── experience ───── */
sectionTitle("Work Experience", RED);

roleHeader("Customer Support Executive", "Shikkha IT Limited", "PRESENT", BLUE);
bullet("Managing technical support and onboarding operations for 400+ active students with high satisfaction rates.");
bullet("Resolving platform inquiries efficiently and serving as a key liaison between users and internal development teams.");
doc.moveDown(0.35);

roleHeader("Discord Community Manager & Lead Moderator", "Web3 & Gaming Communities  /  Remote", "ONGOING", RED);
bullet("Overseeing daily server operations, managing role assignments, and maintaining high team productivity in remote environments.");
bullet("Handling user onboarding, community moderation, conflict resolution, and interactive virtual events.");
doc.moveDown(0.35);

roleHeader("Digital Content Creator & Web3 Ecosystem Contributor", "X (formerly Twitter)  /  Freelance", "ONGOING", GREEN);
bullet("Built an organic audience of 2.2k+ followers through visual content strategy, custom graphics, and technical copy.");
bullet("Contributed to promotional campaigns and visual asset creation for leading global Web3 projects, including Zama, Base, Bitget Wallet, and Billions Network.");
bullet("Secured elite community distinctions (such as Super OG roles) through strategic engagement and quality contribution.");

/* ───── skills ───── */
sectionTitle("Technical Skills & Tool Stack", YELLOW);
skillLine("AI & Prompt Engineering", "ChatGPT, Gemini, Claude, Grok, Advanced Prompt Design, Workflow Automation");
skillLine("Developer & Software Tools", "VS Code, Flutter (Basic UI/App Setup), Data Management");
skillLine("Design & Visual Branding", "Canva, Graphic Design, Social Media Banners, Custom Memes, Visual Assets");
skillLine("Core Computer Skills", "MS Word, MS Excel, MS PowerPoint, System Navigation, Technical Documentation");
skillLine("Soft Skills & Competencies", "Remote Collaboration, Fast Learner, Multilingual Communication, Client Care");

/* ───── education ───── */
sectionTitle("Education & Certifications", GREEN);

roleHeader("Bachelor of Science (B.Sc.) in Zoology — 3rd Year", "Sirajganj Govt. College", "ONGOING", BLUE);
doc.moveDown(0.15);
roleHeader("Higher Secondary Certificate (HSC) — GPA 4.75 / 5.00", "Islamia Govt. College  |  Rajshahi Board", "2022", RED);
doc.moveDown(0.15);
roleHeader("Secondary School Certificate (SSC) — GPA 5.00 / 5.00", "B. L. Govt. High School  |  Rajshahi Board", "2020", YELLOW);
doc.moveDown(0.15);
roleHeader("Course on Artificial Intelligence (AI) Tools", "Department of Youth Development", "ONGOING", GREEN);

/* ───── languages ───── */
sectionTitle("Languages", BLUE);
doc.fillColor(INK).font("Helvetica").fontSize(9.5).text(
  "Bengali — Native / Bilingual      •      English — Professional Working Proficiency      •      Hindi — Conversational / Spoken Proficiency",
  x0, doc.y, { width: W, lineGap: 2 }
);

/* ───── footer ───── */
doc.moveDown(1.2);
rule("#cbd5e1");
doc.moveDown(0.4);
doc.fillColor(SOFT).font("Helvetica-Oblique").fontSize(8.5)
  .text("References available upon request.", x0, doc.y, { width: W, align: "center" });

doc.end();
console.log("PDF written to", OUT);
