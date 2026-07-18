#!/usr/bin/env node

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'assets');
const isDryRun = process.argv.includes('--dry-run');

function loadEnvFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            let value = trimmed.slice(eqIdx + 1).trim();
            value = value.replace(/^["']|["']$/g, '');
            if (!process.env[key]) process.env[key] = value;
          }
        }
      }
    }
  } catch {}
}

loadEnvFile(path.join(ROOT, '.env'));
loadEnvFile(path.join(ROOT, '.env.local'));

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error('Missing required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
  console.error('Create .env.local with these values or export them.');
  process.exit(1);
}

console.log(`Project: ${PROJECT_ID} / ${DATASET}`);
console.log(`Token: ${TOKEN ? TOKEN.slice(0, 12) + '...' : 'MISSING'}`);
console.log(`Mode: ${isDryRun ? 'DRY RUN (no changes)' : 'LIVE'}`);
console.log('');

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2026-02-21',
  useCdn: false,
});

// ──────────────────────────────────────────────
// Team Data (from constants/index.js)
// Images mapped 1:1 by array index order
// ──────────────────────────────────────────────

const teamData = [
  // ── 2025 ──
  {
    year: 2025,
    title: 'Core 2025',
    members: [
      { name: 'Dr. Sony P', position: 'Staff In-Charge', linkedin: 'https://www.linkedin.com/in/dr-sony-p-76332245' },
      { name: 'Yasir', position: 'Chairperson', linkedin: 'https://www.linkedin.com/in/mohammed-yasir-k-n', github: 'https://github.com/mohdyasirkn' },
      { name: 'Vasanth', position: 'Vice Chairperson', linkedin: 'https://in.linkedin.com/in/vasanth1337', github: 'https://github.com/1337kid' },
      { name: 'Sreepriya', position: 'Secretary', linkedin: 'https://www.linkedin.com/in/sreepriya-km', github: 'https://github.com/sreepriyakmo4' },
      { name: 'Allan', position: 'Treasurer', linkedin: 'https://in.linkedin.com/in/allan-thomas-530970285' },
      { name: 'Varun', position: 'Community Lead', linkedin: 'https://vrn21.com/linkedin' },
      { name: 'Nikesh', position: 'Open Hardware Advocate', linkedin: 'https://in.linkedin.com/in/nikesh-tv?trk=org-employees', github: 'https://github.com/Nikesh-tv' },
      { name: 'Pranav', position: 'AI/ML Lead', linkedin: 'https://in.linkedin.com/in/pranav-p-s-12a503295' },
      { name: 'Ben Franklin', position: 'Marketing Lead', linkedin: 'https://in.linkedin.com/in/benfranklinms', github: 'https://github.com/Benfranklinms' },
      { name: 'Mary', position: 'Marketing Sub-Lead', linkedin: 'https://in.linkedin.com/in/mary-john-056a00292' },
      { name: 'Khushi', position: 'Content Lead', linkedin: 'https://in.linkedin.com/in/khushi-nilesh-ved' },
      { name: 'Anagha', position: 'Content Sub-Lead', linkedin: 'https://in.linkedin.com/in/anagha-d-aa6a95292' },
      { name: 'Janeeta', position: 'Design Lead', linkedin: 'https://www.linkedin.com/in/janeeta-jolly/', github: 'https://github.com/JaneetaJolly' },
      { name: 'Steffi', position: 'Design Sub-Lead', linkedin: 'https://www.linkedin.com/in/steffi-lazar/', github: 'http://github.com/steffilazar01' },
      { name: 'Midhun', position: 'Tech Lead', linkedin: 'https://www.linkedin.com/in/midhun-unni/', github: 'http://github.com/midhununni457' },
      { name: 'Joel', position: 'Web Lead', linkedin: 'https://www.linkedin.com/in/joel-roshan-1b1a307a/', github: 'http://github.com/joel-roshan' },
      { name: 'Aaron', position: 'Web Sub-Lead', linkedin: 'https://www.linkedin.com/in/aarongeorgeabraham/', github: 'http://github.com/Aaron-53' },
      { name: 'Asil', position: 'Events Lead', linkedin: 'https://www.linkedin.com/in/asilmehaboob/', github: 'http://github.com/AsilMehaboob' },
      { name: 'Gowri', position: 'Events Sub-Lead', linkedin: 'http://www.linkedin.com/in/gowrikrishna-k-u', github: 'https://github.com/Gowriku' },
      { name: 'Abhay', position: 'UI/UX Lead', linkedin: 'https://www.linkedin.com/in/abhaybalakrishnan/', github: 'https://github.com/ABHAY-100' },
      { name: 'Dijith', position: 'Executive', linkedin: 'https://www.linkedin.com/in/dijith481/', github: 'https://github.com/dijith-481' },
      { name: 'Aditya', position: 'Executive', linkedin: 'https://www.linkedin.com/in/aditeya-j-frankur/', github: 'https://github.com/aditeya24' },
      { name: 'Anan', position: 'Executive', linkedin: 'https://www.linkedin.com/in/anankm-67b540307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
      { name: 'Amith', position: 'Executive', linkedin: 'https://www.linkedin.com/in/amith-sreekumar-401a58329/' },
      { name: 'Abhin', position: 'Executive', linkedin: 'https://www.linkedin.com/in/abhin-krishna/', github: 'https://github.com/dearabhin' },
      { name: 'Ewan', position: 'Executive', linkedin: 'https://www.linkedin.com/in/ewanjohndennis/', github: 'https://github.com/Ewanjohndennis' },
      { name: 'Nimah', position: 'Executive', linkedin: 'https://www.linkedin.com/in/nimah-zayn/', github: 'https://github.com/nimahzayn' },
    ],
    imageDir: 'core25',
    imageFiles: [
      'DrSonyP.png', 'yasir.png', 'vasanth.png', 'sreepriya.png',
      'allan.png', 'varun.png', 'nikesh.png', 'pranav.png',
      'benfranklin.png', 'mary.png', 'khushi.png', 'anagha.png',
      'janeeta.png', 'steffi.png', 'midhun.png', 'joel.png',
      'aaron.png', 'asil.png', 'gowrikrishna.png', 'abhay.png',
      'dijith.png', 'aditya.png', 'anan.png', 'amith.png',
      'abhin.png', 'ewan.png', 'nimah.png',
    ],
  },

  // ── 2024 ──
  {
    year: 2024,
    title: 'Core 2024',
    members: [
      { name: 'Dr. Sony P', position: 'Staff In-Charge' },
      { name: 'Nikhil', position: 'Chair' },
      { name: 'Varun', position: 'Vice Chair' },
      { name: 'Theertha', position: 'Secretary' },
      { name: 'Roshin', position: 'Joint Secretary' },
      { name: 'Alan', position: 'Open Hardware Advocate' },
      { name: 'Khushi', position: 'Tech Lead' },
      { name: 'Jeswin', position: 'Treasurer' },
      { name: 'Pranav', position: 'Operations Lead' },
      { name: 'Karthik', position: 'AI/ML Lead' },
      { name: 'Nikesh', position: 'Events Lead' },
      { name: 'Sheril', position: 'Events Sub-Lead' },
      { name: 'Jaimy', position: 'Design Lead' },
      { name: 'Anavadya', position: 'Design Sub-Lead' },
      { name: 'Arjun', position: 'Marketing Lead' },
      { name: 'Adhish', position: 'Marketing Sub-Lead' },
      { name: 'Srilakshmi', position: 'Content Lead' },
      { name: 'Deepak', position: 'Content Sub-Lead' },
      { name: 'Joel', position: 'Web Lead' },
      { name: 'Aadithya', position: 'Executive' },
      { name: 'Yasir', position: 'Executive' },
      { name: 'Sreepria', position: 'Executive' },
      { name: 'Vasanth', position: 'Executive' },
    ],
    imageDir: 'core24',
    imageFiles: [
      'sony_miss.png',
      'Nikhil_M__Chairperson.png',
      'KV_Varun_Krishnan_Vice_Chairperson.png',
      'A_Theertha__Secretary.png',
      'Roshin_Jimmy_Joint_Secretary.png',
      'Alan_Biju__Open_Hardware_Advocate.png',
      'Khushi_Ved__Tech_Lead.png',
      'Jeswin_Joseph_Treasurer.png',
      'Pranav_P_S__Operations_Lead.png',
      'Karthik_G_Kumar__AI_ML_Lead.png',
      'Nikesh_T_V__Events_Lead.png',
      'Sheril_Dominic__Events_sub_head.png',
      'Jaimy_Renji__Design_Lead.png',
      'Anavadya_N_Lakshmi__Design_Sub_Lead.png',
      'Arjun_C_S__Marketing_head.png',
      'Adhish_Joseph_Shinu_Sub-Marketing_Lead.png',
      'Srilakshmi_R_Content_Head.png',
      'Deepak_P_Nair_Content_Sub-Head.png',
      'Joel_Roshan__Web_Lead.png',
      'Aadithya_Madhav__Executive.png',
      'Mohammed_Yasir_K_N__Executive.png',
      'Sreepria_KM_Executive.png',
      'Vasanth_R__Executive.png',
    ],
  },

  // ── 2023 ──
  {
    year: 2023,
    title: 'Core 2023',
    members: [
      { name: 'Dr. Sony P', position: 'Staff In-Charge' },
      { name: 'Jithin', position: 'Chair' },
      { name: 'Vishnu', position: 'Vice Chair' },
      { name: 'Karthik', position: 'Secretary' },
      { name: 'Lisa', position: 'GitHub Campus Expert' },
      { name: 'Rahul', position: 'Treasurer' },
      { name: 'Srilakshmi', position: 'Events Head' },
      { name: 'Annu', position: 'Design Head' },
      { name: 'Anakha', position: 'Content Head' },
      { name: 'Mekha', position: 'Marketing Head' },
      { name: 'Theertha', position: 'GSOC Committee Lead' },
      { name: 'Jozef', position: 'Tech Head' },
      { name: 'Alan', position: 'AI/ML Head' },
      { name: 'Alaka', position: 'UI/UX Head' },
      { name: 'Niya', position: 'Web Head' },
      { name: 'Alfred', position: 'App Head' },
      { name: 'Khushi', position: 'Executive' },
      { name: 'Arjun', position: 'Executive' },
      { name: 'Roshin', position: 'Executive' },
      { name: 'Nikhil', position: 'Executive' },
      { name: 'Nikesh', position: 'Executive' },
    ],
  },

  // ── 2022 ──
  {
    year: 2022,
    title: 'Core 2022',
    members: [
      { name: 'Dr. Sony P', position: 'Staff In-Charge' },
      { name: 'Aneeta', position: 'Chair' },
      { name: 'Elizabeth', position: 'Vice Chair' },
      { name: 'John', position: 'Inclusivity Lead' },
      { name: 'Alfred', position: 'Community Lead' },
      { name: 'Mayon', position: 'Secretary' },
      { name: 'Jithin', position: 'Joint Secretary' },
      { name: 'Adam', position: 'Tech Lead' },
      { name: 'Salman', position: 'Tech Sub-Lead' },
      { name: 'Jeswin', position: 'Design Lead' },
      { name: 'Sony', position: 'Content Lead' },
      { name: 'Parvathy', position: 'Second Year Representative' },
      { name: 'Karthik', position: 'Second Year Representative' },
      { name: 'Sreearvathy', position: 'Second Year Representative' },
      { name: 'Subramani', position: 'Second Year Representative' },
    ],
  },

  // ── 2021 ──
  {
    year: 2021,
    title: 'Core 2021',
    members: [
      { name: 'Dr. Sony P', position: 'Staff In-Charge' },
      { name: 'Mohita Bipin', position: 'Chairperson' },
      { name: 'Malavika R Vikraman', position: 'General Manager' },
      { name: 'Prithvi Chandra', position: 'Inclusivity Lead' },
      { name: 'Pranav Shridhar', position: 'Tech Lead' },
      { name: 'Varun Krishna S', position: 'Advocacy Lead' },
      { name: 'Emmanuel Antony', position: 'Community Lead' },
      { name: 'Aneetta Mary Sajan', position: 'Joint Secretary' },
      { name: 'T Megha', position: 'Joint Secretary' },
      { name: 'Alfred Pius', position: 'Outreach Lead' },
      { name: 'Jessica Jolly', position: 'Design Lead' },
      { name: 'Sreejaya V S', position: 'Content Lead' },
      { name: 'Durga Santhosh', position: 'Second Year Representative' },
      { name: 'Mayon Francis', position: 'Second Year Representative' },
      { name: 'Hanna Salam', position: 'Second Year Representative' },
      { name: 'Adam Oommen Jacob', position: 'Second Year Representative' },
    ],
  },

  // ── 2020 ──
  {
    year: 2020,
    title: 'Core 2020',
    members: [
      { name: 'Sharat P Raju', position: 'Staff In-charge' },
      { name: 'Aswin G', position: 'Chairperson' },
      { name: 'Priyanga P', position: 'Vice Chair' },
      { name: 'Aswin M', position: 'General Secretary' },
      { name: 'Sneha Saj', position: 'Initiatives Head' },
      { name: 'Arun H', position: 'Treasurer' },
      { name: 'Varun Krishna S', position: 'Joint Secretary' },
      { name: 'Lakshmi Sunil', position: 'Joint Secretary' },
      { name: 'Emmanuel Antony', position: 'Second Year Core' },
      { name: 'Ameen Azeez', position: 'Second Year Core' },
      { name: 'Pranav Shridhar', position: 'Second Year Core' },
      { name: 'Nikita Menon', position: 'First Year Core' },
      { name: 'Aditiya Anilkumar', position: 'First Year Core' },
      { name: 'Zailesh A R', position: 'First Year Core' },
    ],
  },
];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function buildMemberObj(member, imageAssetId) {
  const obj = {
    _key: `m${Math.random().toString(36).slice(2, 8)}`,
    _type: 'object',
    name: member.name,
    position: member.position,
  };
  if (imageAssetId) {
    obj.image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
    };
  }
  if (member.linkedin) obj.linkedin = member.linkedin;
  if (member.github) obj.github = member.github;
  return obj;
}

