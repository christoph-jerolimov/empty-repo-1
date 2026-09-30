// Site content and theme palette. Edit here to change what the page shows.
// `bar` is an optional accent stripe drawn across the top of the sheet.

var THEMES = [
  { id: 'classic', name: 'Classic blue', bg: '#17478f', ink: '#f2f6ff' },
  { id: 'navy', name: 'Navy', bg: '#0b1f3f', ink: '#dbe6ff' },
  { id: 'light', name: 'Light paper', bg: '#f4f2ea', ink: '#1a3f8a' },
  { id: 'dark', name: 'Dark', bg: '#101214', ink: '#e8ecef' },
  { id: 'sand', name: 'Sand', bg: '#d9c7a3', ink: '#3a2a12' },
  { id: 'cyan', name: 'Cyanotype', bg: '#0a5aa8', ink: '#ffffff' },
  { id: 'slate', name: 'Slate', bg: '#2e3a48', ink: '#e1e8f0' },
  { id: 'forest', name: 'Forest', bg: '#173d2a', ink: '#e3f0e6' },
  { id: 'oxblood', name: 'Oxblood', bg: '#4a1620', ink: '#f6e5e5' },
  { id: 'sepia', name: 'Sepia print', bg: '#3c2a1a', ink: '#f0dcbf' },
  { id: 'teal', name: 'Teal', bg: '#0f4f52', ink: '#e0f4f2' },
  { id: 'violet', name: 'Violet', bg: '#2b1f5c', ink: '#e9e3ff' },
  { id: 'terracotta', name: 'Terracotta', bg: '#b3552f', ink: '#fff3e6' },
  { id: 'olive', name: 'Olive drab', bg: '#4b5320', ink: '#f0f1dc' },
  { id: 'redline', name: 'Redline', bg: '#f7f4ee', ink: '#b3261e' },
  { id: 'graphite', name: 'Graphite', bg: '#e9e9e6', ink: '#2b2b2b' },
  { id: 'mint', name: 'Mint', bg: '#cfe8dc', ink: '#123d2b' },
  { id: 'amber', name: 'Amber CRT', bg: '#160c00', ink: '#ffb000' },
  { id: 'phosphor', name: 'Green phosphor', bg: '#03130a', ink: '#33ff66' },
  { id: 'c64', name: 'Commodore 64', bg: '#4040e0', ink: '#a0a0ff' },
  { id: 'teletext', name: 'Teletext', bg: '#000000', ink: '#ffff00' },
  { id: 'win95', name: 'Desktop teal', bg: '#008080', ink: '#ffffff' },
  { id: 'gameboy', name: 'Handheld LCD', bg: '#8bac0f', ink: '#0f380f' },
  { id: 'miami', name: 'Miami neon', bg: '#2a0a3a', ink: '#ff5fd2' },
  { id: 'synth', name: 'Synthwave', bg: '#120b2e', ink: '#00e5ff' },
  { id: 'vhs', name: 'VHS', bg: '#1c1c2e', ink: '#ff8c42' },
  { id: 'memphis', name: 'Memphis', bg: '#fff3b0', ink: '#e0397a' },
  { id: 'lasergrid', name: 'Laser grid', bg: '#000814', ink: '#ff2bd6', bar: 'linear-gradient(90deg,#ff2bd6,#00e5ff)' },
  { id: 'ukraine', name: 'Ukraine', bg: '#0057b7', ink: '#ffd700', bar: 'linear-gradient(180deg,#0057b7 50%,#ffd700 50%)' },
  { id: 'pride', name: 'Pride', bg: '#141418', ink: '#ffffff', bar: 'linear-gradient(90deg,#e40303 0 16.6%,#ff8c00 0 33.3%,#ffed00 0 50%,#008026 0 66.6%,#24408e 0 83.3%,#732982 0)' },
  { id: 'rainbow', name: 'Rainbow paper', bg: '#faf8f2', ink: '#222222', bar: 'linear-gradient(90deg,#ff004d,#ff8a00,#ffe600,#00c853,#00b0ff,#7c4dff,#ff004d)' }
];

