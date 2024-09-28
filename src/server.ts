import 'the-log';
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import NodeClam from 'clamscan';
import { unlink } from "node:fs/promises";
import path from 'path';

const port = process.env.PORT || 3000;

let clam;
for (let i = 1; i <= 20; i++) {
  try {
    clam = await (new NodeClam().init({ clamdscan: { host: 'localhost', port: 3310 } }));
    break;
  } catch {
    console.log(`Waiting for ClamAV on port 3310 (${i}/20)`);
    await Bun.sleep(5 * 1000);
  }
}

console.log(`Service started on ${port} port`);

const ok = { ok: true };
const notOk = { ok: false };

const checkFile = async (file) => {
  console.log(`checking ${file.name} (${file.size} bytes)`);

  const tempFilePath = path.join('uploads', `temp-${Date.now()}-${file.name}`);
  const arrayBuffer = await file.arrayBuffer();
  await Bun.write(tempFilePath, arrayBuffer);

  const { isInfected, viruses } = await clam.isInfected(tempFilePath);

  await unlink(tempFilePath);

  return isInfected ? { ...notOk, viruses } : ok;
}

const app = new Hono();
app.use('/', cors())

app.post('/', async (c) => {
  let result;
  try {
    const { file } = await c.req.parseBody();
    result = file ? await checkFile(file) : { ...notOk, error: 'No file uploaded' };
  } catch (err) {
    result = { ...notOk, error: `Error scanning file: ${err}` };
  }

  console.log(JSON.stringify(result));
  return c.json(result, result.error ? 400 : 200);
});

export default { port, fetch: app.fetch };
