import os
import requests

API_KEY = os.getenv("MDC_API_KEY")
DATASET_ID = os.getenv("DATASET_ID", "common-voice-corpus-22")  # Remplacez par votre ID par défaut
OUTPUT_DIR = "./data"
BASE_URL = "https://mozilladatacollective.com/api"

if not API_KEY:
    raise ValueError("Erreur : La variable MDC_API_KEY est manquante.")

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Demande du lien pour le dataset : {DATASET_ID}")
    res = requests.post(f"{BASE_URL}/datasets/{DATASET_ID}/download", headers=headers)
    
    if res.status_code == 403:
        raise PermissionError("Erreur 403 : Validez d'abord les conditions du dataset sur l'interface MDC.")
    elif res.status_code != 200:
        raise RuntimeError(f"Erreur API ({res.status_code}): {res.text}")

    data = res.json()
    download_url = data["downloadUrl"]
    filename = data.get("filename", f"{DATASET_ID}.tar.gz")
    filepath = os.path.join(OUTPUT_DIR, filename)

    print(f"Téléchargement en cours vers : {filepath}")
    with requests.get(download_url, stream=True) as r:
        r.raise_for_status()
        with open(filepath, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
                
    print(f"Téléchargement terminé avec succès !")

if __name__ == "__main__":
    main()
