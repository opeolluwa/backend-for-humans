/**
 * @class bBankOperations
 */
export class BankOperation {
  static CreateAccount = "create-account";
  static Withdraw = "withdraw";
  static TransferFunds = "transfer-fun";
  static DepositFunds = "deposit-fund";
  static CloseAccount = "close-account";

  static #operations = {
    1: this.CreateAccount,
    2: this.Withdraw,
    3: this.DepositFunds,
    4: this.TransferFunds,
    5: this.CloseAccount,
  };
  /**
   *
   * @param {number} operation
   * @returns string
   */
  static which(operation) {
    return this.#operations[operation];
  }
}
