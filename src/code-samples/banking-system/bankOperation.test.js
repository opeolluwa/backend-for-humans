import test, { describe } from "node:test";
import { strict as assert } from "node:assert";
import { BankOperation } from "./bankOperation.js";

describe("validate bank operations", () => {
  test("should create account", (_t) => {
    assert.equal(BankOperation.which(1), BankOperation.CreateAccount);
  });

  test("should withdraw from account", (_t) => {
    assert.equal(BankOperation.which(2), BankOperation.Withdraw);
  });

  test("should deposit to account", (_t) => {
    assert.equal(BankOperation.which(3), BankOperation.DepositFunds);
  });

  test("should transfer  account", (_t) => {
    assert.equal(BankOperation.which(4), BankOperation.TransferFunds);
  });

  test("should close account", (_t) => {
    assert.equal(BankOperation.which(5), BankOperation.CloseAccount);
  });
});
