export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string; // Add this line
  address: string;
  // Add other properties as needed
}

