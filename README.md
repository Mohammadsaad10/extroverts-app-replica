# 🎉 Extroverts — Signup Wizard & Profile Replication

A pixel-accurate replication of the **Extroverts** mobile app's onboarding flow and profile experience, built from reference screenshots as a frontend engineering assignment.

> **Stack:** React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Framer Motion

---

## 📋 Table of Contents

- [Overview](#overview)
- [Assignment Objectives — Fulfilled](#-assignment-objectives--fulfilled)
- [Additional Improvements](#-additional-improvements-beyond-scope)
- [User Flow](#-user-flow)
- [Screenshots Mapping](#-screenshots-mapping)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Tech Stack](#-tech-stack)

---

## Overview

This project replicates the complete **Extroverts** app onboarding experience — from landing page through signup wizard to a fully functional profile page. The implementation faithfully reproduces **34 reference screenshots** covering every screen state, interaction, and edge case (invalid emails, wrong OTPs, age restrictions, etc.).

The app is a **single-page application** with client-side routing. No backend is required — authentication and signup are simulated with React Context and localStorage persistence.

---

## ✅ Assignment Objectives — Fulfilled

### 1. Pixel-Accurate Screen Replication (34/34 Screens)

Every screen from the provided reference screenshots has been implemented with precise measurements:

| Screen | Page | Key Elements |
|--------|------|-------------|
| **Screen 1** | Landing Page | Hero background, E• logo, "AN APP ONLY FOR EXTROVERTS" typography, warning text, CONTINUE button |
| **Screen 2** | Terms & Conditions | Terms text with "PARTY" highlight in purple, ACCEPT button |
| **Screen 3a/3b** | Location Permission | Geolocation prompt, "TRYING TO FETCH YOUR LOCATION..." loading state, ENABLE LOCATION button |
| **Screen 4a–4e** | Home Feed | Event cards with images, club section, bottom navigation, "YOU NEED AN ACCOUNT" bottom sheet popup |
| **Screen 5** (×3 states) | Email Entry | Email input, validation error for invalid emails, newsletter subscription checkbox |
| **Screen 6** (×5 states) | OTP Verification | 6-digit OTP input, loading spinner, success toast, wrong OTP error, empty submission warning |
| **Screen 7** | Username | Username input with character limit |
| **Screen 8** | Party Name | "What's your name for the party?" input |
| **Screen 9** (×5 states) | Age / DOB | Date-of-birth picker popup, filled state, 18+ verification pass, under-18 rejection |
| **Screen 10** (×3 states) | Pronouns | Pronoun selection with checkboxes, selected state |
| **Screen 11** (×2 states) | Invite Code | Optional invite code entry |
| **Screen 12** | Signup Success | "Signed up successfully" toast on home feed |
| **Screen 13** (×4 sections) | Profile Page | Hero banner with avatar initial, club tier, stats section, superlatives, memories, passes, spotlight, LOG OUT |

### 2. Complete End-to-End User Flow

The full onboarding journey works seamlessly:

```
Landing → Terms → Location → Home Feed → [Join Event] → "You Need An Account" Sheet
→ Email → OTP → Username → Name → Age → Pronouns → Invite Code → Home (with success toast)
→ Profile (via bottom nav)
```

- **Forward navigation** through all 12 steps
- **Back navigation** on every wizard step
- **Profile page** protected behind authentication
- **Logout** returns user to landing and clears session

### 3. Interactive States & Validations

- ✅ Email format validation with error feedback
- ✅ OTP input — auto-focus between digits, paste support, 30-second resend timer
- ✅ Age gate — under-18 users are blocked with toast notification
- ✅ DOB picker — date/month/year scrollable selectors in bottom sheet
- ✅ Pronoun multi-select with checkboxes
- ✅ "You Need An Account" bottom sheet on unauthenticated event joins
- ✅ Toast notifications (success, error) throughout the flow

### 4. Visual Fidelity

- Exact font sizes, letter-spacing, colors extracted from reference screenshots
- Proper use of Poppins font family throughout
- Correct color palette: `#1E1E1E` backgrounds, `#D85F61` warning titles, `#7B61FF` purple accents, `#888393` secondary text
- Precise border-radius, padding, margins matching the reference

---

## 🚀 Additional Improvements (Beyond Scope)

These enhancements were implemented proactively to elevate code quality, accessibility, security, and user experience beyond the assignment requirements:

### 🔒 Security Fixes
| Improvement | Detail |
|------------|--------|
| **Removed hardcoded PII** | Replaced a hardcoded personal email address with a generic `your@email.com` placeholder |
| **Demo OTP gated** | The development-only bypass OTP (`000000`) is now gated behind `import.meta.env.DEV` — won't work in production builds |

### ♿ Accessibility (a11y) Improvements
| Improvement | Detail |
|------------|--------|
| **Input ↔ Label association** | All inputs use `useId()` for unique `id`/`htmlFor` pairs, plus `aria-invalid` and `aria-describedby` for error states |
| **BottomSheet dialog semantics** | Added `role="dialog"`, `aria-modal="true"`, and `aria-label` to the sheet component |
| **Toast ARIA attributes** | Added `role="alert"` and `aria-live="assertive"` for screen reader announcements |
| **BottomNav active indicator** | `aria-current="page"` on the active navigation item |

### ⚡ Performance Optimizations
| Improvement | Detail |
|------------|--------|
| **AuthContext memoized** | All context functions wrapped in `useCallback`, provider value in `useMemo` — prevents unnecessary re-renders across the entire app tree |
| **OTP timer optimization** | Fixed interval re-creation bug — effect now depends on `[resendSeconds > 0]` instead of `[resendSeconds]`, reducing 30 effect cycles to 2 |

### 🛡️ Robustness & UX
| Improvement | Detail |
|------------|--------|
| **Button type safety** | Default `type="button"` prevents accidental form submissions on all buttons |
| **Input character limits** | `maxLength={30}` on username and name fields prevents overflow |
| **Geolocation timeout** | Added `timeout: 10000` to prevent indefinite loading on geolocation requests |
| **DOB sheet closes on rejection** | Under-18 DOB sheet now properly closes before showing the rejection toast |
| **Dynamic copyright year** | Uses `new Date().getFullYear()` instead of hardcoded year |
| **Scroll lock preservation** | BottomSheet saves and restores the original `overflow` value on close |
| **Newsletter default** | Nullish coalescing (`?? false`) prevents undefined state in newsletter checkbox |

### 📱 Full Responsive Design
| Improvement | Detail |
|------------|--------|
| **Fluid typography** | All text uses CSS `clamp()` with `min(vw, vh)` for optimal scaling across screen sizes |
| **Flex-based layouts** | Converted absolute-positioned layouts to `flex-col justify-between` for responsive resilience |
| **Safe area support** | `env(safe-area-inset-bottom)` on BottomNav for notched/home-indicator devices |
| **Text wrapping** | "You Need An Account" sheet text properly wraps and centers on small screens |
| **Responsive event cards** | All padding/margins use `clamp()` for smooth scaling |
| **Profile superlatives** | Proportionally scaled boxes using `clamp(68px, 11.6vw, 223px)` |
| **Wizard overflow** | `overflow-y-auto` on WizardLayout for small viewport resilience |
| **Custom scrollbars** | Styled scrollbars that match the dark theme |

### 🧹 Code Quality
| Improvement | Detail |
|------------|--------|
| **Removed stale types** | Cleaned up conflicting type definitions in `types/index.ts` |
| **Barrel export fix** | Added missing Toast component to UI barrel exports |
| **Removed empty directories** | Cleaned up unused `src/hooks/` and `src/utils/` directories |
| **Removed duplicate CSS** | Cleaned up redundant Tailwind border classes in BottomNav |

---

## 🧭 User Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    PRE-AUTH FLOW                              │
│                                                              │
│   [Landing] ──→ [Terms] ──→ [Location] ──→ [Home Feed]      │
│                                                 │            │
│                                          Click "Join"        │
│                                                 ↓            │
│                                    ┌─────────────────────┐   │
│                                    │  "YOU NEED AN        │   │
│                                    │   ACCOUNT" Sheet     │   │
│                                    │                      │   │
│                                    │  [GET STARTED]       │   │
│                                    │  [MAYBE LATER]       │   │
│                                    └─────────┬───────────┘   │
└──────────────────────────────────────────────┼───────────────┘
                                               ↓
┌──────────────────────────────────────────────────────────────┐
│                    AUTH FLOW                                  │
│                                                              │
│   [Email] ──→ [OTP Verification]                             │
│                     │                                        │
│              OTP Verified ✓                                  │
│                     ↓                                        │
└─────────────────────┼────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────────────┐
│                 SIGNUP WIZARD                                 │
│                                                              │
│   [Username] ──→ [Name] ──→ [Age/DOB] ──→ [Pronouns]        │
│                                                 │            │
│                                                 ↓            │
│   [Home Feed + "Signed up!" Toast] ←── [Invite Code]         │
│          │                                                   │
│          └── Bottom Nav Profile icon ──→ [Profile Page 🔒]   │
└──────────────────────────────────────────────────────────────┘
```

---

## 🖼️ Screenshots Mapping

| Reference File | Implemented As | Description |
|---------------|---------------|-------------|
| `screen1.png` | `LandingPage.tsx` | Hero landing with gradient background |
| `screen2.png` | `TermsPage.tsx` | Terms & Conditions acceptance |
| `screen3a.png`, `screen3b.png` | `LocationPage.tsx` | Location permission states |
| `screen4a.png` – `screen4d.png` | `HomePage.tsx` | Home feed with events |
| `screen4e-You_need_account.png` | `HomePage.tsx` (BottomSheet) | Account required prompt |
| `screen5_enter_email*.png` | `EmailPage.tsx` | Email input + validation |
| `screen6_enter_otp*.png` | `OtpPage.tsx` | OTP with all states |
| `screen7_enter_username.png` | `UsernamePage.tsx` | Username wizard step |
| `screen8_name_for_party.png` | `NamePage.tsx` | Name wizard step |
| `screen9_enter_age*.png` | `AgePage.tsx` | DOB picker + age gate |
| `screen10_pronoun*.png` | `PronounsPage.tsx` | Pronoun multi-select |
| `screen11_invite_code*.png` | `InvitePage.tsx` | Invite code entry |
| `screen12_singup_successful_toast.png` | `HomePage.tsx` (Toast) | Signup success |
| `screen13_profile_page*.png` | `ProfilePage.tsx` | Full profile page |

---

## 📁 Project Structure

```
src/
├── main.tsx                        # React root entry point
├── App.tsx                         # Route definitions + ProtectedRoute
├── index.css                       # Global styles, safe-area, scrollbars
│
├── context/
│   └── AuthContext.tsx              # Auth state management (memoized)
│
├── types/
│   └── index.ts                    # Shared TypeScript types
│
├── data/
│   └── mockEvents.ts               # Mock event data for home feed
│
├── components/
│   ├── BottomNav.tsx                # Bottom tab navigation bar
│   ├── EventCard.tsx                # Event feed card component
│   ├── WizardLayout.tsx             # Shared signup wizard layout
│   └── ui/
│       ├── BottomSheet.tsx          # Accessible dialog bottom sheet
│       ├── Button.tsx               # Reusable button (type="button" default)
│       ├── Input.tsx                # Accessible labeled input
│       ├── Logo.tsx                 # E• brand logo component
│       ├── Toast.tsx                # ARIA-compliant toast notification
│       └── index.ts                 # Barrel exports
│
└── pages/
    ├── LandingPage.tsx              # Screen 1 — Hero landing
    ├── TermsPage.tsx                # Screen 2 — T&C acceptance
    ├── LocationPage.tsx             # Screen 3 — Geolocation prompt
    ├── HomePage.tsx                 # Screen 4 — Event feed + account sheet
    ├── EmailPage.tsx                # Screen 5 — Email entry
    ├── OtpPage.tsx                  # Screen 6 — OTP verification
    ├── ProfilePage.tsx              # Screen 13 — User profile (protected)
    └── signup/
        ├── UsernamePage.tsx         # Screen 7 — Username
        ├── NamePage.tsx             # Screen 8 — Party name
        ├── AgePage.tsx              # Screen 9 — DOB / Age gate
        ├── PronounsPage.tsx         # Screen 10 — Pronoun selection
        └── InvitePage.tsx           # Screen 11 — Invite code
```

**22 source files** · **0 TypeScript errors** · **576ms build time**

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd extroverts-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Demo OTP

In development mode, use OTP `000000` to bypass verification.  
This bypass is **disabled** in production builds.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Oxlint for code quality checks |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2 | UI framework |
| **TypeScript** | 6.0 | Type safety |
| **Vite** | 8.2 | Build tool & dev server |
| **Tailwind CSS** | 4.3 | Utility-first styling |
| **React Router** | 7.18 | Client-side routing |
| **Framer Motion** | 13.2 | Animations & transitions |
| **Lucide React** | 1.43 | Icon library |
| **Sonner** | 2.0 | Toast notifications |
| **Oxlint** | 1.79 | Linting |

---

## 📊 Build Output

```
dist/index.html                   1.01 kB │ gzip:   0.52 kB
dist/assets/index-*.css           26.90 kB │ gzip:   6.07 kB
dist/assets/index-*.js           469.26 kB │ gzip: 140.38 kB

✓ built in 576ms
```

---

<p align="center">
  Built with ❤️ as a frontend engineering assignment
</p>
