import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useConversations } from "./hooks/use-conversations";
import { Conversation } from "./components/conversation";

export default function Command() {
  const { value: conversations, isLoading } = useConversations();
  const { push } = useNavigation();

  return (
    <List searchBarPlaceholder="Search a conversation" isLoading={isLoading}>
      {conversations?.length ? (
        conversations.map((conversation) => (
          <List.Item
            key={conversation.id}
            title={conversation.title}
            subtitle={new Date(conversation.date).toDateString()}
            actions={
              <ActionPanel>
                <Action title="Go" onAction={() => push(<Conversation conversation={conversation} />)} />
              </ActionPanel>
            }
          />
        ))
      ) : (
        <List.EmptyView
          icon={Icon.Snippets}
          title="No conversations yet"
          description="Start a new conversation by typing your message and hitting enter"
        />
      )}
    </List>
  );
}
