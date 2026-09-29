import json
from pathlib import Path
from datetime import datetime, timezone
ROOT = Path("MAGCORE_SP01_RC1")
HASHES_FILE = ROOT / "3. Proof" / "hashes.txt"
OUTPUT = ROOT / "3. Proof" / "manifest.json"
files_list = []
if HASHES_FILE.exists():
    with open(HASHES_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip(): continue
            sha, path = line.strip().split(" ", 1)
            p = Path(path)
            stat = p.stat() if p.exists() else None
            files_list.append({
                "path": path,
                "size_bytes": stat.st_size if stat else 0,
                "sha256": sha,
                "modified_utc": datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).isoformat() if stat else ""
            })
manifest = {
    "project": "MAGCORE_SP01_RC1",
    "version": "V0.1 DEV",
    "operator": "Jean-Christophe Achille",
    "doctrine": "LE FUTUR SE CONSTRUIT DANS L'INVISIBLE",
    "created_utc": datetime.now(timezone.utc).isoformat(),
    "source_timestamp_declared": "2026-09-29T12:19+02:00",
    "status": "PACKAGE RC1 STRUCTURE - preuve SHA-256 voir hashes.txt",
    "files": files_list
}
with open(OUTPUT, "w", encoding="utf-8") as out:
    json.dump(manifest, out, indent=2, ensure_ascii=False)
print(f"manifest.json genere: {len(files_list)} fichiers")
