export type Lang = "en" | "tr";
export const locales: readonly Lang[] = ["en", "tr"];

export interface NowItem {
  label: string;
  value: string;
  note: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Rule {
  title: string;
  body: string;
  project: string;
  evidence: string;
}

export interface SkillGroup {
  title: string;
  items: string;
}

export interface EduRow {
  kind: string;
  title: string;
  detail: string;
}

export interface Dict {
  lang: Lang;
  name: string;
  title: string;
  description: string;
  switchLabel: string;
  nav: {
    label: string;
    home: string;
    work: string;
    method: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    title: string;
    lede: string;
    primary: string;
    github: string;
    githubHref: string;
    nowTitle: string;
    nowDate: string;
    now: NowItem[];
    facts: Fact[];
  };
  work: {
    title: string;
    intro: string;
    role: string;
    stack: string;
    built: string;
    links: string;
    fig: string;
  };
  method: { title: string; intro: string; seenIn: string; rules: Rule[] };
  skills: { title: string; intro: string; groups: SkillGroup[] };
  education: { title: string; intro: string; rows: EduRow[] };
  contact: {
    title: string;
    intro: string;
    github: string;
    githubHref: string;
    /** Role address. `null` hides the row until the address and domain are decided. */
    email: string | null;
    emailLabel: string;
    cv: string;
    cvWork: string;
    cvAcademic: string;
  };
  footer: string;
  cv: {
    tagline: string;
    summary: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    work: string;
    academic: string;
    backToSite: string;
  };
}
