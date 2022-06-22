import { Roles } from './roles';

export interface Clients {
  id: string;
  phone: string | null;
  name: string | null;
  surname: string | null;
  mail: string;
  password: string;
  role: Roles;
}
