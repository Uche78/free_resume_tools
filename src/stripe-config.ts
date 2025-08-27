export const products = {
  coffee: {
    id: 'prod_Sh7WSFHEyWc4JS',
    priceId: 'price_1RljHlDNVnwvjDcFopTL2udf',
    name: 'Buy Us a Coffee',
    description: 'Our tools are 100% free, and if our AI-powered resume wizardry helped you, please consider tossing a virtual coffee our way.',
    price: 'C$5.00',
    mode: 'payment' as const,
  },
} as const;

export type ProductKey = keyof typeof products;