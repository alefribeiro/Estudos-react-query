// app/api/contacts/route.ts
import { NextResponse } from "next/server";

// Simular banco de dados em memória (pode ser substituído por uma conexão real)
let contacts = [
  {
    id: 1,
    name: "Alex",
    address: "Rua 2",
    country: "Argentina",
    phone: "9999999999",
  },
];

// Método GET - retorna todos os contatos
export async function GET() {
  return NextResponse.json(contacts);
}

// Método POST - cria um novo contato
export async function POST(req: Request) {
  const data = await req.json();
  const newContact = { id: contacts.length + 1, ...data };
  contacts.push(newContact);
  return NextResponse.json(newContact, { status: 201 });
}

// Método PUT - atualiza um contato existente
export async function PUT(req: Request) {
  const data = await req.json();
  const contactIndex = contacts.findIndex((contact) => contact.id === data.id);
  if (contactIndex === -1) {
    return NextResponse.json({ message: "Contact not found" }, { status: 404 });
  }
  contacts[contactIndex] = { ...contacts[contactIndex], ...data };
  return NextResponse.json(contacts[contactIndex]);
}

// Método DELETE - remove um contato pelo ID
export async function DELETE(req: Request) {
  const { id } = await req.json();
  contacts = contacts.filter((contact) => contact.id !== id);
  return NextResponse.json({ message: "Contact deleted" });
}
