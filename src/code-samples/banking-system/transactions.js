import crypto from "node:crypto";
import { TransactionKind } from "./transactionKind.js";

/**
 * @class Transaction
 */
export class Transaction {
  kind;
  description;
  accountIdentifier;
  amount;
  identifier;
  date;
  referenceNumber;

  /**
   *
   * @param {TransactionKind} kind
   * @param {string} description
   * @param {string} accountIdentifier - the primary key of the account 
   * @param {number} amount
   */
  constructor(kind, description, accountIdentifier, amount) {
    this.kind = kind;
    this.description = description;
    this.accountIdentifier = accountIdentifier;
    this.amount = amount;
    this.identifier = crypto.randomUUID();
    this.date = new Date();
    this.referenceNumber = crypto.randomUUID();
  }

  /**
   * convert to JSON
   */

  serialize() {
    return {
      kind: this.kind,
      description: this.description,
      account: this.account,
      amount: this.amount,
      identifier: this.identifier,
      accountIdentifier: this.accountIdentifier,
      date: this.date,
      referenceNumber: this.referenceNumber,
    };
  }
}
