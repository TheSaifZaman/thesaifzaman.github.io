#!/bin/bash
# Run this script after adding a new Day-X folder to images/
# Usage: cd annual-reset && bash generate-manifest.sh

cd "$(dirname "$0")"

python3 -c "
import os, json

base = 'images'
days = sorted([d for d in os.listdir(base) if os.path.isdir(os.path.join(base, d)) and d.startswith('Day-')],
              key=lambda x: int(x.split('-')[1]))
manifest = []
for day in days:
    day_path = os.path.join(base, day)
    images = sorted([f for f in os.listdir(day_path)
                     if f.lower().endswith(('.png','.jpg','.jpeg','.webp','.gif'))])
    num = day.split('-')[1]
    manifest.append({
        'day': int(num),
        'folder': day,
        'title': 'Day ' + num,
        'slides': [base + '/' + day + '/' + img for img in images]
    })
with open('manifest.json', 'w') as f:
    json.dump(manifest, f, indent=2)
with open('manifest.js', 'w') as f:
    f.write('window.__MANIFEST__ = ')
    json.dump(manifest, f, indent=2)
    f.write(';\\n')
print(f'Generated manifest.json + manifest.js with {len(manifest)} day(s)')
for d in manifest:
    print(f\"  {d['title']}: {len(d['slides'])} slides\")
"
