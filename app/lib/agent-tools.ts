const orders = [
  { id: "1", name: "T-shirt", status: "Shipped" },
  { id: "2", name: "Qamiis", status: "Processing" },
  { id: "3", name: "Atomic habit Book", status: "Delivered" },
];
export async function getOrderStatus({ orderId }: { orderId: string }) {

  console.log(orderId)
  const myOrder = orders.find(order => order.id === orderId);
 
 
  if (!myOrder) {
    return `Please provide your message with a valid order ID.`;
  }
 
  switch (myOrder.status) {
    case "Shipped":
      return `Order ${myOrder.name} has been shipped and is arriving tomorrow.`;
    case "Processing":
      return `Order ${myOrder.name} is currently being processed.`;
    case "Delivered":
      return `Order ${myOrder.name} has already been delivered.`;
    default:
      return `Order ${myOrder.name} has status: ${myOrder.status}.`;
  }
}
