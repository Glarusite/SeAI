export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
  surname: string;
  rank: string;
  employer: {
    id: number;
    name: string;
  };
  birthDate: Date;
  status: string;
  homeAirport: string;
  readinessDate: Date;
}
