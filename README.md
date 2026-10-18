# demo-order-review

クーポン割引と在庫引当を題材にした、コードレビューのデモ用プロジェクトです。
外部パッケージやサービスを必要とせず、Node.jsだけで実行できます。

## デモの仕様

- 商品は `{ sku, quantity, unitPrice }` の形式で渡す。
- `quantity` は正の整数、`unitPrice` は0以上の金額とする。
- 在庫数を超える注文は受け付けない。同じSKUが複数行にある場合は数量を合算して確認する。
- `couponPercent` は `0` から `100` までの百分率で、初期値は `0`。
- 金額は小数第2位に丸める。
- 入力の在庫オブジェクトは変更しない。

## 実行方法

```powershell
node --test
```

## 使い方

```js
import { checkout } from "./src/checkout.js";

const order = checkout(
  [{ sku: "coffee", quantity: 2, unitPrice: 12.5 }],
  { coffee: 5 },
  10,
);

console.log(order);
```

`checkout` は `subtotal`、`discount`、`total`、`remainingInventory` を返します。

## レビュー用デモ

このサンプルには、通常の注文で動く基本ケースと、仕様に対する確認ポイントがあります。
CodeReviewerには、変更差分と関連コードを読み、重要な問題だけを再現条件・場所・改善案付きで指摘するよう依頼してください。
