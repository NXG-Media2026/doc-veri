import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv[2] ?? 'dist');
const findings = [];
const routes = new Set();
const external = new Set();
const resources = new Set();
for (const route of ['/', '/en']) {
  const file = path.join(root, route, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const h1s = [...html.matchAll(/<h1\b/g)].length;
  if (h1s !== 1) findings.push({route, problem:'h1 count', count:h1s});
  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const ref = match[2].replaceAll('&amp;', '&');
    if (ref.startsWith('mailto:') || ref.startsWith('data:')) continue;
    const url = new URL(ref, 'https://docveri.de' + route);
    if (url.origin !== 'https://docveri.de') { external.add(url.href); continue; }
    const decoded = decodeURIComponent(url.pathname);
    const candidates = [path.join(root, decoded), path.join(root, decoded, 'index.html')];
    const target = candidates.find(p => fs.existsSync(p) && fs.statSync(p).isFile());
    if (!target) findings.push({route, ref, problem:'missing local target'});
    else {
      (target.endsWith('.html') ? routes : resources).add(url.pathname);
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = fs.readFileSync(target, 'utf8');
        if (!targetHtml.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"')) findings.push({route, ref, problem:'missing fragment'});
      }
    }
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { findings.push({route, problem:'invalid JSON-LD'}); }
  }
}
const statuses = [];
for (const route of process.env.PREVIEW_URL ? routes : []) {
  const result = await fetch(process.env.PREVIEW_URL + route);
  statuses.push({route, status:result.status});
  if (!result.ok) findings.push({route, problem:'HTTP', status:result.status});
}
console.log(JSON.stringify({localRoutes:routes.size,resources:resources.size,external:[...external],statuses,findings}, null, 2));
process.exitCode = findings.length ? 1 : 0;
