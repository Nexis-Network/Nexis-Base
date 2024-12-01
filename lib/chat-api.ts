import type { Message } from '@/types/chat';

export async function fetchMessages(): Promise<Message[]> {
  const response = await fetch('/api/messages');
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Expected an array of messages');
  }
  return data.filter((item): item is Message => isMessage(item));
}

function isMessage(item: any): item is Message {
  return (
    typeof item === 'object' &&
    item !== null &&
    // Add checks for all required properties of Message
    typeof item.content === 'string' &&
    typeof item.address === 'string'
    // Add more property checks as needed
  );
}

export async function sendMessage(content: string, address: string): Promise<void> {
  // Implement sending a message to your API
}

export async function fetchOnlineUsers(): Promise<string[]> {
  const response = await fetch('/api/online-users');
  if (!response.ok) {
    throw new Error('Failed to fetch online users');
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Expected an array of online users');
  }
  return data.filter((item): item is string => typeof item === 'string');
}