var PROJECTS = [
  { id: 'ledger', no: '01', year: '2025', name: 'Ledger Core', diagram: 'event pipeline', summary: 'Double-entry ledger service processing 40k transactions/sec with exactly-once guarantees.', stack: 'Go · Kafka · Postgres', metric: '40k tx / sec · p99 12 ms', role: 'Tech lead', duration: '14 months', problem: 'Legacy ledger drifted from the source of truth under load, forcing nightly reconciliation runs.', approach: 'Idempotent event consumers, outbox pattern, and a compacted changelog that made replay a first-class operation.', source: '#' },
  { id: 'relay', no: '02', year: '2024', name: 'Relay CLI', diagram: 'command graph', summary: 'Developer tool that turns service manifests into local environments in under a minute.', stack: 'Rust · Docker · gRPC', metric: '< 60 s cold start', role: 'Creator', duration: '8 months', problem: 'Onboarding a new engineer took two days of environment setup and tribal knowledge.', approach: 'Declarative manifests, cached image layers, and a dependency graph resolver with clear failure messages.', source: '#' },
  { id: 'atlas', no: '03', year: '2023', name: 'Atlas Search', diagram: 'index shards', summary: 'Product search rebuilt on a sharded inverted index with typo-tolerant ranking.', stack: 'TypeScript · Elasticsearch · Node', metric: '3× relevance lift', role: 'Senior engineer', duration: '10 months', problem: 'Search returned zero results for a fifth of queries due to strict matching.', approach: 'Custom analyzers, learned synonyms from click logs, and offline evaluation harness before every release.', source: '#' },
  { id: 'meter', no: '04', year: '2022', name: 'Meter', diagram: 'metrics fan-in', summary: 'Usage-based billing pipeline aggregating events from 300 services into invoices.', stack: 'Python · Flink · BigQuery', metric: '300 services · 0 missed invoices', role: 'Engineer', duration: '6 months', problem: 'Billing depended on hand-maintained SQL and broke silently every month-end.', approach: 'Streaming aggregation with late-event windows and contract tests on every emitting service.', source: '#' }
];

var SKILLS = [
  { k: 'Languages', v: 'Go, Rust, TypeScript, Python' },
  { k: 'Data', v: 'Postgres, Kafka, Flink, Redis' },
  { k: 'Infra', v: 'Kubernetes, Terraform, AWS' },
  { k: 'Practice', v: 'Observability, testing, incident review' },
  { k: 'Interests', v: 'Distributed systems, DX tooling' }
];

var EXPERIENCE = [
  { years: '2023 — now', role: 'Staff Engineer', company: 'Northline Payments', note: 'Own the ledger and settlement platform. Lead a team of six; set technical direction across three squads.' },
  { years: '2020 — 2023', role: 'Senior Engineer', company: 'Kepler Commerce', note: 'Rebuilt search and catalog services; introduced on-call practices and blameless post-mortems.' },
  { years: '2018 — 2020', role: 'Software Engineer', company: 'Fabrik Studio', note: 'Full-stack work for early-stage clients, from data modelling to deployment.' }
];

var POSTS = [
  { title: 'Exactly-once is a spectrum', date: 'Jun 2026', href: '#' },
  { title: 'Why I write runbooks before code', date: 'Feb 2026', href: '#' },
  { title: 'Reading a flame graph in five minutes', date: 'Nov 2025', href: '#' },
  { title: 'Small services, big contracts', date: 'Jul 2025', href: '#' }
];

var OSS = [
  { name: 'relay', desc: 'local environments from manifests', stars: '2.1k', href: '#' },
  { name: 'pgtrace', desc: 'Postgres query tracing for Go', stars: '640', href: '#' },
  { name: 'kafka-outbox', desc: 'transactional outbox helpers', stars: '380', href: '#' }
];
