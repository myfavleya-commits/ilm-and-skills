import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Record BEFORE editing. The exclusive baseline is deliberately outside the project.
const root = fs.realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const temporaryDirectory = 'C:\\Users\\MUHAMM~1\\AppData\\Local\\Temp\\opencode';
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const baselinePath = path.join(
  temporaryDirectory,
  `source-preservation-${sha256(root).slice(0, 16)}.json`,
);
const editable = ['src/pages/Home.tsx', 'src/components/Layout.tsx'];
const lockfiles = [
  'package-lock.json',
  'npm-shrinkwrap.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
];
const skippedAttributes = new Set([
  'className', 'style', 'ref',
  'size', 'width', 'height', 'color', 'fill', 'stroke', 'strokeWidth',
  'strokeLinecap', 'strokeLinejoin', 'strokeDasharray', 'strokeDashoffset',
  'viewBox', 'd', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'x2', 'y1', 'y2',
  'points', 'transform', 'opacity', 'fillOpacity', 'strokeOpacity',
  'variant', 'light', 'small', 'arrow',
]);
const motionAttributes = new Set([
  'initial', 'animate', 'exit', 'variants', 'transition', 'viewport',
  'whileInView', 'whileHover', 'whileTap', 'whileFocus',
  'layout', 'layoutId', 'layoutDependency', 'layoutScroll', 'layoutRoot',
]);
const policy = {
  editable,
  lockfiles,
  skippedAttributes: [...skippedAttributes],
  motionAttributes: [...motionAttributes],
  textWhitespace: 'collapse and trim; retain ordered nonempty JSX text nodes',
  matching: 'independent ordered subsequences per category and named source scope',
};
const categories = ['jsxText', 'attributes', 'handlers', 'literals', 'expressions', 'outlets'];

function originalPath(relative) {
  if (!relative || relative.split('/').some((part) => !part || part === '.' || part === '..') ||
      relative.includes('\\') || path.isAbsolute(relative)) {
    throw new Error(`Invalid original path: ${JSON.stringify(relative)}`);
  }
  let absolute = root;
  for (const part of relative.split('/')) {
    absolute = path.join(absolute, part);
    if (fs.lstatSync(absolute).isSymbolicLink()) {
      throw new Error(`Symlinks are not accepted for originals: ${relative}`);
    }
  }
  return absolute;
}

function readOriginal(relative) {
  const absolute = originalPath(relative);
  const before = fs.statSync(absolute);
  if (!before.isFile()) throw new Error(`Original is no longer a regular file: ${relative}`);
  const bytes = fs.readFileSync(absolute);
  const after = fs.statSync(absolute);
  if (['dev', 'ino', 'size', 'mtimeMs', 'ctimeMs'].some((key) => before[key] !== after[key])) {
    throw new Error(`File changed during capture; retry when quiescent: ${relative}`);
  }
  return bytes;
}

function inventory() {
  const files = ['index.html', 'package.json'];
  function walk(relative) {
    const absolute = originalPath(relative);
    if (!fs.statSync(absolute).isDirectory()) throw new Error(`Not a directory: ${relative}`);
    const entries = fs.readdirSync(absolute, { withFileTypes: true });
    entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    for (const entry of entries) {
      const child = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (entry.isFile()) files.push(child);
      else throw new Error(`Unsupported file or symlink in source inventory: ${child}`);
    }
  }
  walk('src');
  walk('public');
  const locks = lockfiles.filter((name) => fs.existsSync(path.join(root, name)));
  if (!locks.length) throw new Error('No recognized lockfile found; refusing an incomplete baseline.');
  return [...files, ...locks].sort();
}

