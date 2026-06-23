# Oudiamora - Guide d'Installation et Déploiement du Chatbot

## 📦 Installation locale

### Prérequis
- Python 3.8+
- pip (gestionnaire de paquets Python)
- Git

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/Link4dev/oudiamora.git
cd oudiamora
```

2. **Créer un environnement virtuel (recommandé)**
```bash
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
```

3. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

4. **Servir localement**
```bash
mkdocs serve
```

L'application sera disponible à `http://localhost:8000`

5. **Tester le chatbot**
- Accédez à `http://localhost:8000`
- Cliquez sur l'icône de chat en bas à droite
- Posez une question pour tester

## 🚀 Déploiement automatique avec GitHub Pages

### Configuration

Le projet est configuré pour se déployer automatiquement sur GitHub Pages à chaque push sur la branche `main`.

#### Workflow GitHub Actions
- **Fichier**: `.github/workflows/deploy-mkdocs.yml`
- **Déclencheur**: Push sur `main`
- **Étapes**:
  1. Récupère le code
  2. Configure Python
  3. Installe les dépendances
  4. Construit le site MkDocs
  5. Déploie sur GitHub Pages

### Premier déploiement

1. **Activer GitHub Pages**
   - Allez dans Settings > Pages
   - Source: GitHub Actions
   - Cliquez sur Save

2. **Pousser vers main**
```bash
git add .
git commit -m "Deploy chatbot integration"
git push origin main
```

3. **Vérifier le déploiement**
   - Allez dans Actions pour voir le workflow en cours
   - Accédez à `https://link4dev.github.io/oudiamora/` une fois terminé

## 📋 Structure des fichiers

```
oudiamora/
├── mkdocs.yml              # Configuration MkDocs
├── requirements.txt        # Dépendances Python
├── docs/
│   ├── index.md           # Page d'accueil
│   ├── chatbot-guide.md   # Guide d'utilisation du chatbot
│   ├── chatbot-config.yml # Configuration FAQ du chatbot
│   └── [autres pages]     # Pages de contenu
├── .github/
│   └── workflows/
│       └── deploy-mkdocs.yml  # Workflow GitHub Actions
└── site/                  # Dossier généré (build)
```

## 🔧 Maintenance

### Ajouter de nouvelles questions FAQ

Modifiez `docs/chatbot-config.yml`:
```yaml
- question: "Ma nouvelle question ?"
  answer: "La réponse correspondante"
```

### Mettre à jour le contenu

1. Modifiez les fichiers `.md` dans le dossier `docs/`
2. Committez vos changements
3. Poussez vers `main`
4. Le workflow GitHub Actions se déclenche automatiquement

### Construire le site manuellement

```bash
mkdocs build
```

Les fichiers générés seront dans le dossier `site/`

## 📊 Monitoring

- **Actions tab**: https://github.com/Link4dev/oudiamora/actions
- **Pages settings**: https://github.com/Link4dev/oudiamora/settings/pages
- **Site live**: https://link4dev.github.io/oudiamora/

## 🐛 Troubleshooting

### Le chatbot n'apparaît pas
- Videz le cache du navigateur
- Vérifiez que `mkdocs-chatbot` est installé: `pip install mkdocs-chatbot`
- Vérifiez les logs: `mkdocs serve`

### Le déploiement échoue
- Vérifiez les logs dans GitHub Actions
- Assurez-vous que `requirements.txt` est à jour
- Vérifiez les permissions de GitHub Pages

### Erreurs de build
```bash
mkdocs build --verbose
```

## 📞 Support

Pour toute question ou problème, consultez :
- [Documentation MkDocs](https://www.mkdocs.org/)
- [Thème Material](https://squidfunk.github.io/mkdocs-material/)
- Page Contact d'Oudiamora
