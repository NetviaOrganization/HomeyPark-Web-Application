export interface AuthUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface CreateProfileDTO {
  name: string;
  lastName: string;
  address: string;
  userId: number;
}