// Structural expression identities ignore comments/formatting/quote choice, not operators or names.
function ast(node, omitJsx = false) {
  if (ts.isParenthesizedExpression(node)) return ast(node.expression, omitJsx);
  if (omitJsx && (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) ||
      ts.isJsxFragment(node))) return ['JSX'];
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return ['string', node.text];
  }
  if (ts.isNumericLiteral(node)) return ['number', node.text];
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return ['identifier', node.text];
  if (ts.isJsxText(node)) return ['text', node.text.replace(/\s+/g, ' ').trim()];
  const children = [];
  ts.forEachChild(node, (child) => { children.push(ast(child, omitJsx)); });
  const result = [ts.SyntaxKind[node.kind], children];
  if (!children.length && typeof node.text === 'string') result.push(node.text);
  return result;
}

function extract(relative, text) {
  const source = ts.createSourceFile(relative, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (source.parseDiagnostics.length) {
    const diagnostic = source.parseDiagnostics[0];
    const at = source.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
    throw new Error(`${relative}:${at.line + 1}:${at.character + 1}: ${
      ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }
  const result = Object.fromEntries(categories.map((category) => [category, []]));
  const add = (category, node, scope, value) => {
    const at = source.getLineAndCharacterOfPosition(node.getStart(source));
    result[category].push({ scope, value, line: at.line + 1, column: at.character + 1 });
  };
  const tagName = (node) => node.tagName.getText(source).replace(/^(?:motion|m)\./, '');

  function visit(node, scope = 'module', property = '') {
    if (ts.isImportDeclaration(node) || ts.isImportEqualsDeclaration(node)) return;
    if (ts.isExportDeclaration(node)) {
      if (node.exportClause) visit(node.exportClause, scope, property);
      return;
    }
    if (ts.isImportTypeNode(node)) return;
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) return;

    if (ts.isFunctionDeclaration(node) && node.name) scope += `/function:${node.name.text}`;
    if (ts.isVariableDeclaration(node)) {
      scope += `/binding:${ts.isIdentifier(node.name) ? node.name.text : JSON.stringify(ast(node.name))}`;
    }
    if (ts.isPropertyAssignment(node)) {
      property += `/${ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)
        ? node.name.text : JSON.stringify(ast(node.name))}`;
    }

    if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(source);
      const owner = node.parent.parent;
      const motion = /^(?:motion|m)\./.test(owner.tagName.getText(source));
      if (skippedAttributes.has(name) || (motion && motionAttributes.has(name))) return;
      const initializer = node.initializer;
      const value = !initializer ? ['boolean', true]
        : ts.isJsxExpression(initializer) && initializer.expression ? ast(initializer.expression)
          : ast(initializer);
      add(/^on/i.test(name) ? 'handlers' : 'attributes', node, scope, [tagName(owner), name, value]);
      return;
    }
    if (ts.isJsxSpreadAttribute(node)) {
      add('attributes', node, scope, [tagName(node.parent.parent), '...', ast(node.expression)]);
      return;
    }
    if (ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, ' ').trim();
      if (value) add('jsxText', node, scope, value);
      return;
    }
    if (ts.isJsxExpression(node) && node.expression) {
      // JSX placeholders let wrappers change without freezing nested className/ref/motion props.
      add('expressions', node, scope, ast(node.expression, true));
    }
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        tagName(node) === 'Outlet') add('outlets', node, scope, 'Outlet');

    if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand) &&
        [ts.SyntaxKind.MinusToken, ts.SyntaxKind.PlusToken].includes(node.operator)) {
      add('literals', node, scope, [property, 'number', `${ts.tokenToString(node.operator)}${node.operand.text}`]);
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      add('literals', node, scope, [property, 'string', node.text]);
    } else if (ts.isNumericLiteral(node)) {
      add('literals', node, scope, [property, 'number', node.text]);
    } else if (ts.isTemplateExpression(node)) {
      add('literals', node, scope, [property, 'template', ast(node)]);
    }
    ts.forEachChild(node, (child) => { visit(child, scope, property); });
  }
  visit(source);
  return result;
}

function compareContent(relative, original, current) {
  const errors = [];
  for (const category of categories) {
    const scopes = [...new Set(original[category].map((entry) => entry.scope))];
    for (const scope of scopes) {
      const expected = original[category].filter((entry) => entry.scope === scope);
      const actual = current[category].filter((entry) => entry.scope === scope);
      let cursor = 0;
      for (let ordinal = 0; ordinal < expected.length; ordinal++) {
        const entry = expected[ordinal];
        const identity = JSON.stringify(entry.value);
        const match = actual.findIndex((candidate, index) =>
          index >= cursor && JSON.stringify(candidate.value) === identity);
        if (match === -1) {
          const next = actual[cursor];
          errors.push(`${relative}:${entry.line}:${entry.column} [original ${category} #${ordinal + 1}; ${scope}]\n` +
            `  Missing, changed, or reordered original token: ${identity}\n` +
            (next ? `  Current token at ${next.line}:${next.column}: ${JSON.stringify(next.value)}`
              : '  No remaining current token in this scope.'));
          break;
        }
        cursor = match + 1;
      }
    }
  }
  return errors;
}

