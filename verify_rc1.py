import json, hashlib
from pathlib import Path
MANIFEST = Path("MAGCORE_SP01_RC1/3. Proof/manifest.json")
def sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()
if not MANIFEST.exists():
    print(f"ERREUR: {MANIFEST} introuvable")
    exit(1)
data = json.loads(MANIFEST.read_text(encoding="utf-8"))
ok = ko = 0
for entry in data.get("files", []):
    path = Path(entry["path"])
    expected = entry["sha256"]
    if not path.exists():
        print(f"KO MANQUANT: {path}")
        ko += 1
        continue
    actual = sha256_file(path)
    if actual == expected:
        print(f"OK {path}")
        ok += 1
    else:
        print(f"KO MODIFIE: {path}")
        ko += 1
print(f"--- RESUME --- OK: {ok} | KO: {ko}")
print("VERDICT: OK" if ko == 0 else "VERDICT: KO")
