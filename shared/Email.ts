export interface Email {
  sender: string;
  subject: string;
  content: string;
  selected: boolean;
  markRead: boolean;
  type: string;
}
