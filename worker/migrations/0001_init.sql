-- Rate-limit counters. Keys look like "min:<ipHash>:<minute>",
-- "day:<ipHash>:<date>" and "global:<date>"; expires_at is epoch seconds.
CREATE TABLE counters (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

-- Anonymous question log (no IP, nothing else about the visitor), kept 30 days.
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  question TEXT NOT NULL,
  cited TEXT NOT NULL,
  outcome TEXT NOT NULL,
  latency_ms INTEGER NOT NULL
);

CREATE INDEX questions_ts ON questions (ts);
CREATE INDEX counters_expires_at ON counters (expires_at);
