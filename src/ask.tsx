import { Action, ActionPanel, List } from "@raycast/api";
import { Mistral } from "@mistralai/mistralai";
import { useState } from "react";

const apiKey = "qCbFjQvUYfzE3yinWuuBnZKIPVZoJRZm";

const client = new Mistral({ apiKey });

export default function Command() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("mistral-small-latest");

  async function handleSubmit() {
    const result = await client.chat.stream({
      messages: [{ role: "user", content: question }],
      model,
    });

    for await (const chunk of result) {
      const streamText = chunk.data.choices[0].delta.content;
      setResponse((previous) => previous + streamText);
    }
  }

  return (
    <List
      searchBarPlaceholder="Ask Le Chat"
      searchText={question}
      onSearchTextChange={(text) => setQuestion(text)}
      isShowingDetail={!!response}
      actions={
        <ActionPanel>
          <Action title="Ask" onAction={handleSubmit} />
        </ActionPanel>
      }
      searchBarAccessory={
        <List.Dropdown tooltip="Model" onChange={(value) => setModel(value)}>
          {/* TODO: fetch models from API */}
          <List.Dropdown.Item title="Mistral Small Latest" value="mistral-small-latest" />
        </List.Dropdown>
      }
    >
      {response ? (
        // TODO: multiple chats
        <List.Item title="TODO" subtitle="TODO" detail={<List.Item.Detail markdown={response} />} />
      ) : (
        <List.EmptyView
          title="Ask Le Chat"
          description="Type your message and hit enter"
          icon={{ source: "mistral-logo.svg" }}
        />
      )}
    </List>
  );
}
