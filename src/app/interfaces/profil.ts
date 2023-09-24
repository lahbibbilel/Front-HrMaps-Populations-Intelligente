export interface Profil {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  image: string;
  role: string;
  authorities: string[]; // Add this property for authorities
}
