interface LoginInput {
  email: string;
  password: string;
}
interface RegisterInput extends LoginInput {
  full_name: string;
  confirm_password: string;
}
interface ResetPasswordInput {
  email: string;
  password: string;
  confirm_password: string;
  token:string,
}
interface IEvent {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    startDateTime: string;
    endDate: string;
    endDateTime: string;
    location: string;
    image: string;
  }
