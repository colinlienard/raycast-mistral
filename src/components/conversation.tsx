import { List, ActionPanel, Action } from "@raycast/api";
import { useEffect, useState } from "react";
import { Conversation as ConversationType, useConversations } from "../hooks/use-conversations";
import { ModelDropdown } from "./models-dropdown";

type Props =
  | {
      conversation: ConversationType;
      question?: never;
    }
  | {
      conversation?: never;
      question: string;
    };

export function Conversation({ conversation, question: baseQuestion }: Props) {
  const { value: conversations, setValue: setConversations } = useConversations();
  const [chats, setChats] = useState<ConversationType["items"]>(
    conversation?.items || [{ question: baseQuestion || "", answer: "" }],
  );
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (baseQuestion) {
      streamAnswer();
      baseQuestion = undefined;
    }
  }, [baseQuestion]);

  function handleSubmit() {
    if (!question.length) return;
    setQuestion("");
    setChats((prev) => [{ question, answer: "" }, ...prev]);
    streamAnswer();
  }

  async function streamAnswer() {
    setIsLoading(true);

    // const result = await client.chat.stream({
    //   messages: [{ role: "user", content: question }],
    //   model,
    // });

    // for await (const chunk of result) {
    //   const streamText = chunk.data.choices[0].delta.content;
    //   setResponse((previous) => previous + streamText);
    // }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setChats((prev) => {
      const [first, ...rest] = prev;
      return [{ ...first, answer: "Hello, world!" }, ...rest];
    });

    if (conversation) {
      setConversations([
        ...(conversations || []),
        {
          ...conversation,
          items: [...conversation.items, { question: baseQuestion || question, answer: "Hello, world!" }],
        },
      ]);
    } else {
      setConversations([
        ...(conversations || []),
        {
          id: Math.random().toString(36).slice(7),
          title: baseQuestion || question,
          date: new Date().toString(),
          items: [{ question: baseQuestion || question, answer: "Hello, world!" }],
        },
      ]);
    }

    setIsLoading(false);
  }

  return (
    <List
      searchBarPlaceholder="Ask another question"
      searchText={question}
      onSearchTextChange={(text) => setQuestion(text)}
      isShowingDetail
      isLoading={isLoading}
      searchBarAccessory={<ModelDropdown />}
    >
      {chats.map((item, index) => (
        <List.Item
          key={index}
          title={item.question}
          detail={<List.Item.Detail markdown={item.answer} />}
          actions={
            <ActionPanel>
              <Action title="Ask" onAction={handleSubmit} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
