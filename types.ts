
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

export interface TestAppointment {
  name: string;
  email: string;
  phone: string;
  testId: string;
  preferredDate: string;
  preferredTime: string;
}

export interface TestOption {
  value: number;
  label: string;
}

export interface TestQuestion {
  id: string;
  type: 'choice' | 'text' | 'upload';
  text: string;
  options?: { value: number; label: string }[];
}

export interface Interpretation {
  min: number;
  max: number;
  level: string;
  text: string;
}

export interface ScoringLogic {
  calculate: (answers: Record<string, any>) => number;
  interpretations: Interpretation[];
}

export interface PsychologicalTest {
  id: string;
  acronym: string;
  name: string;
  target: 'Adulto' | 'Infantil' | 'Família';
  description: string;
  questions: TestQuestion[];
  scoring?: ScoringLogic;
}

export interface TestResult {
  testId: string;
  testName: string;
  date: string;
  score: number;
  interpretation: Interpretation;
}
