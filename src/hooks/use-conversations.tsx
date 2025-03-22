import { useLocalStorage } from "@raycast/utils";

export type Conversation = {
  id: string;
  title: string;
  date: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export function useConversations() {
  return useLocalStorage<Conversation[]>("mistral-conversations");
}
