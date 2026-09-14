import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No GEMINI_API_KEY found");
  process.exit(1);
}

const imgPath = "C:\\Users\\sivap\\.gemini\\antigravity-ide\\brain\\98c8cab0-1052-4a01-a02b-048a50a4d965\\.user_uploaded\\media_1789400633094.png";
const imageBase64 = fs.readFileSync(imgPath).toString("base64");

async function extractHeadersAndStructure() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey.trim()}`;
  
  const prompt = `This image is a spreadsheet table showing an academic dataset with multiple columns and 100 entries.
Please list all column headers in exact order from left to right.
Also give the first 3-5 rows of sample values for each column so that we can accurately recreate the complete schema and 100-entry dataset.
Return the output as JSON:
{
  "columns": ["col1", "col2", ...],
  "sample_rows": [
    { "col1": "...", "col2": "..." }
  ],
  "description": "..."
}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/png',
                data: imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    })
  });

  const data = await res.json();
  if (data.candidates && data.candidates[0]) {
    console.log(data.candidates[0].content.parts[0].text);
  } else {
    console.error("Gemini response error:", JSON.stringify(data, null, 2));
  }
}

extractHeadersAndStructure();
