
export enum ServiceCategory {
  INDIVIDUAL = 'Individual',
  CHILDREN = 'Infantil',
  FAMILY = 'Família & Casal',
  TESTING = 'Testes Online',
  TRAINING = 'Treinamento'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Appointment {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export interface PsychologicalTest {
  id: string;
  name: string;
  acronym: string;
  target: 'Adulto' | 'Infantil' | 'Família';
  description: string;
}
