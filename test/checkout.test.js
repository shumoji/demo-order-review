import assert from "node:assert/strict";
import test from "node:test";
import { checkout } from "../src/checkout.js";

test("calculates a checkout without a coupon and reserves inventory", () => {
  const inventory = { coffee: 5, tea: 8 };
  const result = checkout(
    [
      { sku: "coffee", quantity: 2, unitPrice: 12.5 },
      { sku: "tea", quantity: 1, unitPrice: 5 },
    ],
    inventory,
  );

  assert.deepEqual(result, {
    subtotal: 30,
    discount: 0,
    total: 30,
    remainingInventory: { coffee: 3, tea: 7 },
  });
  assert.deepEqual(inventory, { coffee: 5, tea: 8 });
});

test("rejects an order when a single line exceeds available inventory", () => {
  assert.throws(
    () =>
      checkout(
        [{ sku: "coffee", quantity: 6, unitPrice: 12.5 }],
        { coffee: 5 },
      ),
    /not enough inventory for coffee/,
  );
});