function selfTest() {
  const sample = `import { Link } from 'router';
const navigation = [{ to: '/roadmap', label: 'Roadmap', count: 3, balance: -2 }];
const caption = \`Stage \${navigation[0].count}\`;
function Home() {
  return <section className="old" style={{ opacity: 0.5 }} ref={oldRef}>
    <Link to="/roadmap" aria-label="Learning path" onClick={() => select(1)}>
      Original heading
    </Link>
    <label htmlFor="email">Email address</label>
    <form id="enrol" role="form" action="/submit" method="post">
      <input name="email" type="email" required disabled={false} />
      <button {...buttonProps} aria-controls="panel">Continue</button>
    </form>
    <Icon size={14} />{site.tagline}<Outlet />
  </section>;
}`;
  const original = extract('fixture.tsx', sample);
  const changes = [
    [true, sample],
    [true, sample.replace('className="old"', 'className={active ? "new" : "other"}')],
    [true, sample.replace('opacity: 0.5', 'opacity: 1').replace('ref={oldRef}', 'ref={newRef}')],
    [true, sample.replace('size={14}', 'size={40}')],
    [true, sample.replace("'router'", "'different-router'")],
    [true, sample.replace('return <section', 'const motionHook = useMotion("new", 250); return <section')],
    [true, sample.replace('return <section', 'return <div><section').replace('</section>;', '</section></div>;')],
    [true, sample.replace('<section ', '<motion.section animate={{ opacity: 1 }} ').replace('</section>', '</motion.section>')],
    [true, sample.replace('Original heading', '\n Original   heading\n')],
    [true, sample.replace('select(1)', 'select( /* cosmetic */ 1 )')],
    [true, sample.replace('<Link ', '<span aria-hidden="true">Decoration</span><Link ')],
    [true, sample.replace('<Link ', '<button onClick={() => decorate()}>New</button><Link ')],
    [false, sample.replace('Original heading', 'Changed heading')],
    [false, sample.replace('Original heading', '')],
    [false, sample.replace('to="/roadmap"', 'to="/other"')],
    [false, sample.replace('aria-label="Learning path"', 'aria-label="Other"')],
    [false, sample.replace('aria-controls="panel"', 'aria-controls="other"')],
    [false, sample.replace('htmlFor="email"', 'htmlFor="other"')],
    [false, sample.replace('id="enrol"', 'id="other"')],
    [false, sample.replace('role="form"', 'role="none"')],
    [false, sample.replace('action="/submit"', 'action="/other"')],
    [false, sample.replace('method="post"', 'method="get"')],
    [false, sample.replace('disabled={false}', 'disabled={true}')],
    [false, sample.replace('onClick={() => select(1)}', 'onClick={() => select(2)}')],
    [false, sample.replace('onClick={() => select(1)}', '')],
    [false, sample.replace("label: 'Roadmap'", "label: 'Changed'")],
    [false, sample.replace('count: 3', 'count: 4')],
    [false, sample.replace('balance: -2', 'balance: 2')],
    [false, sample.replace('navigation[0].count', 'navigation[0].other')],
    [false, sample.replace('{site.tagline}', '{site.other}')],
    [false, sample.replace('{...buttonProps}', '{...otherProps}')],
    [false, sample.replace('<Outlet />', '')],
    [false, sample.replace('Email address', 'Continue').replace('>Continue</button>', '>Email address</button>')],
    [false, sample.replace('function Home()', 'function Renamed()')],
  ];
  changes.forEach(([shouldPass, changed], index) => {
    const errors = compareContent('fixture.tsx', original, extract('fixture.tsx', changed));
    assert.equal(errors.length === 0, shouldPass, `Extractor self-test ${index + 1}: ${errors.join('\n')}`);
  });
  assert.throws(() => extract('fixture.tsx', 'const broken = <div>'), /fixture\.tsx:/);
  return changes.length + 1;
}

