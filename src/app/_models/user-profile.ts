import { Role } from './index';

export class UserProfile {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
    enabled: boolean;
    expired: boolean;
} 
