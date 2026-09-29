
name: MAG ATLAS Proof Engine RC1 - 2 FILES ONLY
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  proof:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: ATLAS PROOF - hashes + manifest + verify + zip
        run: |
          python3 - << 'PY'
          import hashlib, os, json, zipfile
          from pathlib import Path
          from datetime import datetime, timezone
          ROOT = Path("MAGCORE_SP01_RC1")
          PROOF = ROOT / "3. Proof"
          PROOF.mkdir(parents=True, exist_ok=True)
          # 1. hashes.txt
          files=[]
          if ROOT.exists():
            for dp,_,fns in os.walk(ROOT):
              for n in fns:
                if n=="hashes.txt": continue
                files.append(Path(dp)/n)
          files=sorted(files, key=lambda x: str(x).lower())
          hashes_path=PROOF/"hashes.txt"
          with open(hashes_path,"w",encoding="utf-8") as out:
            for p in files:
              h=hashlib.sha256()
              with p.open("rb") as f:
                for ch in iter(lambda: f.read(8192), b""): h.update(ch)
              out.write(f"{h.hexdigest()} {p.as_posix()}\n")
              print(f"OK {p}")
          print(f"hashes.txt -> {len(files)} fichiers")
          # 2. manifest.json
          fl=[]
          if hashes_path.exists():
            for line in hashes_path.read_text(encoding="utf-8").splitlines():
              if not line.strip(): continue
              sha,pth=line.strip().split(" ",1)
              pp=Path(pth)
              st=pp.stat() if pp.exists() else None
              fl.append({"path":pth,"size_bytes":st.st_size if st else 0,"sha256":sha,"modified_utc":datetime.fromtimestamp(st.st_mtime,tz=timezone.utc).isoformat() if st else ""})
          manifest={"project":"MAGCORE_SP01_RC1","version":"V0.1 DEV","operator":"Jean-Christophe Achille","doctrine":"LE FUTUR SE CONSTRUIT DANS L'INVISIBLE","created_utc":datetime.now(timezone.utc).isoformat(),"source_timestamp_declared":"2026-09-29T12:19+02:00","status":"PACKAGE RC1 - proof via SHA-256","files":fl}
          (PROOF/"manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False),encoding="utf-8")
          print(f"manifest.json -> {len(fl)} fichiers")
          # 3. verify
          ok=ko=0
          for e in fl:
            p=Path(e["path"])
            if not p.exists():
              print(f"KO MANQUANT {p}"); ko+=1; continue
            h=hashlib.sha256()
            with p.open("rb") as f:
              for ch in iter(lambda: f.read(8192), b""): h.update(ch)
            if h.hexdigest()==e["sha256"]: ok+=1
            else: print(f"KO MODIFIE {p}"); ko+=1
          print(f"VERIFY OK:{ok} KO:{ko} -> {'OK' if ko==0 else 'KO'}")
          # 4. zip + sha256
          zp=Path("MAGCORE_SP01_RC1_proofpack.zip")
          with zipfile.ZipFile(zp,"w",zipfile.ZIP_DEFLATED) as z:
            for p in ROOT.rglob("*"):
              if p.is_file(): z.write(p)
          sh=hashlib.sha256(zp.read_bytes()).hexdigest()
          Path("MAGCORE_SP01_RC1_proofpack.sha256").write_text(f"{sh} {zp.name}\n")
          print(f"ZIP SHA256: {sh}")
          PY
      - uses: actions/upload-artifact@v4
        with:
          name: proofpack-rc1
          path: |
            MAGCORE_SP01_RC1/3. Proof/hashes.txt
            MAGCORE_SP01_RC1/3. Proof/manifest.json
            MAGCORE_SP01_RC1_proofpack.zip
            MAGCORE_SP01_RC1_proofpack.sha256s
