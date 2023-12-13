interface LoginInput {
  email: string;
  password: string;
}
interface User {
  name: string;
  role: string;
  userId: string;
  email?:string
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

  interface ITicket{
    _id:string
    eventName: string;
    eventId: string;
    name: string;
    price: number;
    soldQty: number;
    ticketQty: number;
    type: string;
  }

  interface IPurchaseTicketRequest{
    ticketQty: number;
  }

  interface ICreateEventRequest {
    title: string;
    description: string;
    startDate: string;
    startDateTime: string;
    endDate: string;
    endDateTime: string;
    location: string;
  };

  interface ChangePasswordInput{
    oldpassword:string,
    newpassword:string,
    confirm_password:string
  }