/**
 * Central content layer for the public landing page.
 *
 * Every string the client may want to change lives here. Components never
 * hold copy of their own. Items that still need client confirmation carry
 * `verified: false` and render a dev-only "Placeholder" marker.
 */

export type Verifiable = {
  verified: boolean;
};

export const site = {
  name: "Uttarakhand Football Association",
  shortName: "UFA",
  tagline: "State football association for Uttarakhand",
  description:
    "The public information site of the Uttarakhand Football Association — our achievements, our journey, match information, official notices, and how to be part of football in the state.",
  url: "", // set NEXT_PUBLIC_SITE_URL at deploy time; no claim is made here
  logo: {
    src: "/assets/branding/ufa-logo.png",
    alt: "Uttarakhand Football Association logo placeholder",
    verified: false,
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Achievements", href: "#achievements" },
  { label: "Match Centre", href: "#match-centre" },
  { label: "Membership", href: "#membership" },
  { label: "Our Journey", href: "#journey" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

/** Primary CTA in the navbar. Configurable URL constant (section 5I). */
export const JOIN_UFA_URL = "#membership";

export const hero = {
  eyebrow: "Uttarakhand Football Association",
  headlineLines: ["One state.", "One passion.", "One game."],
  goldLineIndex: 2,
  body: "Celebrating our victories, honouring our journey, and shaping the next generation of football in Uttarakhand.",
  primaryCta: { label: "Explore Our Legacy", href: "#achievements" },
  secondaryCta: { label: "Become a Member", href: "#membership" },
  image: {
    src: "/assets/hero/uttarakhand-football-hero.png",
    alt: "Football match in progress at a stadium in Uttarakhand, players contesting the ball under floodlights",
    width: 2400,
    height: 1350,
    verified: false,
  },
} as const;

export const ribbon = {
  text: "UTTARAKHAND FOOTBALL ASSOCIATION · AFFILIATED WITH AIFF (ALL INDIA FOOTBALL FEDERATION) · AIFF IS THE FIFA MEMBER ASSOCIATION FOR INDIA (FÉDÉRATION INTERNATIONALE DE FOOTBALL ASSOCIATION)",
  /** Relationship: UFA → AIFF → FIFA. Do not claim UFA is directly affiliated with FIFA. */
  verified: false,
} as const;

export const achievements = {
  id: "achievements",
  eyebrow: "Honours and milestones",
  title: "Our proudest moments",
  lede: "Every victory tells a story of teamwork, determination, and pride in representing Uttarakhand.",
} as const;

export type GallerySlide = {
  id: string;
  tournament: string;
  year: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  verified: boolean;
};

export const gallerySlides: GallerySlide[] = [
  {
    id: "moment-01",
    tournament: "Tournament name to be confirmed",
    year: "Year to be confirmed",
    title: "Champions — title to be confirmed",
    description:
      "A squad that stayed organised for ninety minutes and beyond, closing out a tournament with the sort of defending and discipline that coaching staffs work all season to build.",
    image: {
      src: "/assets/victories/championship-celebration-01.jpeg",
      alt: "Players celebrating with a trophy after a tournament final",
      width: 1600,
      height: 1200,
    },
    verified: false,
  },
  {
    id: "moment-02",
    tournament: "Tournament name to be confirmed",
    year: "Year to be confirmed",
    title: "Runners-up — result to be confirmed",
    description:
      "A campaign built on consistency through the group stage and a knockout run that gave younger players meaningful minutes against established sides.",
    image: {
      src: "/assets/victories/championship-celebration-02.jpg",
      alt: "Team lined up with medals on the pitch after a final",
      width: 1600,
      height: 1200,
    },
    verified: false,
  },
  {
    id: "moment-03",
    tournament: "Tournament name to be confirmed",
    year: "Year to be confirmed",
    title: "Squad honour — to be confirmed",
    description:
      "A group photograph from a state campaign, recording the players, support staff, and officials who represented Uttarakhand together.",
    image: {
      src: "/assets/victories/championship-celebration-03.jpg",
      alt: "Full team and support staff posing for a squad photograph on the pitch",
      width: 1600,
      height: 1200,
    },
    verified: false,
  },
  {
    id: "moment-04",
    tournament: "Tournament name to be confirmed",
    year: "Year to be confirmed",
    title: "Supporters' moment — to be confirmed",
    description:
      "Friends, families, and club volunteers who travel to follow the team — the reason match days feel like community events rather than fixtures.",
    image: {
      src: "/assets/victories/championship-celebration-04.jpg",
      alt: "Supporters with a banner cheering from the sidelines of a football ground",
      width: 1600,
      height: 1200,
    },
    verified: false,
  },
];

export const matchCentre = {
  id: "match-centre",
  eyebrow: "Fixtures and results",
  title: "The game never stops.",
  lede: "Upcoming fixtures, live match information, and recent results from around the state.",
  sampleNotice: "Sample data — fixtures shown here are development placeholders, not real matches.",
  tabs: ["Upcoming", "Live", "Results"] as const,
} as const;

export type MatchStatus = "Scheduled" | "Live" | "Full time" | "Postponed";

export type Match = {
  id: string;
  competition: string;
  home: { name: string; abbr: string };
  away: { name: string; abbr: string };
  date: string;
  kickoff: string;
  venue: string;
  status: MatchStatus;
  score?: string;
  minute?: string;
  verified: boolean;
};

export const matches: Record<"Upcoming" | "Live" | "Results", Match[]> = {
  Upcoming: [
    {
      id: "m-up-1",
      competition: "Competition to be confirmed",
      home: { name: "Club side to be confirmed", abbr: "HOM" },
      away: { name: "Club side to be confirmed", abbr: "AWY" },
      date: "Date to be confirmed",
      kickoff: "Kick-off to be confirmed",
      venue: "Venue to be confirmed",
      status: "Scheduled",
      verified: false,
    },
    {
      id: "m-up-2",
      competition: "Competition to be confirmed",
      home: { name: "District side to be confirmed", abbr: "DIS" },
      away: { name: "District side to be confirmed", abbr: "DST" },
      date: "Date to be confirmed",
      kickoff: "Kick-off to be confirmed",
      venue: "Venue to be confirmed",
      status: "Scheduled",
      verified: false,
    },
    {
      id: "m-up-3",
      competition: "Competition to be confirmed",
      home: { name: "Youth side to be confirmed", abbr: "YTH" },
      away: { name: "Youth side to be confirmed", abbr: "YOU" },
      date: "Date to be confirmed",
      kickoff: "Kick-off to be confirmed",
      venue: "Venue to be confirmed",
      status: "Postponed",
      verified: false,
    },
  ],
  Live: [
    {
      id: "m-live-1",
      competition: "Competition to be confirmed",
      home: { name: "Club side to be confirmed", abbr: "HOM" },
      away: { name: "Club side to be confirmed", abbr: "AWY" },
      date: "Date to be confirmed",
      kickoff: "Kick-off to be confirmed",
      venue: "Venue to be confirmed",
      status: "Live",
      score: "0 – 0",
      minute: "Status to be confirmed",
      verified: false,
    },
  ],
  Results: [
    {
      id: "m-res-1",
      competition: "Competition to be confirmed",
      home: { name: "Club side to be confirmed", abbr: "HOM" },
      away: { name: "Club side to be confirmed", abbr: "AWY" },
      date: "Date to be confirmed",
      kickoff: "Kick-off to be confirmed",
      venue: "Venue to be confirmed",
      status: "Full time",
      score: "0 – 0",
      verified: false,
    },
    {
      id: "m-res-2",
      competition: "Competition to be confirmed",
      home: { name: "District side to be confirmed", abbr: "DIS" },
      away: { name: "District side to be confirmed", abbr: "DST" },
      date: "Date to be confirmed",
      kickoff: "Kick-off to be confirmed",
      venue: "Venue to be confirmed",
      status: "Full time",
      score: "0 – 0",
      verified: false,
    },
  ],
};

export type StandingRow = {
  position: number;
  team: string;
  played: number;
  points: number;
};

export const standings = {
  caption: "Sample standings table — placeholder rows only",
  columns: ["#", "Team", "P", "Pts"],
  rows: [
    { position: 1, team: "Team to be confirmed", played: 0, points: 0 },
    { position: 2, team: "Team to be confirmed", played: 0, points: 0 },
    { position: 3, team: "Team to be confirmed", played: 0, points: 0 },
    { position: 4, team: "Team to be confirmed", played: 0, points: 0 },
  ] satisfies StandingRow[],
  verified: false,
};

export const leadership = {
  id: "leadership",
  eyebrow: "Leadership",
  title: "The people behind the passion.",
  lede: "Leadership, vision, and a shared commitment to the future of Uttarakhand football.",
  quoteLabel: "A word from our leadership",
} as const;

export type Leader = {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image: { src: string; alt: string; width: number; height: number };
  thumb: { src: string; alt: string; width: number; height: number };
  verified: boolean;
};

export const leaders: Leader[] = [
  {
    id: "leader-01",
    name: "Name to be confirmed",
    designation: "Designation to be confirmed",
    quote: "Quotation to be confirmed with the association.",
    image: {
      src: "/assets/leadership/leader-01-portrait.jpeg",
      alt: "Portrait of an association office bearer — official photograph to be supplied",
      width: 1200,
      height: 1500,
    },
    thumb: {
      src: "/assets/leadership/leader-01-thumb.webp",
      alt: "",
      width: 480,
      height: 600,
    },
    verified: false,
  },
  {
    id: "leader-02",
    name: "Name to be confirmed",
    designation: "Designation to be confirmed",
    quote: "Quotation to be confirmed with the association.",
    image: {
      src: "/assets/leadership/leader-01-portrait.jpeg",
      alt: "Portrait of an association office bearer — official photograph to be supplied",
      width: 1200,
      height: 1500,
    },
    thumb: {
      src: "/assets/leadership/leader-02-thumb.webp",
      alt: "",
      width: 480,
      height: 600,
    },
    verified: false,
  },
  {
    id: "leader-03",
    name: "Name to be confirmed",
    designation: "Designation to be confirmed",
    quote: "Quotation to be confirmed with the association.",
    image: {
      src: "/assets/leadership/leader-01-portrait.jpeg",
      alt: "Portrait of an association office bearer — official photograph to be supplied",
      width: 1200,
      height: 1500,
    },
    thumb: {
      src: "/assets/leadership/leader-03-thumb.webp",
      alt: "",
      width: 480,
      height: 600,
    },
    verified: false,
  },
];

export type JourneyEntry = {
  id: string;
  year: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  verified: boolean;
};

export const journey = {
  id: "journey",
  eyebrow: "History",
  title: "Our journey through time.",
  lede: "Tracing the milestones, people, and moments that have shaped our football community.",
} as const;

export const journeyEntries: JourneyEntry[] = [
  {
    id: "milestone-01",
    year: "Year TBC",
    title: "Founding chapter — to be confirmed",
    description:
      "How the association was established and what the early organising effort looked like. This entry is a placeholder until the client confirms the date and the record.",
    image: {
      src: "/assets/history/association-milestone-01.jpg",
      alt: "Archive photograph from the early years of the association — image to be supplied",
      width: 1200,
      height: 900,
    },
    verified: false,
  },
  {
    id: "milestone-02",
    year: "Year TBC",
    title: "Structure and districts — to be confirmed",
    description:
      "The period in which district-level participation was organised. Milestone wording, order, and dates await client confirmation.",
    image: {
      src: "/assets/history/association-milestone-01.jpg",
      alt: "District football gathering photographed at a local ground — image to be supplied",
      width: 1200,
      height: 900,
    },
    verified: false,
  },
  {
    id: "milestone-03",
    year: "Year TBC",
    title: "Competitive growth — to be confirmed",
    description:
      "A placeholder for a season or competition that marked a step forward in regular state-level football.",
    image: {
      src: "/assets/history/association-milestone-01.jpg",
      alt: "State-level football match from a past season — image to be supplied",
      width: 1200,
      height: 900,
    },
    verified: false,
  },
  {
    id: "milestone-04",
    year: "Year TBC",
    title: "Development programmes — to be confirmed",
    description:
      "A placeholder for coaching, refereeing, or youth work that changed how the game is run across the state.",
    image: {
      src: "/assets/history/association-milestone-01.jpg",
      alt: "Coaching session with young players — image to be supplied",
      width: 1200,
      height: 900,
    },
    verified: false,
  },
  {
    id: "milestone-05",
    year: "Year TBC",
    title: "Present day — to be confirmed",
    description:
      "A placeholder for where the association stands today: competitions, membership, and the work still ahead.",
    image: {
      src: "/assets/history/association-milestone-01.jpg",
      alt: "Current state football activity at a Uttarakhand ground — image to be supplied",
      width: 1200,
      height: 900,
    },
    verified: false,
  },
];

export const membership = {
  id: "membership",
  eyebrow: "Membership",
  title: "Your journey starts here.",
  lede: "Whether you are a player taking a first registration, a coach building qualifications, a referee starting out, or a club joining the state structure — membership is how you take part. Specifics of each pathway are confirmed with the association before publication.",
  applyLabel: "Apply for membership",
  applyUrl: "#contact",
  image: {
    src: "/assets/gallery/membership-pathway.jpeg",
    alt: "A young player completing registration paperwork at a club office",
    width: 1200,
    height: 900,
  },
  imageVerified: false,
  pathways: [
    {
      id: "player",
      title: "Player registration",
      description: "Register to take part in association-organised competition.",
      verified: false,
    },
    {
      id: "coach",
      title: "Coach education",
      description: "Courses and certification for coaches working with players at every level.",
      verified: false,
    },
    {
      id: "referee",
      title: "Referee pathway",
      description: "Training and accreditation for officials officiating the game.",
      verified: false,
    },
    {
      id: "club",
      title: "Club affiliation",
      description: "Affiliation for clubs seeking a place within the state structure.",
      verified: false,
    },
  ],
} as const;

export const development = {
  id: "development",
  eyebrow: "Development",
  title: "More than ninety minutes.",
  lede: "Building character, creating opportunities, and developing the next generation of football in Uttarakhand.",
  cards: [
    {
      id: "grassroots",
      title: "Grassroots and youth",
      description:
        "Regular playing opportunities for children and teenagers, so the first experience of football is fun, safe, and repeatable.",
      image: {
        src: "/assets/development/grassroots-football.jpeg",
        alt: "Children playing football at a grassroots training session",
        width: 1200,
        height: 900,
      },
      verified: false,
    },
    {
      id: "women",
      title: "Women's participation",
      description:
        "Supporting girls and women to play, compete, and stay in the game through accessible competition and coaching.",
      image: {
        src: "/assets/development/women-participation.jpeg",
        alt: "Women's football team during a training drill on a grass pitch",
        width: 1200,
        height: 900,
      },
      verified: false,
    },
    {
      id: "officials",
      title: "Coach and referee development",
      description:
        "Education for the people who make matches happen — coaches who teach the game and referees who manage it fairly.",
      image: {
        src: "/assets/development/coach-referee-development.jpeg",
        alt: "Coach leading a training session while a referee observes",
        width: 1200,
        height: 900,
      },
      verified: false,
    },
  ],
} as const;

export type Affiliation = {
  id: string;
  name: string;
  note: string;
  logo: string;
  verified: boolean;
};

export type Partner = {
  id: string;
  name: string;
  logo: string;
  url?: string;
  verified: boolean;
};

/**
 * Verified affiliations. `sponsors` is intentionally empty: the sponsors
 * block is omitted entirely rather than showing invented partners.
 */
export const affiliations = {
  id: "affiliations",
  title: "Affiliations and partners",
  intro: "Recognised relationships that place the association within the national structure of the game.",
  list: [
    {
      id: "aiff",
      name: "All India Football Federation",
      note: "Affiliation status to be confirmed with the association",
      logo: "/assets/affiliations/aiff-affiliation-placeholder.svg",
      verified: false,
    },
  ] satisfies Affiliation[],
  sponsors: [] as Partner[],
} as const;

export const footer = {
  id: "contact",
  intro:
    "The Uttarakhand Football Association brings together clubs, districts, players, coaches, and officials across the state. This site carries our public information: achievements, fixtures, notices, and pathways into the game.",
  quickLinks: navItems,
 officeBearers: [
  {
    role: "Hon. Secretary",
    name: "Mr Akhtar Ali",
    verified: true,
  },
],

contact: [
  {
    label: "Address",
    value: "Near KVM School, Heera Nagar, Haldwani, Uttarakhand – 263139",
    verified: true,
  },
  {
    label: "Phone",
    value: "+91 94120 87643",
    verified: true,
  },
  {
    label: "Email",
    value: "usfahld@gmail.com",
    verified: true,
  },
],
  socials: [
    { id: "x", label: "X (formerly Twitter)", url: "https://example.com/ufa", verified: false },
    { id: "facebook", label: "Facebook", url: "https://example.com/ufa", verified: false },
    { id: "instagram", label: "Instagram", url: "https://example.com/ufa", verified: false },
    { id: "youtube", label: "YouTube", url: "https://example.com/ufa", verified: false },
  ],
  policies: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
