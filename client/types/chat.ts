export interface Message {
  sender: string;
  message: string;
  createdAt: Date;

  isYour?: boolean;
}
