export const formatAddress = (address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}) => {
  return `${address.recipientName} • Rua: ${address.street}, ${address.number}
    ${address.complement ? `, ${address.complement}` : ""}, Bairro: ${address.neighborhood}
    , ${address.city} - ${address.state} • CEP: ${address.zipCode}`;
};
