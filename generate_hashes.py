import hashlib, os
from pathlib import Path
ROOT = Path("MAGCORE_SP01_RC1")
OUTPUT = ROOT / "3. Proof" / "hashes.txt"
def sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()
if not ROOT.exists():
    print(f"ERREUR: {ROOT} introuvable")
    exit(1)
files = []
for dirpath, _, filenames in os.walk(ROOT):
    for name in filenames:
        if name == "hashes.txt": continue
        files.append(Path(dirpath) / name)
files_sorted = sorted(files, key=lambda x: str(x).lower())
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
with open(OUTPUT, "w", encoding="utf-8") as out:
    for rel in files_sorted:
        hv = sha256_file(rel)
        out.write(f"{hv} {rel.as_posix()}\n")
        print(f"OK {rel}")
print(f"Fait: {OUTPUT}")s
