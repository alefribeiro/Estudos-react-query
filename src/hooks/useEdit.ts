import { DataType } from "@/schema/FormSchema";
import { edit } from "@/service/edit";
import { useMutation, useQueryClient } from "react-query";

export function useEdit() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (data: DataType) => edit(data),
    onSuccess(data, variables) {
      const cached = queryClient.getQueryData<DataType[]>(["list"]) || [];
      queryClient.setQueryData(
        ["list"],
        cached.map((item) => (item.id === variables.id ? data.data : item))
      );
    },
  });

  return { mutateAsync };
}