function printScope(files) {
  const count = (mode) => files.filter((file) => file.mode === mode).length;
  console.log(`Originals: ${files.length}; TS/TSX: ${files.filter((file) => /\.tsx?$/.test(file.path)).length}; ` +
    `immutable SHA-256: ${count('immutable')}; AST-protected: ${count('presentation')}; CSS existence: ${count('css')}; ` +
    `public assets: ${files.filter((file) => file.path.startsWith('public/')).length}.`);
}

function printLimits() {
  console.log('Coverage: original src/public files, index.html, package.json and lockfiles; no original may disappear.');
  console.log('Home/Layout: ordered JSX text, functional attributes/spreads, handlers, dynamic JSX expressions, ' +
    'source string/template/numeric literals and router outlets, independently matched in named scopes.');
  console.log('Limits: additive tokens/wrappers/hooks are allowed; static subsequences do not prove behavior, ' +
    'reachability, rendered visibility, or visual/accessibility correctness. CSS content and new files are not validated.');
  console.log('Presentation attributes are excluded (className/style/ref, visual/SVG props, known motion props on motion.*); ' +
    'other existing hook literals are conservatively retained. JSX whitespace and expression formatting are normalized.');
  console.log('The local baseline detects accidental changes, not deliberate tampering by someone able to rewrite it.');
}

