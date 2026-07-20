"""Static check: does any module reference an exported symbol it never imports?

Catches latent breakage in code paths the browser test did not exercise.
"""
import io, re, glob

files = sorted(p.replace('\\', '/') for p in glob.glob('src/**/*.js', recursive=True))

exports = {}
for f in files:
    s = io.open(f, encoding='utf8').read()
    ns = set(re.findall(r'^export (?:function|const|let)\s+([A-Za-z_$][\w$]*)', s, re.M))
    # dom.js exports `$` and `$$`, which the identifier regex above skips
    ns |= {m for m in re.findall(r'^export const (\$\$?)\s*=', s, re.M)}
    exports[f] = ns

owner = {}
for f, ns in exports.items():
    for n in ns:
        owner[n] = f

problems = []
for f in files:
    s = io.open(f, encoding='utf8').read()
    imported = set()
    for m in re.finditer(r'import\s*\{([^}]*)\}\s*from', s):
        imported |= {x.strip() for x in m.group(1).split(',') if x.strip()}
    body = re.sub(r'^import .*$', '', s, flags=re.M)
    for sym, src in owner.items():
        if src == f or sym in exports[f] or sym in imported:
            continue
        if sym == '$':
            pat = r'(?<![\w$])\$\('
        elif sym == '$$':
            pat = r'(?<![\w$])\$\$\('
        else:
            pat = r'(?<![\w$.])' + re.escape(sym) + r'\b'
        if re.search(pat, body):
            problems.append((f, sym, src))

print('files scanned:', len(files))
print('MISSING IMPORTS:', len(problems))
for f, sym, src in problems:
    print('  %-30s uses %-26s (exported by %s)' % (f, sym, src))
