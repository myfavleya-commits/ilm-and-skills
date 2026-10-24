import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// Usage: node tests/journey-preservation.mjs record|verify
// The checkpoint is retained for manual recovery. This tool never restores files.
const WORKSPACE = 'C:\\Users\\Muhammad Sami\\Documents\\ILM & SKILLS';
const APPROVED_TEMP = 'C:\\Users\\MUHAMM~1\\AppData\\Local\\Temp\\opencode';
const CHECKPOINT = path.join(APPROVED_TEMP, 'ilm-skills-pre-3d');
const HOME = 'src/pages/Home.tsx';
const QA_TOOL = 'tests/journey-preservation.mjs';
const MUTABLE = new Set([HOME, 'package.json', 'package-lock.json']);
const ALLOWED_DEPS = new Set([
  'three', '@react-three/fiber', '@react-three/drei', 'gsap', '@types/three',
]);
const DEP_SECTIONS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const EXCLUDED = new Set([
  'node_modules', 'dist', 'artifacts', 'reports', 'playwright-report', 'test-results',
]);
const require = createRequire(path.join(WORKSPACE, 'package.json'));
const ts = require('typescript');
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const absolute = (relative, root = WORKSPACE) => path.join(root, ...relative.split('/'));

async function preflight() {
  assert.equal(process.platform, 'win32', 'This checkpoint is bound to the approved Windows workspace.');
  for (const directory of [path.dirname(WORKSPACE), WORKSPACE, APPROVED_TEMP]) {
    assert((await fs.stat(directory)).isDirectory(), `Required directory missing: ${directory}`);
  }
  const actual = await fs.realpath(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
  assert.equal(actual.toLowerCase(), (await fs.realpath(WORKSPACE)).toLowerCase(), 'Wrong tool location.');
  const temp = await fs.realpath(APPROVED_TEMP);
  const workspace = await fs.realpath(WORKSPACE);
  assert(!temp.toLowerCase().startsWith(`${workspace.toLowerCase()}${path.sep}`), 'Backup must be outside workspace.');
  assert.equal(path.dirname(CHECKPOINT), APPROVED_TEMP, 'Checkpoint must be directly inside approved temp.');
  return { workspace, approvedTemp: temp };
}

async function inventory() {
  const files = [];
  const directories = [];
  const excluded = [];
  async function walk(relative) {
    if (EXCLUDED.has(path.posix.basename(relative)) || relative.endsWith('.tsbuildinfo')) {
      excluded.push(relative);
      return;
    }
    const stat = await fs.lstat(absolute(relative));
    assert(!stat.isSymbolicLink(), `Refusing a symlink instead of silently omitting its source: ${relative}`);
    if (stat.isDirectory()) {
      directories.push(relative);
      for (const name of (await fs.readdir(absolute(relative))).sort(compare)) {
        await walk(`${relative}/${name}`);
      }
    } else {
      assert(stat.isFile(), `Unsupported source entry: ${relative}`);
      const bytes = await fs.readFile(absolute(relative));
      files.push({ path: relative, bytes: bytes.length, sha256: sha(bytes) });
    }
  }
  for (const directory of ['src', 'public', 'tests']) {
    assert((await fs.stat(absolute(directory))).isDirectory(), `Missing source directory: ${directory}`);
    await walk(directory);
  }
  const required = [
    'index.html', 'package.json', 'package-lock.json', 'README.md',
    'VISUAL-REDESIGN.md', '.gitignore',
  ];
  const names = await fs.readdir(WORKSPACE);
  const configs = names.filter((name) =>
    /^tsconfig.*\.json$/.test(name) ||
    /^(vite|playwright)\.config\.(?:[cm]?[jt]s|[jt]s)?$/.test(name) ||
    /^\.prettierrc(?:\..+)?$/.test(name));
  for (const pattern of [/^tsconfig.*\.json$/, /^vite\.config\./, /^playwright\.config\./, /^\.prettierrc/]) {
    assert(configs.some((name) => pattern.test(name)), `Required config not found: ${pattern}`);
  }
  for (const name of [...new Set([...required, ...configs])].sort(compare)) await walk(name);
  files.sort((a, b) => compare(a.path, b.path));
  directories.sort(compare);
  return { files, directories, excluded: excluded.sort(compare) };
}

function parseHome(text) {
  const source = ts.createSourceFile(HOME, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  assert.equal(source.parseDiagnostics.length, 0, 'Home.tsx must parse without errors.');
  return source;
}

function homeShape(text, baseline = false) {
  const source = parseHome(text);
  const imports = source.statements.filter(ts.isImportDeclaration);
  const journeyImports = imports.filter((node) => {
    const clause = node.importClause;
    return clause?.name?.text === 'EducationalJourney' ||
      (clause?.namedBindings && ts.isNamedImports(clause.namedBindings) &&
        clause.namedBindings.elements.some((entry) => entry.name.text === 'EducationalJourney'));
  });
  assert(journeyImports.length <= (baseline ? 0 : 1), 'Only one new EducationalJourney import is permitted.');
  if (journeyImports.length) {
    const node = journeyImports[0];
    const clause = node.importClause;
    const bindings = clause.namedBindings;
    assert(!clause.isTypeOnly && /^\.\.?\//.test(node.moduleSpecifier.text) && !node.attributes,
      'EducationalJourney must be a normal relative component import.');
    assert((clause.name?.text === 'EducationalJourney' && !bindings) ||
      (!clause.name && bindings && ts.isNamedImports(bindings) && bindings.elements.length === 1 &&
        bindings.elements[0].name.text === 'EducationalJourney' &&
        !bindings.elements[0].propertyName && !bindings.elements[0].isTypeOnly),
    'The new import may bind only EducationalJourney.');
  }
  const home = source.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === 'Home');
  assert(home?.body, 'Expected the original Home function.');
  const returns = home.body.statements.filter(ts.isReturnStatement);
  assert.equal(returns.length, 1, 'Expected one original Home return.');
  let root = returns[0].expression;
  while (root && ts.isParenthesizedExpression(root)) root = root.expression;
  assert(root && ts.isJsxElement(root), 'Expected the original Home JSX root.');
  const meaningful = root.children.filter((node) => !ts.isJsxText(node) || node.text.trim());
  const journeyNodes = [];
  const heroIds = [];
  function inspect(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
        node.tagName.getText(source) === 'EducationalJourney') journeyNodes.push(node);
    if (ts.isJsxOpeningElement(node) && ['div', 'section'].includes(node.tagName.getText(source))) {
      const className = node.attributes.properties.find((attr) =>
        ts.isJsxAttribute(attr) && attr.name.getText(source) === 'className');
      const classes = className?.initializer && ts.isStringLiteral(className.initializer)
        ? className.initializer.text.split(/\s+/) : [];
      if (classes.includes('hero-environment') || classes.includes('home-hero')) {
        const ids = node.attributes.properties.filter((attr) =>
          ts.isJsxAttribute(attr) && attr.name.getText(source) === 'id');
        for (const attr of ids) {
          assert(attr.initializer && ts.isStringLiteral(attr.initializer) && attr.initializer.text.trim(),
            'The optional new hero id must be a nonempty literal.');
          heroIds.push(attr);
        }
      }
    }
    ts.forEachChild(node, inspect);
  }
  inspect(source);
  assert(journeyNodes.length <= (baseline ? 0 : 1), 'Only one new EducationalJourney JSX node is permitted.');
  assert.equal(journeyImports.length, journeyNodes.length, 'EducationalJourney import and JSX must be added together.');
  if (journeyNodes.length) {
    assert(meaningful.includes(journeyNodes[0]), 'EducationalJourney must be a direct child of Home.');
    assert(ts.isJsxSelfClosingElement(journeyNodes[0]) && !journeyNodes[0].attributes.properties.length,
      'Only <EducationalJourney /> may be added.');
  }
  assert(heroIds.length <= (baseline ? 0 : 1), 'Only one new id on the original hero is permitted.');
  const omitted = new Set([...imports, ...journeyNodes, ...heroIds]);
  function canonical(node, omit = omitted) {
    if (omit.has(node)) return undefined;
    if (ts.isJsxText(node)) {
      // Ignore indentation, not text. Literal values elsewhere remain exact.
      const text = node.text.replace(/\s+/g, ' ').trim();
      return text ? [node.kind, text] : undefined;
    }
    const children = [];
    ts.forEachChild(node, (child) => {
      const result = canonical(child, omit);
      if (result !== undefined) children.push(result);
    });
    const result = [node.kind];
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isLiteralExpression(node)) result.push(node.text);
    // Declaration kind is a flag, not a forEachChild token (const vs let vs var).
    if (ts.isVariableDeclarationList(node)) result.push(node.flags & ts.NodeFlags.BlockScoped);
    if (node.operator !== undefined) result.push(node.operator);
    if (node.isTypeOnly !== undefined) result.push(node.isTypeOnly);
    if (node.questionDotToken !== undefined) result.push(Boolean(node.questionDotToken));
    if (children.length) result.push(children);
    return result;
  }
  const templateTexts = [];
  function inspectTemplates(node) {
    if (omitted.has(node)) return;
    if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      templateTexts.push([node.kind, node.text]);
    }
    ts.forEachChild(node, inspectTemplates);
  }
  inspectTemplates(source);
  return {
    ast: canonical(source),
    templateTexts,
    imports: imports.filter((node) => !journeyImports.includes(node)).map((node) => canonical(node, new Set())),
    journeyAdded: journeyNodes.length === 1,
    heroIdAdded: heroIds.length === 1,
  };
}