async function uploadImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Image not found: ${filePath}`);
    return null;
  }
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp';

  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    contentType: mimeType,
    filename: path.basename(filePath),
  });
  return asset._id;
}

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

async function main() {
  // 1. Check connectivity
  try {
    await client.fetch('count(*[_type == "teamYear"])');
  } catch (err) {
    console.error('Failed to connect to Sanity. Check your credentials and CORS settings.');
    console.error(err.message);
    process.exit(1);
  }

  if (!isDryRun) {
    // 2. Delete existing teamYear documents
    console.log('Deleting existing teamYear documents...');
    const existingIds = await client.fetch('*[_type == "teamYear"]._id');
    if (existingIds.length > 0) {
      const tx = client.transaction();
      for (const id of existingIds) tx.delete(id);
      await tx.commit();
      console.log(`  Deleted ${existingIds.length} existing document(s)`);
    } else {
      console.log('  No existing documents to delete');
    }
    console.log('');
  } else {
    // Check what exists
    const count = await client.fetch('count(*[_type == "teamYear"])');
    console.log(`Existing teamYear documents: ${count}${count > 0 ? ' (will be deleted in live mode)' : ''}`);
  }

  // 3. Process each year
  for (const entry of teamData) {
    const { year, title, members, imageDir, imageFiles } = entry;
    const memberCount = members.length;
    const hasImages = !!(imageDir && imageFiles);

    console.log(`\n${isDryRun ? '[DRY-RUN]' : '[LIVE]'} Year ${year}: "${title}" (${memberCount} members)`);

    // Upload images
    let imageAssetIds = [];
    if (hasImages) {
      console.log(`  Images to upload: ${imageFiles.length}`);
      for (let i = 0; i < imageFiles.length; i++) {
        const filePath = path.join(ASSETS_DIR, imageDir, imageFiles[i]);
        const memberName = members[i]?.name || `member-${i}`;

        if (isDryRun) {
          const exists = fs.existsSync(filePath);
          console.log(`  ${exists ? '✓' : '✗'} ${imageFiles[i]} → ${memberName}${exists ? '' : ' (FILE MISSING!)'}`);
          imageAssetIds.push(`image-${imageFiles[i]}-(placeholder)`);
        } else {
          console.log(`  Uploading ${imageFiles[i]}...`);
          const assetId = await uploadImage(filePath);
          imageAssetIds.push(assetId);
          if (assetId) {
            console.log(`    → ${assetId}`);
          } else {
            console.log(`    → SKIPPED (file not found)`);
          }
        }
      }
    }

    // Build document
    const doc = {
      _type: 'teamYear',
      year,
      title,
      members: members.map((m, i) => {
        const assetId = hasImages ? imageAssetIds[i] : null;
        return buildMemberObj(m, assetId);
      }),
    };

    if (isDryRun) {
      console.log(`  Document ready: ${doc.members.length} members, ${imageAssetIds.filter(Boolean).length} images`);
    } else {
      const created = await client.create(doc);
      console.log(`  Created document: ${created._id}`);
    }
  }

  // 4. Summary
  const totalMembers = teamData.reduce((s, e) => s + e.members.length, 0);
  const totalImages = teamData.filter(e => e.imageFiles).reduce((s, e) => s + (e.imageFiles?.length || 0), 0);

  console.log('\n──────────────────────────────────────');
  console.log(`Summary:`);
  console.log(`  Years: ${teamData.length} (${teamData.map(e => e.year).join(', ')})`);
  console.log(`  Total members: ${totalMembers}`);
  console.log(`  Total images: ${totalImages}`);
  console.log(`  Mode: ${isDryRun ? 'DRY RUN (no changes made)' : 'LIVE (data written to Sanity)'}`);
  console.log('──────────────────────────────────────');

  if (isDryRun) {
    let missing = false;
    for (const entry of teamData) {
      if (entry.imageDir && entry.imageFiles) {
        for (const f of entry.imageFiles) {
          if (!fs.existsSync(path.join(ASSETS_DIR, entry.imageDir, f))) {
            console.error(`  MISSING: assets/${entry.imageDir}/${f}`);
            missing = true;
          }
        }
      }
    }
    if (!missing) console.log('All image files found ✓');
  }
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
