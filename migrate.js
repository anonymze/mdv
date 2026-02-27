import fs from 'fs';
import { randomUUID } from 'crypto';

// Read MySQL dump
const sqlDump = fs.readFileSync('./x/mdv.sql', 'utf-8');

// Helper: Convert Unix timestamp to ISO
const unixToISO = (unix) => new Date(unix * 1000).toISOString();

// Helper: Escape for PostgreSQL
const escape = (str) => {
  if (!str) return null;
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "''")
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
};

// Helper: Clean body text for Lexical JSON
const cleanBody = (html) => {
  if (!html) return '';
  return html
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\r\\n/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
};

// Helper: Convert HTML to Payload Lexical JSONB
const htmlToRichText = (html) => {
  const text = cleanBody(html);
  const obj = {
    root: {
      children: [{ children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }], direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1 }],
      direction: 'ltr', format: '', indent: 0, type: 'root', version: 1
    }
  };
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'`;
};

// Taxonomy mapping
const TAXONOMY = {
  19: { table: 'art_vivant', type: 'evenement' },
  40: { table: 'art_vivant', type: 'residence' },
  15: { table: 'exposition', type: 'exposition' },
  59: { table: 'parc_national', type: 'evenement' },
  20: { table: 'parc_national', type: 'evenement' },
  41: { table: 'autres_actualites', type: 'evenement' },
  68: 'jeune_public',
  69: 'skip',
  25: 'skip',
};

// Exposition event keywords
const EXPO_EVENT_KEYWORDS = /vernissage|visite|rencontre|dédicace|soirée|concert|projection/i;

// Extract nodes
const nodeMatches = sqlDump.match(/INSERT INTO `node`[^;]+;/gs);
const nodeData = [];

