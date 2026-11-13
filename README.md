# Nexora One — Unified Multi-Platform Ecosystem Workstation

> **"One Nexora. Everything Connected."**  
> Unified native mobile & desktop application merging all five original Nexora Technologies portals into a single, cohesive, high-performance application running seamlessly on **Android**, **iOS**, and **Desktop**.

---

## 🚀 Unified Portals Suite

Nexora One collects and consolidates the 5 standalone portal sites into one unified super-application with full local-first offline resilience, instant in-app navigation, and cloud synchronization:

| Portal | Original Directory | Key Capabilities Integrated |
|---|---|---|
| **Nexora Connect** | `D:\nexora connect` | Real-time & offline team collaboration, attendance punch clock & QR verification, corporate broadcasts, scheduled meetings, live tech webinars, IT/HR support ticketing, knowledge base wiki, and stress-relief mini games. |
| **Nexora Technologies Showcase** | `D:\nexora` | Flagship corporate presentation with ambient enterprise styling, 4 core engineering pillars (Autonomous AI, Full-Stack Native, Cloud/DevOps, High-Throughput Data), interactive color dashboards, client case studies, executive architects portfolio, and instant project cost calculator. |
| **Daily Progress (DPR)** | `D:\daily progress nexora` | Daily work logging with dynamic task list, blockers tracking, next-day planning, session hours timer, calendar submission history, compliance metrics, and instant PDF/CSV audit report exporter. |
| **PRDAMS Portal** | `D:\Acknowledgement generator` | Project Role & Digital Acknowledgement Management System: live certificate generator, official Nexora seal, cryptographic SHA-256 verification hash, QR code generator, verification scanner, and digital signature canvas pad for role agreements. |
| **Internship Academy** | `D:\internship porta` | Complete 4-track curriculum explorer, student assignment submission portal with GitHub/Demo link validation, mentor review & grading queue with score slider and constructive feedback, cohort administration stats, and official internship completion certificate preview. |

---

## 📱 Cross-Platform Architecture

### 1. 🤖 Android (Native APK via Capacitor 8)
- Native Android Gradle project in `android/`.
- Capacitor native bridge connecting web assets to Android WebView with hardware acceleration.
- Native splash screen and safe-area insets.
- Build command:
  ```bash
  npm run cap:android
  # or build APK directly:
  cd android && .\gradlew.bat assembleDebug
  ```

### 2. 🍎 iOS (Xcode & Swift Package via Capacitor)
- Native Xcode workspace in `ios/App/App.xcodeproj`.
- Swift Package Manager integration with CocoaPods compatibility.
- iOS safe-area padding and gesture navigation.
- Build command:
  ```bash
  npm run cap:ios
  npx cap open ios
  ```

### 3. 💻 Desktop (Windows, macOS, Linux)
- **Electron Native Desktop App**: Runs as a desktop executable window with hardware integration, auto-hidden menu bar, and external link handling.
  ```bash
  npm run desktop
  ```
- **Adaptive Desktop Workstation Mode**: Fluid full-screen responsive layout with left expandable navigation sidebar, quick portal switcher, and theme settings.
- **PWA (Progressive Web App)**: Installable directly from Chrome, Edge, and Brave browsers as a standalone desktop app with service worker offline caching.

---

## ⌨️ Desktop Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Alt + 1` | Direct jump to **Nexora Connect** |
| `Alt + 2` | Direct jump to **Nexora Showcase** |
| `Alt + 3` | Direct jump to **Daily Progress (DPR)** |
| `Alt + 4` | Direct jump to **PRDAMS Portal** |
| `Alt + 5` | Direct jump to **Internship Academy** |
| `Alt + 0` / `Esc` | Return to Central Workspace Hub |
| `Esc` | Close active modals, calendar, or calculator overlays |

---

## 🛠️ Development & Build Commands

```bash
# Run web development server with hot-reload
npm run dev

# Compile TypeScript and build production bundle with PWA assets
npm run build

# Launch native Electron desktop application
npm run desktop

# Synchronize web assets to native Android & iOS platforms
npm run cap:sync

# Synchronize specifically to Android
npm run cap:android

# Synchronize specifically to iOS
npm run cap:ios
```

---

## 📁 Project Structure

```
D:\Nexora one\
├── android\                    # Native Android Gradle Platform
├── ios\                        # Native iOS Xcode Platform
├── electron\
│   ├── main.cjs                # Electron desktop window process
│   └── preload.cjs             # Context isolation bridge
├── public\                     # PWA icons, manifest, and logos
├── src\
│   ├── assets\                 # Corporate logos and brand artwork
│   ├── components\
│   │   ├── BottomNavigation.tsx# Mobile bottom navigation bar
│   │   ├── DesktopSidebar.tsx  # Desktop workstation sidebar
│   │   ├── CalendarTool.tsx    # Offline calendar tool
│   │   ├── CalculatorTool.tsx  # Offline office calculator
│   │   ├── SplashScreen.tsx    # Native loading screen
│   │   └── ...
│   ├── config\
│   │   └── applications.ts     # Ecosystem registry & portal routing
│   ├── portals\
│   │   ├── PortalWrapper.tsx   # Universal top bar and action frame
│   │   ├── NexoraConnectPortal.tsx # Portal 1: Team & attendance hub
│   │   ├── NexoraShowcasePortal.tsx# Portal 2: Flagship corporate site
│   │   ├── DailyProgressPortal.tsx # Portal 3: Daily progress & reports
│   │   ├── PrdamsPortal.tsx    # Portal 4: Credential & role generator
│   │   └── InternshipPortal.tsx# Portal 5: EdTech & mentor grading
│   ├── utils\
│   │   ├── portalStorage.ts    # Offline storage & state management
│   │   └── storage.ts          # Theme & user preference cache
│   ├── pages\
│   │   ├── Home.tsx            # Central ecosystem command deck
│   │   ├── Apps.tsx            # Full catalog & search
│   │   ├── Favorites.tsx       # Pinned quick access
│   │   ├── Settings.tsx        # Multi-platform preferences
│   │   └── About.tsx           # Nexora One architecture overview
│   ├── App.tsx                 # Root router and adaptive frame
│   └── main.tsx                # React 19 entry point
├── capacitor.config.ts         # Capacitor multi-platform configuration
├── package.json
└── vite.config.ts              # Vite & PWA configuration
```

© 2026 Nexora Technologies. All rights reserved.
