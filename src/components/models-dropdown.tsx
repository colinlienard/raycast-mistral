import { List } from "@raycast/api";
import { useCurrentModel } from "../hooks/use-current-model";
import { useCachedPromise } from "@raycast/utils";
import { client } from "../utils/mistral-client";

export function ModelDropdown() {
  return null;

  const { data, isLoading } = useCachedPromise(async () => await client.models.list());
  const { value, setValue } = useCurrentModel();

  const models = data?.data?.map((model) => ({ id: model.id, name: model.name ?? model.id }));

  if (!models) return null;

  return (
    <List.Dropdown
      tooltip="Models"
      isLoading={isLoading}
      value={value?.id}
      onChange={(value) => {
        console.log("CHANGE", value);
        const model = models?.find((item) => item.id === value);
        if (model) {
          setValue(model);
        }
      }}
    >
      {models.map((model) => (
        <List.Dropdown.Item key={model.id} title={model.name} value={model.id} />
      ))}
    </List.Dropdown>
  );
}
