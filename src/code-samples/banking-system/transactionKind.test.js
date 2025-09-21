import test, { describe } from "node:test";
import { strict as assert } from "node:assert";
import { TransactionKind } from "./transactionKind.js";

describe("should validate the transaction kind is unchanged", () => {
  test("deposit", () => {
    assert.equal(TransactionKind.Deposit, "deposit");
  });
    test("withdraw", () => {
    assert.equal(TransactionKind.Withdraw, "withdraw");
  });
    test("transfer", () => {
    assert.equal(TransactionKind.Transfer, "transfer");
  });
});
