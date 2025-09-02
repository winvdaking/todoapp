# 🚀 To-Do App Moderne

Une application To-Do complète et moderne construite avec **Next.js 14** (app router) et **Laravel 11**, intégrant TailwindCSS, shadcn/ui et Framer Motion pour une expérience utilisateur exceptionnelle.

## ✨ Fonctionnalités

- ✅ **Interface moderne** avec TailwindCSS et shadcn/ui
- 🌙 **Support du dark mode** automatique
- 🎯 **Drag & Drop** pour réorganiser les tâches
- 🎭 **Animations fluides** avec Framer Motion
- 🔄 **CRUD complet** via API Laravel
- 📱 **Responsive design** pour tous les appareils
- 🚀 **Performance optimisée** avec Next.js 14

## 🏗️ Architecture

```
todoapp/
├── frontend/          # Next.js 14 (app router)
│   ├── app/          # App router pages
│   ├── components/   # Composants shadcn/ui
│   └── lib/          # Utilitaires et configurations
├── backend/           # Laravel 11 API
│   ├── app/          # Modèles et contrôleurs
│   ├── database/     # Migrations et seeders
│   └── routes/       # Routes API
└── README.md          # Ce fichier
```

## 🚀 Installation Rapide

### Prérequis
- PHP 8.2+
- Composer
- Node.js 18+
- npm ou yarn

### 1. Backend Laravel

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

L'API sera disponible sur `http://localhost:8000`

### 2. Frontend Next.js

```bash
cd frontend
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📚 Documentation Détaillée

### Backend Laravel

#### Routes API
- `GET /api/tasks` - Récupérer toutes les tâches
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/{id}` - Modifier une tâche
- `DELETE /api/tasks/{id}` - Supprimer une tâche

#### Base de données
- SQLite par défaut (facile à déployer)
- Migration automatique des tables
- Support MySQL/PostgreSQL configurable

### Frontend Next.js

#### Technologies
- **Next.js 14** avec app router
- **TailwindCSS** pour le styling
- **shadcn/ui** pour les composants
- **Framer Motion** pour les animations
- **TypeScript** pour la sécurité des types

#### Composants principaux
- `TaskList` - Liste des tâches avec drag & drop
- `TaskItem` - Item de tâche individuel
- `AddTask` - Formulaire d'ajout
- `TaskFilters` - Filtres (toutes/actives/terminées)

## 🎨 Personnalisation

### Thèmes
- Mode clair/sombre automatique
- Variables CSS personnalisables
- Composants shadcn/ui thématisables

### Animations
- Transitions fluides entre états
- Animations d'entrée/sortie des tâches
- Feedback visuel pour les actions

## 🚀 Déploiement

### Backend
- Compatible avec Laravel Forge, Vercel, Railway
- Variables d'environnement configurables
- CORS configuré pour la production

### Frontend
- Optimisé pour Vercel
- Build statique possible
- Variables d'environnement pour l'API

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Laravel](https://laravel.com/) - Framework PHP
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

**Développé avec ❤️ en utilisant les meilleures technologies modernes**
