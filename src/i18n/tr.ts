import type { Dict } from "./dict";

export const tr: Dict = {
  lang: "tr",
  name: "Ege Yıldız",
  title: "Ege Yıldız, bulut ve platform mühendisliği",
  description:
    "Bulut ve platform mühendisliği öğrenen bir lise öğrencisi. Seçili projeler; her biri nasıl geliştirildiğini ve yapay zekânın payını anlatır.",
  switchLabel: "EN",
  nav: {
    label: "Bölümler",
    home: "Ana sayfa",
    work: "İşler",
    method: "Yöntem",
    skills: "Beceriler",
    education: "Eğitim",
    contact: "İletişim",
  },
  hero: {
    title: "Ölçebildiğim, bozabildiğim ve geri alabildiğim sistemler.",
    lede: "Türkiye’de lise öğrencisiyim, 2029 mezunuyum. Sistemi tasarlarım, yapay zekâ araçlarına geliştirtirim ve sonucu güvene değil ölçüme bakarak doğrularım.",
    primary: "Seçili işleri gör",
    github: "GitHub: PTB-0",
    githubHref: "https://github.com/PTB-0",
    nowTitle: "Şu an",
    nowDate: "Eki 2026",
    now: [
      { label: "Geliştirdiğim", value: "Kendi sunucumda barındırdığım oyun sunucusu platformu", note: "Beta öncesi, yayında değil" },
      { label: "Yayınladığım", value: "prompt-router ve SecretFix", note: "İki npm paketi" },
      { label: "Öğrendiğim", value: "Bulut ve platform mühendisliği", note: "" },
    ],
    facts: [
      { label: "Sınavlar", value: "AP Computer Science A ve Principles: 4 ve 4" },
      { label: "Sertifikalar", value: "CS50x, CS50P, CS50AI" },
      { label: "Açık kaynak", value: "npm’de yayında, MIT lisanslı" },
      { label: "Yöntem", value: "Tanımla, geliştir, incele, ölç, karar ver" },
    ],
  },
  work: {
    title: "Seçili işler",
    intro: "Üç proje. Her biri ne yaptığını, benim rolümü ve yapay zekânın payını anlatır.",
    role: "Rolüm",
    stack: "Teknolojiler",
    built: "Nasıl geliştirildi",
    links: "Bağlantılar",
    fig: "Şek.",
  },
  method: {
    title: "Yapay zekâ ile nasıl çalışırım",
    intro: "Her değişikliğe uyguladığım dört kural, her biri öğrendiğim yerle birlikte.",
    seenIn: "Görüldüğü yer:",
    rules: [
      {
        title: "Güvenmeden önce ölç",
        body: "Bir ajanın ya da benim iddiam, bir ölçüm onunla uyuşana kadar yalnızca bir varsayımdır.",
        project: "Dloudos",
        evidence:
          "Ajanlar sayfa başlığının en geç çizilen öğe olacağını bekledi. Lighthouse, 12 koşunun 12’sinde bunun çerez bandı olduğunu gösterdi.",
      },
      {
        title: "Ajanlara dar yetki ver",
        body: "Ajanlar benim denetleyebileceğim sınırların içinde çalışır, güvenimin içinde değil.",
        project: "Dloudos",
        evidence:
          "Her ajan komutunda çalışan bir kanca; sırların okunmasını, yıkıcı git komutlarını, ana dala commit atmayı ve sunucu erişimini engeller.",
      },
      {
        title: "Taze gözle incele",
        body: "Yazarın testleri yalnızca yazarın düşündüğünü kapsar. İşi hiç görmemiş bir inceleyici onu soğuk okur.",
        project: "prompt-router",
        evidence:
          "Son tüm-dal incelemesi, önceki on altı görev incelemesinin geçirdiği kritik bir gerilemeyi buldu.",
      },
      {
        title: "Önce geri dönüş yolunu kur",
        body: "Her değişiklik test edilmiş bir geri dönüş yoluyla çıkar. Hiç geri yüklenmemiş bir yedek, yedek değildir.",
        project: "Dloudos",
        evidence:
          "Uzak yedekler şifreli ve biten bir yüklemeye göre değil, geri yükleme provasına göre değerlendiriliyor.",
      },
    ],
  },
  skills: {
    title: "Beceriler",
    intro: "Yalnızca yukarıdaki projelerde ya da herkese açık depolarda kullandıklarım.",
    groups: [
      { title: "Diller", items: "TypeScript, Python, Rust, Java, Go, C" },
      { title: "Web", items: "Next.js, React, Tailwind CSS, Node.js, Prisma, SQLite, PostgreSQL" },
      {
        title: "Altyapı",
        items: "Linux, Docker, Cloudflare Zero Trust ve Workers, PM2, Pterodactyl, WireGuard, MinIO, Forgejo",
      },
      { title: "Test ve ölçüm", items: "Vitest, Playwright, Lighthouse, fast-check ile fuzzing, mutasyon kontrolleri" },
      { title: "Yapay zekâ ile çalışma", items: "Claude Code, alt ajan iş akışları, MCP sunucuları, bağımsız inceleme turları" },
    ],
  },
  education: {
    title: "Eğitim",
    intro: "Aldığım sonuçlar. Hedefler burada yer almaz.",
    rows: [
      { kind: "Okul", title: "Lise", detail: "2029 mezunu." },
      { kind: "Sınav", title: "AP Computer Science A", detail: "1–5 ölçeğinde 4, 2026." },
      { kind: "Sınav", title: "AP Computer Science Principles", detail: "1–5 ölçeğinde 4, 2026." },
      { kind: "Sertifikalar", title: "CS50x, CS50P, CS50AI", detail: "Harvard CS50 dersleri. Doğrulama bağlantıları mevcut." },
      { kind: "Program", title: "MEF yaz okulu", detail: "“Outstanding Success” olarak takdir edildi." },
    ],
  },
  contact: {
    title: "İletişim",
    intro: "Staj, proje ya da bu sayfadaki herhangi bir şey hakkında sorular için.",
    github: "PTB-0",
    githubHref: "https://github.com/PTB-0",
    email: null,
    emailLabel: "E-posta",
    cv: "CV (PDF)",
    cvWork: "İş",
    cvAcademic: "Akademik",
  },
  footer: "Bu sitedeki her iddia bir depoda, npm kayıt defterinde ya da bir sertifikada doğrulanabilir.",
  cv: {
    tagline: "Lise öğrencisi, 2029 mezunu. Bulut ve platform mühendisliğine doğru ilerliyorum.",
    summary:
      "Sistemleri tasarlar, yapay zekâ araçlarına geliştirtir ve sonucu güvene değil ölçüme bakarak doğrularım. Aşağıdaki her proje ne yaptığımı ve yapay zekânın payını anlatır.",
    projects: "Projeler",
    skills: "Beceriler",
    education: "Eğitim",
    contact: "İletişim",
    work: "CV, iş",
    academic: "CV, akademik",
    backToSite: "Siteye dön",
  },
};
