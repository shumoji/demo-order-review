function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

export function checkout(items, inventory, couponPercent = 0) {
  for (const item of items) {
    if (inventory[item.sku] < item.quantity) {
      throw new Error(`not enough inventory for ${item.sku}`);
    }
  }

  const subtotal = roundMoney(
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  );
  const discount = roundMoney(subtotal * couponPercent);
  const total = roundMoney(subtotal - discount);
  const remainingInventory = { ...inventory };

  for (const item of items) {
    remainingInventory[item.sku] -= item.quantity;
  }

  return {
    subtotal,
    discount,
    total,
    remainingInventory,
  };
}
