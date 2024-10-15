"use client";
import { useCreate } from "@/hooks/useCreate";
import { useEdit } from "@/hooks/useEdit";
import { useList } from "@/hooks/useList";
import { schema, FormData, DataType } from "@/schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const { data } = useList();
  const { mutateAsync: muatateCreate } = useCreate();
  const { mutateAsync: muatateEdit } = useEdit();
  const [isEdit, setIsEdit] = useState(false);
  const [idForEdit, setIdForEdit] = useState<string>();

  async function formSubmit(data: any) {
    if (!isEdit) {
      await muatateCreate(data);
    } else {
      if (idForEdit) {
        const formatData = {
          ...data,
          id: idForEdit,
        };
        await muatateEdit(formatData);
      }
    }
    setIsEdit(false);
  }

  const Form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, reset } = Form;

  function resetInputsForm(id: string) {
    const filtereData = data.find((item: DataType) => item.id === id);

    reset(filtereData);
    setIsEdit(true);
    setIdForEdit(id);
  }

  return (
    <div className="p-10 flex flex-col gap-8 items-center text-slate-500">
      <FormProvider {...Form}>
        <form
          className=" flex flex-col gap-4 max-w-[500px]"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between">
              <label htmlFor="name">Nome</label>
              <input
                className="border border-slate-300 min-h-[40px] p-2 rounded-md"
                id="name"
                {...register("name")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between">
              <label htmlFor="address">Endereço</label>
              <input
                className="border border-slate-300 min-h-[40px] p-2 rounded-md"
                id="address"
                {...register("address")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between">
              <label htmlFor="country">País</label>
              <input
                className="border border-slate-300 min-h-[40px] p-2 rounded-md"
                id="country"
                {...register("country")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between">
              <label htmlFor="phone">Telefone</label>
              <input
                className="border border-slate-300 min-h-[40px] p-2 rounded-md"
                id="phone"
                {...register("phone")}
              />
            </div>
          </div>

          <button
            className="bg-emerald-400 text-gray-100 p-2 shadow-md rounded-md"
            type="submit"
          >
            {isEdit ? "Editar" : "Criar"}
          </button>
        </form>
      </FormProvider>
      <div className="flex flex-col gap-4 w-full">
        {data?.map((item: DataType) => (
          <div
            className="flex justify-between items-center gap-4 border border-slate-300 py-2 px-6 rounded-md shadow-sm"
            key={item.id}
          >
            <p className="flex flex-col gap-1">
              <span className="font-semibold">ID</span> {item.id}
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-semibold">Nome</span> {item.name}
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-semibold">Endereço</span> {item.address}
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-semibold">País</span> {item.country}
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-semibold">Telefone</span> {item.phone}
            </p>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Ações</span>
              <div className="flex gap-2 justify-between">
                <button type="button" onClick={() => resetInputsForm(item.id)}>
                  <Pencil className="size-4 text-emerald-400" />
                </button>
                <button type="button">
                  <Trash className="size-4 text-red-700" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