function main() {
  const command = process.argv[2];
  if (!['record', 'verify'].includes(command) || process.argv.length !== 3) {
    throw new Error('Usage: node tests/verify-preservation.mjs record|verify');
  }
  if (!fs.statSync(temporaryDirectory).isDirectory()) throw new Error('Approved temporary directory is unavailable.');
  const passedTests = selfTest();
  const checkerSha256 = sha256(fs.readFileSync(fileURLToPath(import.meta.url)));
  const utf8 = new TextDecoder('utf-8', { fatal: true });
  console.log(`Extractor self-tests: ${passedTests}/${passedTests} passed.`);

  if (command === 'record') {
    if (fs.existsSync(baselinePath)) throw new Error(`Refusing to overwrite original baseline: ${baselinePath}`);
    const paths = inventory();
    for (const relative of editable) assert(paths.includes(relative), `Required editable original missing: ${relative}`);
    const files = paths.map((relative) => {
      const bytes = readOriginal(relative);
      const mode = editable.includes(relative) ? 'presentation' : /\.css$/i.test(relative) ? 'css' : 'immutable';
      return {
        path: relative, mode, bytes: bytes.length, sha256: sha256(bytes),
        ...(mode === 'presentation' ? { content: extract(relative, utf8.decode(bytes)) } : {}),
      };
    });
    // Detect edits/removals during the multi-file baseline capture before committing it.
    assert.deepEqual(inventory(), paths, 'Inventory changed during capture; record only when quiescent.');
    for (const file of files) {
      assert.equal(sha256(readOriginal(file.path)), file.sha256, `${file.path} changed during baseline capture.`);
    }
    const baseline = {
      version: 1, root, recordedAt: new Date().toISOString(),
      typescriptVersion: ts.version, checkerSha256, policy, files,
    };
    const serialized = `${JSON.stringify(baseline, null, 2)}\n`;
    fs.writeFileSync(baselinePath, serialized, { flag: 'wx', mode: 0o600 });
    printScope(files);
    console.log(`Baseline: ${baselinePath}`);
    console.log(`Baseline SHA-256: ${sha256(serialized)}`);
    console.log('RECORDED. Run verify before accepting edits; record will not overwrite this baseline.');
    printLimits();
    return;
  }

  if (!fs.existsSync(baselinePath)) throw new Error(`Baseline missing; record originals first: ${baselinePath}`);
  const serialized = fs.readFileSync(baselinePath);
  const baseline = JSON.parse(utf8.decode(serialized));
  assert.equal(baseline.version, 1, 'Unsupported baseline version.');
  assert.equal(baseline.root, root, 'Baseline belongs to a different workspace.');
  assert.equal(baseline.typescriptVersion, ts.version, 'TypeScript version changed since record.');
  assert.equal(baseline.checkerSha256, checkerSha256, 'Checker changed since record; do not silently rebaseline.');
  assert.deepEqual(baseline.policy, policy, 'Preservation policy changed since record.');
  assert(Array.isArray(baseline.files) && baseline.files.length, 'Empty or invalid original inventory.');
  assert.equal(new Set(baseline.files.map((file) => file.path)).size, baseline.files.length, 'Duplicate original paths.');
  for (const relative of editable) {
    assert(baseline.files.some((file) => file.path === relative && file.mode === 'presentation'),
      `Missing AST baseline for ${relative}`);
  }
  const errors = [];
  let unchanged = 0;
  let cssChanged = 0;
  let checkedTokens = 0;
  for (const file of baseline.files) {
    try {
      const mode = editable.includes(file.path) ? 'presentation' : /\.css$/i.test(file.path) ? 'css' : 'immutable';
      assert.equal(file.mode, mode, `Invalid policy mode for ${file.path}`);
      const bytes = readOriginal(file.path);
      const currentSha256 = sha256(bytes);
      if (file.mode === 'immutable' && currentSha256 !== file.sha256) {
        errors.push(`${file.path}: immutable bytes changed\n  Expected SHA-256: ${file.sha256} (${file.bytes} bytes)\n` +
          `  Actual SHA-256:   ${currentSha256} (${bytes.length} bytes)`);
      } else if (currentSha256 === file.sha256) unchanged++;
      if (file.mode === 'css' && currentSha256 !== file.sha256) cssChanged++;
      if (file.mode === 'presentation') {
        const current = extract(file.path, utf8.decode(bytes));
        errors.push(...compareContent(file.path, file.content, current));
        const counts = categories.map((category) => `${category}=${file.content[category].length}`);
        checkedTokens += categories.reduce((sum, category) => sum + file.content[category].length, 0);
        console.log(`${file.path}: ${counts.join(', ')} original tokens checked.`);
      }
    } catch (error) {
      errors.push(`${file.path}: ${error.message}`);
    }
  }
  const originals = new Set(baseline.files.map((file) => file.path));
  const added = inventory().filter((relative) => !originals.has(relative));
  printScope(baseline.files);
  console.log(`Baseline: ${baselinePath}`);
  console.log(`Baseline SHA-256: ${sha256(serialized)}`);
  console.log(`Byte-identical originals: ${unchanged}/${baseline.files.length}; ` +
    `AST tokens checked: ${checkedTokens}; visually editable CSS changed: ${cssChanged}.`);
  console.log(`New unbaselined files: ${added.length}${added.length ? ` (${added.join(', ')})` : ''}.`);
  printLimits();
  if (errors.length) {
    for (const error of errors) console.error(`FAIL: ${error}`);
    throw new Error(`Preservation failed: ${errors.length} mismatched file/AST stream(s).`);
  }
  console.log('PASS: every original exists, all immutable SHA-256 checks match, and all protected AST subsequences survive.');
}

try {
  main();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}