function checkPackage(original, current) {
  const additions = [];
  const stripped = structuredClone(current);
  const seen = new Set();
  for (const section of DEP_SECTIONS) {
    const before = original[section] ?? {};
    const after = current[section] ?? {};
    for (const [name, version] of Object.entries(before)) {
      assert.equal(after[name], version, `Original dependency changed or removed: ${section}.${name}`);
    }
    for (const [name, version] of Object.entries(after)) {
      if (Object.hasOwn(before, name)) continue;
      assert(ALLOWED_DEPS.has(name), `Unapproved dependency addition: ${name}`);
      assert(typeof version === 'string' && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(version),
        `Added dependency must use an exact version: ${name}=${version}`);
      assert(!seen.has(name), `Dependency added to multiple sections: ${name}`);
      seen.add(name);
      additions.push({ section, name, version });
      delete stripped[section][name];
    }
    if (!Object.hasOwn(original, section) && Object.hasOwn(stripped, section) && !Object.keys(stripped[section]).length) {
      delete stripped[section];
    }
  }
  assert.deepEqual(stripped, original, 'Only the five approved exact-version dependencies may be added; original scripts and metadata must stay unchanged.');
  return additions;
}

async function readCheckpoint() {
  const manifestBytes = await fs.readFile(path.join(CHECKPOINT, 'manifest.json'));
  const digest = sha(manifestBytes);
  assert.equal((await fs.readFile(path.join(CHECKPOINT, 'manifest.sha256'), 'utf8')).trim(), digest,
    'Checkpoint manifest digest mismatch.');
  const manifest = JSON.parse(manifestBytes);
  assert.equal(manifest.schema, 'ilm-skills-pre-3d/v1');
  assert.equal(manifest.workspace, await fs.realpath(WORKSPACE), 'Checkpoint belongs to another workspace.');
  assert.equal(manifest.typescriptVersion, ts.version, 'Use the recorded TypeScript parser version.');
  const originals = new Map();
  for (const entry of manifest.files) {
    assert(!path.posix.isAbsolute(entry.path) && !entry.path.includes('\\') &&
      entry.path.split('/').every((part) => part && part !== '.' && part !== '..'), 'Unsafe checkpoint path.');
    assert(!originals.has(entry.path), 'Duplicate checkpoint path.');
    const bytes = await fs.readFile(absolute(entry.path, path.join(CHECKPOINT, 'files')));
    assert.equal(bytes.length, entry.bytes, `Backup size mismatch: ${entry.path}`);
    assert.equal(sha(bytes), entry.sha256, `Backup digest mismatch: ${entry.path}`);
    originals.set(entry.path, bytes);
  }
  return { manifest, digest, originals };
}

