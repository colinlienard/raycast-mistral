import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { useSystemPrompt } from "./hooks/use-system-prompt";

export default function Command() {
  const { value: systemPrompt, setValue: setSystemPrompt } = useSystemPrompt();
  const { handleSubmit } = useForm<{ systemPrompt: string }>({
    onSubmit(values) {
      setSystemPrompt(values.systemPrompt);
      showToast({
        style: Toast.Style.Success,
        title: "System Prompt Set",
      });
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Description" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="systemPrompt"
        value={systemPrompt}
        title="System Prompt"
        placeholder="Set the system prompt for your upcoming conversations"
      />
    </Form>
  );
}
