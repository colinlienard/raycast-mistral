import { useLocalStorage } from "@raycast/utils";

type Model = {
  id: string;
  name: string;
};

export function useCurrentModel() {
  return useLocalStorage<Model>("model", { id: "mistral-small-latest", name: "mistral-small-2503" });
}
