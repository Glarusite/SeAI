export interface User {
  id: number;
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
