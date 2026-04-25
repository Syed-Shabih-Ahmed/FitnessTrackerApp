# 💪 Fitness Tracker App
### SMI University - Assignment 01 | Mobile Application Development

---

## 📋 Overview

A sleek Expo/React Native fitness tracker that helps users manage and complete their daily workouts.

---

## ✅ Features Implemented

### Required Screens
| Screen | Description |
|--------|-------------|
| **Home Screen** | Displays a searchable, filterable list of exercises |
| **Exercise Detail Screen** | Shows emoji icon, description, muscle groups, tips |
| **Add Exercise Screen** | Form to create custom exercises with emoji/color picker |

### Optional Features (Bonus)
| Feature | Description |
|---------|-------------|
| **Completed Screen** | Track and manage completed exercises with calorie summary |
| **Quotes Screen** | Motivational quotes fetched from public API (quotable.io) with fallback |

---

## 🛠 Setup & Run

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS/Android)

### Installation

```bash
# 1. Navigate to project folder
cd FitnessTrackerApp

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start

# 4. Scan the QR code with Expo Go app
```

---

## 📁 Project Structure

```
FitnessTrackerApp/
├── App.js                          # Entry point, navigation setup
├── app.json                        # Expo config
├── package.json
└── src/
    ├── context/
    │   └── ExerciseContext.js      # Global state (exercises, completed)
    ├── data/
    │   └── exercises.js            # Default exercises & quotes data
    └── screens/
        ├── HomeScreen.js           # Exercise list with search & filter
        ├── ExerciseDetailScreen.js # Detail view with complete toggle
        ├── AddExerciseScreen.js    # Custom exercise form
        ├── CompletedScreen.js      # Completed exercises tracker
        └── QuotesScreen.js         # Motivational quotes (API + local)
```

---

## 🎨 Design Highlights

- **Dark Theme** — Deep black backgrounds with vibrant accent colors
- **Color-coded exercises** — Each exercise has a unique color identity
- **Progress tracking** — Visual progress bar on the home screen
- **Category filtering** — Filter by Strength, Cardio, Legs, Core
- **Search** — Real-time search across exercise names
- **Custom exercises** — Full form with emoji picker, color picker, difficulty levels

---

## 📦 Dependencies

```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "react-native-screens": "~3.x",
  "react-native-safe-area-context": "4.x",
  "react-native-gesture-handler": "~2.x",
  "expo": "~51.0.0"
}
```

---

## 📱 Screenshots Preview

| Home | Detail | Add Exercise |
|------|--------|--------------|
| Exercise list with search, categories, progress bar | Full details with muscle groups, tips, complete button | Form with emoji/color picker, category, difficulty |

---

*Built with Expo + React Native for SMI University Assignment 01*
