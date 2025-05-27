import bcrypt from "bcrypt";
import { strict as assert } from "node:assert";
import test, { describe } from "node:test";
import { Account } from "./account.js";

describe("account management", () => {
  const pin = "1234";
  const demoAccount = new Account(
    "jane",
    "doe",
    "jd@mailer.com",
    "+23458223456",
    pin
  );

  test("account pin is immutable", (_t) => {
    assert.throws(
      () => {
        demoAccount.pin = "2345";
      },
      {
        name: "TypeError",
      }
    );
  });

  test("the pin should have been hashed", (_t) => {
    const hash = bcrypt.hashSync(pin, 10);
    assert.equal(bcrypt.compareSync(pin, hash), true);
  });

  test("default account balance should be zero", (_t) => {
    assert.equal(demoAccount.balance, 0);
  });

  test("the serialize method returns object", (_t) => {
    const account = demoAccount.serialize();
    assert.equal(typeof account, "object");
    assert.equal(Object.keys(account).includes("balance"), true)
  });
});
