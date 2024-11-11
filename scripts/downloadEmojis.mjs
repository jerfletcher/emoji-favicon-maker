import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMOJI_JSON_PATH = path.resolve(__dirname, '../src/lib/data/emoji.json');

async function downloadEmojis() {
  const response = await fetch('https://cdn.jsdelivr.net/npm/emoji.json@13.1.0/emoji.json');
  const emojis = await response.json();
  fs.writeFileSync(EMOJI_JSON_PATH, JSON.stringify(emojis, null, 2));
  console.log('Emojis downloaded and saved to', EMOJI_JSON_PATH);
}

downloadEmojis().catch(console.error);