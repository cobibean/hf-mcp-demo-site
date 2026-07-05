import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const appRoot = process.cwd();
const sourceRoot = path.join(appRoot, "src");
const publicRoot = path.join(appRoot, "public");
const strict = process.argv.includes("--strict");
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".webmanifest",
]);
const binaryExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".ico", ".mp4"]);
const failures = [];

function walk(target, visitor) {
  if (!fs.existsSync(target)) {
    return;
  }

  const stat = fs.statSync(target);

  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) {
      walk(path.join(target, entry), visitor);
    }
    return;
  }

  visitor(target);
}

function readTextFile(file) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) {
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function collectTextFiles() {
  const files = [];
  const roots = [
    path.join(appRoot, "index.html"),
    sourceRoot,
    path.join(publicRoot, "site.webmanifest"),
    path.join(publicRoot, "favicon.svg"),
  ];

  for (const root of roots) {
    walk(root, (file) => {
      if (textExtensions.has(path.extname(file).toLowerCase())) {
        files.push(file);
      }
    });
  }

  return files;
}

function relative(file) {
  return path.relative(appRoot, file);
}

function fail(check, detail) {
  failures.push({ check, detail });
}

function scanText(check, pattern, files, allowLine = () => false) {
  for (const file of files) {
    const lines = readTextFile(file).split(/\r?\n/);
    lines.forEach((line, index) => {
      if (pattern.test(line) && !allowLine(line, file)) {
        fail(check, `${relative(file)}:${index + 1}: ${line.trim()}`);
      }
      pattern.lastIndex = 0;
    });
  }
}

function checkUnsafeBrowserGlobals() {
  const banned = new Set(["window", "document", "navigator", "localStorage"]);

  walk(sourceRoot, (file) => {
    if (!/\.(ts|tsx)$/.test(file) || file.includes(`${path.sep}generated${path.sep}`)) {
      return;
    }

    const source = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );

    function lineAndColumn(position) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(position);
      return `${line + 1}:${character + 1}`;
    }

    function visit(node) {
      if (ts.isIdentifier(node) && banned.has(node.text)) {
        const parent = node.parent;
        const safeGlobalThisProperty =
          ts.isPropertyAccessExpression(parent) &&
          parent.name === node &&
          parent.expression.getText(sourceFile) === "globalThis";
        const propertyNameOnly =
          ts.isPropertyAccessExpression(parent) && parent.name === node && !safeGlobalThisProperty;

        if (!safeGlobalThisProperty && !propertyNameOnly) {
          fail(
            "no SSR-unsafe browser globals",
            `${relative(file)}:${lineAndColumn(node.getStart(sourceFile))}: ${parent.getText(sourceFile).slice(0, 120)}`,
          );
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  });
}

function checkEveryPublicAssetUsed(files) {
  const haystack = files.map((file) => readTextFile(file)).join("\n");
  const unused = [];

  walk(publicRoot, (file) => {
    if (!fs.statSync(file).isFile()) {
      return;
    }

    const publicPath = `/${path.relative(publicRoot, file).replaceAll(path.sep, "/")}`;
    const basename = path.basename(publicPath);
    const isHeroFrame =
      publicPath.startsWith("/assets/frames/hero/window-") && publicPath.endsWith(".webp");
    const used = haystack.includes(publicPath) || haystack.includes(basename) || isHeroFrame;

    if (!used) {
      unused.push(publicPath);
    }
  });

  if (unused.length > 0) {
    fail("every app/public asset is used", unused.join(", "));
  }
}

function checkHeroAssetVisible(files) {
  const haystack = files.map((file) => readTextFile(file)).join("\n");
  const firstFrame = path.join(publicRoot, "assets/frames/hero/window-000.webp");
  const hasCanvas = haystack.includes("hero-sequence-canvas");
  const hasFramePath = haystack.includes("framePath(0)") || haystack.includes("framePath:");

  if (!fs.existsSync(firstFrame) || !hasCanvas || !hasFramePath) {
    fail(
      "generated hero asset is visible",
      "Expected first hero frame, hero canvas, and hero framePath references.",
    );
  }
}

const textFiles = collectTextFiles();

scanText(
  "no placeholders",
  /\b(placeholder|lorem|ipsum|todo|fixme|replace me|dummy|sample)\b/i,
  textFiles,
);
scanText("no visible em dashes or en dashes", /[—–]/, textFiles);
scanText("no h-screen", /\bh-screen\b/, textFiles);
scanText("no Higgsfield branding in public website content", /higgs(field)?/i, textFiles);
scanText("no repeated generic CTA class", /className="cta"|\bclass="cta"|\.cta(?:\s|\{|,|:)/, textFiles);
scanText(
  "no opacity-zero viewport-gated sections",
  /opacity:\s*0(?:\s*[;}])|visibility:\s*hidden|autoAlpha|IntersectionObserver|whileInView/,
  textFiles,
);
checkUnsafeBrowserGlobals();

const reducedMotionEvidence =
  textFiles.some((file) => readTextFile(file).includes("prefers-reduced-motion")) &&
  textFiles.some((file) => readTextFile(file).includes("matchMedia(\"(prefers-reduced-motion: reduce)\""));

if (!reducedMotionEvidence) {
  fail("reduced-motion coverage exists", "Expected CSS media query and JS matchMedia coverage.");
}

checkEveryPublicAssetUsed(textFiles);
checkHeroAssetVisible(textFiles);

if (failures.length > 0) {
  console.error(`qa:fill failed${strict ? " in strict mode" : ""}`);
  for (const failure of failures) {
    console.error(`- ${failure.check}: ${failure.detail}`);
  }
  process.exit(1);
}

console.log(`qa:fill passed${strict ? " in strict mode" : ""}`);
