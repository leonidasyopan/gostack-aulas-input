interface techObject {
  title: string;
  experience: number;
}

interface createUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | techObject>;
} 

export default function createUser({ name = '', email, password, techs }: createUserData) {
  const user = {
    name,
    email,
    password,
    techs,
  }

  return user;
}