async function verify() {
  await preflight();
  const { manifest, digest, originals } = await readCheckpoint();
  const failures = [];
  let immutableMatches = 0;
  let byteIdenticalOriginals = 0;
  const currentBytes = new Map();
  for (const entry of manifest.files) {
    try {
      assert((await fs.lstat(absolute(entry.path))).isFile(), 'Original is not a regular file.');
      const bytes = await fs.readFile(absolute(entry.path));
      currentBytes.set(entry.path, bytes);
      const matches = sha(bytes) === entry.sha256;
      if (matches && entry.path !== QA_TOOL) byteIdenticalOriginals++;
      // This tool was created for this checkpoint, not part of the pre-existing app.
      // Its original backup remains hashed and is never rewritten when QA is refined.
      if (!MUTABLE.has(entry.path) && entry.path !== QA_TOOL) {
        assert(matches, 'Immutable original SHA-256 changed.');
        immutableMatches++;
      }
    } catch (error) {
      failures.push(`${entry.path}: ${error.message}`);
    }
  }
  for (const directory of manifest.directories) {
    try {
      const stat = await fs.lstat(absolute(directory));
      assert(stat.isDirectory() && !stat.isSymbolicLink(), 'Original directory deleted or replaced.');
    } catch (error) {
      failures.push(`${directory}/: ${error.message}`);
    }
  }
  let home = { astMatch: false };
  let dependencyAdditions = [];
  try {
    const before = homeShape(originals.get(HOME).toString('utf8'), true);
    const after = homeShape(currentBytes.get(HOME).toString('utf8'));
    assert.equal(sha(JSON.stringify(before.ast)), manifest.homeAstSha256, 'Recorded Home AST digest mismatch.');
    assert.deepEqual(after.ast, before.ast, 'Home AST differs beyond the new component and optional original-hero id.');
    assert.deepEqual(after.templateTexts, before.templateTexts, 'Original Home template-string values changed.');
    assert.deepEqual(after.imports, before.imports, 'Original Home imports changed or reordered.');
    home = {
      astMatch: true,
      astSha256: manifest.homeAstSha256,
      originalImportsMatch: true,
      templateStringsMatch: true,
      journeyAdded: after.journeyAdded,
      heroIdAdded: after.heroIdAdded,
    };
  } catch (error) {
    failures.push(`Home AST: ${error.message}`);
  }
  try {
    dependencyAdditions = checkPackage(JSON.parse(originals.get('package.json')), JSON.parse(currentBytes.get('package.json')));
  } catch (error) {
    failures.push(`package.json: ${error.message}`);
  }
  const lock = currentBytes.get('package-lock.json');
  const lockReport = {
    policy: 'Reported separately; lockfile bytes may change.',
    originalSha256: sha(originals.get('package-lock.json')),
    currentSha256: lock ? sha(lock) : null,
    changed: lock ? sha(lock) !== sha(originals.get('package-lock.json')) : null,
  };
  const current = await inventory();
  const result = {
    mode: 'verify',
    status: failures.length ? 'FAIL' : 'READY',
    checkpoint: CHECKPOINT,
    manifestSha256: digest,
    capturedFiles: manifest.files.length,
    originals: manifest.files.filter((entry) => entry.path !== QA_TOOL).length,
    originalDirectories: manifest.directories.length,
    immutableFiles: manifest.files.filter((entry) => !MUTABLE.has(entry.path) && entry.path !== QA_TOOL).length,
    immutableSha256Matches: immutableMatches,
    byteIdenticalOriginals,
    noOriginalsDeleted: manifest.files.every((entry) => currentBytes.has(entry.path)),
    addedFiles: current.files.filter((entry) => !originals.has(entry.path)).map((entry) => entry.path),
    newQaTool: {
      path: QA_TOOL,
      policy: 'New QA tooling, not a pre-existing app original. Its first recorded copy is retained.',
      recordedSha256: sha(originals.get(QA_TOOL)),
      currentSha256: currentBytes.has(QA_TOOL) ? sha(currentBytes.get(QA_TOOL)) : null,
    },
    home,
    dependencyAdditions,
    lockfile: lockReport,
    failures,
    restore: 'Manual only. Checkpoint retained; no automatic restore.',
  };
  console.log(json(result));
  if (failures.length) process.exitCode = 1;
  return result;
}

