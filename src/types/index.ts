/**
 * Central type definitions for the Extroverts app.
 *
 * Canonical interfaces for UserProfile, SignupData, and AuthContextType
 * are defined and exported from context/AuthContext.tsx.
 * Import them from there:
 *   import { type UserProfile, type SignupData } from '../context/AuthContext'
 */

/** All possible routes in the app */
export type AppRoute =
  | '/'
  | '/terms'
  | '/location'
  | '/home'
  | '/email'
  | '/otp'
  | '/signup/username'
  | '/signup/name'
  | '/signup/age'
  | '/signup/pronouns'
  | '/signup/invite'
  | '/profile'
