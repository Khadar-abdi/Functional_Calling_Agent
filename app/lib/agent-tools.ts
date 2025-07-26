export const tools = [
  {
    name: "getOrderStatus",
    description: "Fetches the order status using order ID.",
    parameters: {
      type: "object",
      properties: {
        orderId: { type: "string", description: "The ID of the order" }
      },
      required: ["orderId"]
    }
  }
];

export async function getOrderStatus({ orderId }: { orderId: string }) {
  // In real case: fetch from DB or API
  return `Order ${orderId} has been shipped and will arrive tomorrow.`;
}
