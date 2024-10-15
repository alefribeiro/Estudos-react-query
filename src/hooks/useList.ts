import { list } from "@/service/list";
import { useQuery } from "react-query";

export function useList() {
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => list(),
  });

  return { data };
}
