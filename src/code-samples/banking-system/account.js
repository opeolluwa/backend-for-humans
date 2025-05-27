import bcrypt from "bcrypt";
import crypto from "node:crypto";
export class Account {
  firstName;
  lastName;
  email;
  phoneNumber;
  #pin;
  #accountNumber;
  transactions;
  #balance = 0;
  #identifier;
  /**
   * @constructor - create a new account
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} phoneNumber
   */
  constructor(firstName, lastName, email, phoneNumber, pin) {
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.email = email.trim();
    this.phoneNumber = phoneNumber;
    this.#accountNumber = this.#generateAccountNumber();
    this.#pin = bcrypt.hashSync(pin.trim(), 10);
    this.transactions = [];
    this.#identifier = crypto.randomUUID();
  }

  /**
   *
   * @returns string
   */
  #generateAccountNumber() {
    return new Date().getTime();
  }

  /**
   * convert to json
   * @typedef {Object} AccountInformation
   * @property {string} firstName
   * @property {string} lastname
   * @property {number} accountNumber
   * @property {number} balance
   */
  serialize() {
    return {
      firstname: this.firstName,
      lastName: this.lastName,
      accountNumber: this.#accountNumber,
      balance: this.#balance,
      email: this.email,
      phoneNumber: this.phoneNumber,
      pin: this.#pin,
      transactions: this.transactions,
      identifier: this.#identifier,
      fullName: this.fullName,
    };
  }

  /**
   * @readonly
   * @returns {number} pin
   */
  get pin() {
    return this.#pin;
  }

  /**
   * @readonly
   * @returns {number} balance
   */
  get balance() {
    return this.#balance;
  }

  /**
   * @returns {string}
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
