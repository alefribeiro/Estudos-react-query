import { DataType } from "@/schema/FormSchema";
import { create } from "@/service/create";
import { useMutation, useQueryClient } from "react-query";

export function useCreate() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (data: any) => create(data),

    onSuccess(data) {
      const cached = queryClient.getQueryData<DataType[]>(["list"]) || [];

      queryClient.setQueryData(["list"], [...cached, data.data]);
    },
  });

  return { mutateAsync };
}