async function record() {
  const locations = await preflight();
  // mkdir is exclusive: an existing or partial checkpoint is never overwritten.
  await fs.mkdir(CHECKPOINT);
  const source = await inventory();
  const baseline = homeShape(await fs.readFile(absolute(HOME), 'utf8'), true);
  const pkg = JSON.parse(await fs.readFile(absolute('package.json'), 'utf8'));
  for (const section of DEP_SECTIONS) {
    for (const name of ALLOWED_DEPS) {
      assert(!Object.hasOwn(pkg[section] ?? {}, name), `Not a pre-3D baseline: ${name} is already installed in package.json.`);
    }
  }
  const backupRoot = path.join(CHECKPOINT, 'files');
  await fs.mkdir(backupRoot);
  for (const directory of source.directories) await fs.mkdir(absolute(directory, backupRoot), { recursive: true });
  for (const entry of source.files) {
    const bytes = await fs.readFile(absolute(entry.path));
    assert.equal(sha(bytes), entry.sha256, `Source changed during record: ${entry.path}`);
    await fs.writeFile(absolute(entry.path, backupRoot), bytes, { flag: 'wx' });
  }
  const after = await inventory();
  assert.deepEqual(after, source, 'Source changed during checkpoint creation; checkpoint is incomplete and must not be used.');
  const manifest = {
    schema: 'ilm-skills-pre-3d/v1',
    recordedAt: new Date().toISOString(),
    ...locations,
    typescriptVersion: ts.version,
    homeAstSha256: sha(JSON.stringify(baseline.ast)),
    mutableOriginals: [...MUTABLE],
    ...source,
  };
  const bytes = Buffer.from(json(manifest));
  await fs.writeFile(path.join(CHECKPOINT, 'manifest.json'), bytes, { flag: 'wx' });
  await fs.writeFile(path.join(CHECKPOINT, 'manifest.sha256'), `${sha(bytes)}\n`, { flag: 'wx' });
  const result = await verify();
  assert.equal(result.status, 'READY', 'Checkpoint validation failed.');
  console.log(json({
    mode: 'record', status: 'READY', checkpoint: CHECKPOINT,
    manifestSha256: sha(bytes), capturedFiles: source.files.length, originals: result.originals,
    immutableFiles: result.immutableFiles, immutableSha256Matches: result.immutableSha256Matches,
    homeAstMatch: result.home.astMatch,
    message: 'Complete pre-3D source checkpoint recorded. Parent may proceed. Retained for manual restore.',
  }));
}

try {
  const [mode, ...extra] = process.argv.slice(2);
  assert(!extra.length && ['record', 'verify'].includes(mode), 'Usage: node tests/journey-preservation.mjs record|verify');
  if (mode === 'record') await record();
  else await verify();
} catch (error) {
  console.error(json({ status: 'FAIL', checkpoint: CHECKPOINT, error: error.message, restored: false }));
  process.exitCode = 1;
}
