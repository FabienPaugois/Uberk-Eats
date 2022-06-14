import { Roles } from './roles';

export interface Clients {
  id: string;
  phone: string;
  name: string;
  surname: string;
  mail: string;
  password: string;
  role: Roles;
}