if (nodeMatches) {
  nodeMatches.forEach(insert => {
    const rows = insert.match(/\((\d+),\s*(\d+),\s*'([^']+)',\s*'([^']+)',\s*'(?:[^'\\]|\\.)+',\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/g);
    if (rows) {
      rows.forEach(row => {
        const match = row.match(/\((\d+),\s*(\d+),\s*'([^']+)',\s*'([^']+)',\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const [, nid, vid, type, lang, title, uid, status, created, changed] = match;
          nodeData.push({
            nid: parseInt(nid),
            vid: parseInt(vid),
            type,
            lang,
            title: title.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\'),
            status: parseInt(status),
            created: parseInt(created),
            changed: parseInt(changed),
          });
        }
      });
    }
  });
}

console.log(`Found ${nodeData.length} nodes`);

// Extract taxonomy associations
const taxonomyMatches = sqlDump.match(/INSERT INTO `field_data_field_type_event`[^;]+;/gs);
const taxonomyMap = new Map();

if (taxonomyMatches) {
  taxonomyMatches.forEach(insert => {
    const rows = insert.match(/\('node',\s*'event',\s*\d+,\s*(\d+),\s*\d+,\s*'[^']+',\s*\d+,\s*(\d+)\)/g);
    if (rows) {
      rows.forEach(row => {
        const match = row.match(/\('node',\s*'event',\s*\d+,\s*(\d+),\s*\d+,\s*'[^']+',\s*\d+,\s*(\d+)\)/);
        if (match) {
          const nid = parseInt(match[1]);
          const tid = parseInt(match[2]);
          if (!taxonomyMap.has(nid)) taxonomyMap.set(nid, []);
          taxonomyMap.get(nid).push(tid);
        }
      });
    }
  });
}

console.log(`Found ${taxonomyMap.size} taxonomy associations`);

// Extract body content
const bodyMap = new Map();
const bodyLines = sqlDump.split('\n');
let inBodySection = false;

for (let i = 0; i < bodyLines.length; i++) {
  const line = bodyLines[i];

  if (line.includes('INSERT INTO `field_data_body`')) {
    inBodySection = true;
    continue;
  }

  if (inBodySection) {
    if (line.trim() === '' || line.startsWith('--') || (line.startsWith('INSERT INTO') && !line.includes('field_data_body'))) {
      inBodySection = false;
      break;
    }

    if (line.startsWith("('node'")) {
      const parts = [];
      let current = '';
      let inQuote = false;
      let escapeNext = false;

      for (let j = 1; j < line.length; j++) {
        const char = line[j];

        if (escapeNext) {
          current += char;
          escapeNext = false;
          continue;
        }

        if (char === '\\') {
          current += char;
          escapeNext = true;
          continue;
        }

        if (char === "'" && !inQuote) {
          inQuote = true;
          continue;
        } else if (char === "'" && inQuote) {
          inQuote = false;
          continue;
        }

        if (char === ',' && !inQuote) {
          parts.push(current.trim());
          current = '';
          continue;
        }

        current += char;
      }

      if (current) parts.push(current.trim().replace(/\)$/, '').replace(/;$/, ''));

      if (parts.length >= 10 && (parts[1] === 'event' || parts[1] === 'film')) {
        const nid = parseInt(parts[3]);
        let body = parts[7];
        // body is cleaned later in cleanBody() inside htmlToRichText
        bodyMap.set(nid, body);
      }
    }
  }
}

console.log(`Found ${bodyMap.size} body contents`);

// Extract actual event dates from field_data_field_event_date
const eventDateMatches = sqlDump.match(/INSERT INTO `field_data_field_event_date`[^;]+;/gs);
const eventDateMap = new Map();

if (eventDateMatches) {
  eventDateMatches.forEach(insert => {
    const rows = insert.match(/\('node',\s*'event',\s*\d+,\s*(\d+),\s*\d+,\s*'[^']+',\s*\d+,\s*'([^']+)'(?:,\s*'([^']*)')?\)/g);
    if (rows) {
      rows.forEach(row => {
        const match = row.match(/\('node',\s*'event',\s*\d+,\s*(\d+),\s*\d+,\s*'[^']+',\s*\d+,\s*'([^']+)'(?:,\s*'([^']*)')?\)/);
        if (match) {
          const nid = parseInt(match[1]);
          if (!eventDateMap.has(nid)) {
            eventDateMap.set(nid, { date_start: match[2], date_end: match[3] || null });
          }
        }
      });
    }
  });
}

console.log(`Found ${eventDateMap.size} event dates`);

// Generate SQL
let sqlOutput = '-- Migration SQL for Maison de la Vallée\n';
sqlOutput += '-- Generated: ' + new Date().toISOString() + '\n';
sqlOutput += '-- Events only (films skipped)\n';
sqlOutput += '-- Archives only (past dates)\n\n';

let stats = {
  cinema: 0,
  art_vivant: 0,
  exposition: 0,
  parc_national: 0,
  autres_actualites: 0,
  skipped: 0,
};

// Filter: only past dates (archives)
const nowTimestamp = Math.floor(Date.now() / 1000);

// Skip all films
console.log('Skipping all film nodes (no cinema migration)');

// Process events only — keep past events (archives), skip future
const now = new Date();
const events = nodeData.filter(n => {
  if (n.type !== 'event' || n.status !== 1) return false;
  const eventDate = eventDateMap.get(n.nid);
  const date = eventDate ? new Date(eventDate.date_start) : new Date(n.created * 1000);
  return date < now;
});
events.forEach(event => {
  const tids = taxonomyMap.get(event.nid) || [];

  // Skip mediatheque, projets
  if (tids.includes(25) || tids.includes(69)) {
    stats.skipped++;
    return;
  }

  // Check for jeune_public flag (tid=68)
  const jeunePublic = tids.includes(68);

  // Get primary tids (exclude 68)
  const primaryTids = tids.filter(t => t !== 68);
  const primaryTid = primaryTids[0];

  // Skip if only tid=68 with no primary taxonomy
  if (!primaryTid || !TAXONOMY[primaryTid]) {
    stats.skipped++;
    return;
  }

  const mapping = TAXONOMY[primaryTid];
  if (mapping === 'skip' || mapping === 'jeune_public') {
    stats.skipped++;
    return;
  }

  let { table, type } = mapping;

  // Special handling for expositions
  if (table === 'exposition') {
    if (EXPO_EVENT_KEYWORDS.test(event.title)) {
      type = 'evenement';
    } else {
      type = 'exposition';
    }
  }

  const id = randomUUID();
  const title = escape(event.title);
  const synopsis = bodyMap.get(event.nid) || '';
  const synopsisJson = htmlToRichText(synopsis);

  // Use actual event date if available, fallback to node created
  const eventDate = eventDateMap.get(event.nid);
  const dateStart = eventDate ? new Date(eventDate.date_start).toISOString() : unixToISO(event.created);

  // Calculate date_end
  let dateEnd;
  if (eventDate?.date_end) {
    dateEnd = new Date(eventDate.date_end).toISOString();
  } else if (table === 'exposition' && type === 'exposition') {
    const date = new Date(dateStart);
    date.setMonth(date.getMonth() + 1);
    dateEnd = date.toISOString();
  } else {
    const date = new Date(dateStart);
    date.setHours(date.getHours() + 2);
    dateEnd = date.toISOString();
  }

  // Insert based on table
  if (table === 'art_vivant') {
    sqlOutput += `INSERT INTO art_vivant (id, type, archive, immanquable, jeune_public, thumbnail_id, date_start, price, duration, authors, portfolio_authors, tags, location, updated_at, created_at) VALUES\n`;
    sqlOutput += `('${id}', '${type}', true, false, ${jeunePublic ? 'true' : 'false'}, NULL, '${dateStart}', '12€ Normal; 8 € Abonnée; 6 €; 6€ Réduit - 26 ans', '2h', NULL, NULL, NULL, NULL, '${dateStart}', '${dateStart}');\n\n`;
    stats.art_vivant++;
  } else if (table === 'exposition') {
    // Exposition has no jeune_public field
    sqlOutput += `INSERT INTO exposition (id, type, archive, immanquable, thumbnail_id, date_start, date_end, location, tags, authors, portfolio_authors, credits_photos, updated_at, created_at) VALUES\n`;
    sqlOutput += `('${id}', '${type}', true, false, NULL, '${dateStart}', '${dateEnd}', NULL, NULL, NULL, NULL, NULL, '${dateStart}', '${dateStart}');\n\n`;
    stats.exposition++;
  } else if (table === 'parc_national') {
    sqlOutput += `INSERT INTO parc_national (id, type, archive, immanquable, jeune_public, thumbnail_id, date_start, price, duration, authors, portfolio_authors, tags, location, updated_at, created_at) VALUES\n`;
    sqlOutput += `('${id}', '${type}', true, false, ${jeunePublic ? 'true' : 'false'}, NULL, '${dateStart}', '12€ Normal; 8 € Abonnée; 6 €; 6€ Réduit - 26 ans', '2h', NULL, NULL, NULL, NULL, '${dateStart}', '${dateStart}');\n\n`;
    stats.parc_national++;
  } else if (table === 'autres_actualites') {
    sqlOutput += `INSERT INTO autres_actualites (id, type, archive, jeune_public, thumbnail_id, date_start, price, duration, authors, portfolio_authors, tags, location, updated_at, created_at) VALUES\n`;
    sqlOutput += `('${id}', '${type}', true, ${jeunePublic ? 'true' : 'false'}, NULL, '${dateStart}', '12€ Normal; 8 € Abonnée; 6 €; 6€ Réduit - 26 ans', '2h', NULL, NULL, NULL, NULL, '${dateStart}', '${dateStart}');\n\n`;
    stats.autres_actualites++;
  }

  // Insert all 3 locales with French content
  ['fr', 'en', 'es'].forEach(locale => {
    sqlOutput += `INSERT INTO ${table}_locales (title, description, informations_more, _locale, _parent_id) VALUES ('${title}', ${synopsisJson}, NULL, '${locale}', '${id}');\n`;
  });
  sqlOutput += '\n';
});

// Write output
fs.writeFileSync('./migration.sql', sqlOutput);

console.log('\n=== Migration Stats ===');
console.log(`Cinema: ${stats.cinema} (skipped all films)`);
console.log(`Art Vivant: ${stats.art_vivant}`);
console.log(`Exposition: ${stats.exposition}`);
console.log(`Parc National: ${stats.parc_national}`);
console.log(`Autres Actualités: ${stats.autres_actualites}`);
console.log(`Skipped: ${stats.skipped}`);
console.log(`\nTotal: ${stats.art_vivant + stats.exposition + stats.parc_national + stats.autres_actualites}`);
console.log('FR content duplicated in EN/ES locales');
console.log('migration.sql generated ✓');
