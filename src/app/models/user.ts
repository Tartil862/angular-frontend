// src/app/models/user.interface.ts
export interface user {
    id?: string;  // Optional property for user ID
    firstName?: string;
    lastName?: string;
    role?: string;
    email: string;
    password: string;
    photoUrl?: string;  // Optional property for user photo URL
  }
  