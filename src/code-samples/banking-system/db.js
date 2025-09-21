import {
  constants,
  mkdir,
  openSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { normalizeString } from "./lib.js";
import { Transaction } from "./transactions.js";
import { Account } from "./account.js";

/**
 *  persist the bank data to a local JSON file
 * @class DataStore
 */
export class DataStore {
  #bankName;
  #dataFilePath;

  constructor(name) {
    const dataStorePath = join(process.cwd(), "store");
    mkdir(dataStorePath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    this.#bankName = normalizeString(name)
      .replaceAll(/\s+/gi, "-")
      .concat(".json");
    this.#dataFilePath = join(process.cwd(), "store", this.#bankName);
    this.#findCreateStore();
  }
  #findCreateStore() {
    try {
      openSync(this.#dataFilePath, constants.O_WRONLY | constants.O_CREAT);
    } catch (error) {
      console.log(error);
    }
  }

  get accounts() {
    return this.#store.accounts;
  }

  get transactions() {
    return this.#store.transactions;
  }

  /**
   *
   * @param {Transaction} transaction
   * @returns void
   */
  saveTransaction(transaction) {
    const updatedStore = this.#store;
    updatedStore.transactions.push(transaction);
    this.#save(updatedStore);
  }

  /**
   * @returns {Object} Store
   * @property {account[]}
   * @property {transactions[]}
   */
  get #store() {
    const rawStoredData = readFileSync(this.#dataFilePath);
    if (rawStoredData.length == 0) {
      const defaultContent = JSON.stringify({ accounts: [], transactions: [] });
      writeFileSync(this.#dataFilePath, defaultContent);
      return JSON.parse(defaultContent);
    } else {
      return JSON.parse(rawStoredData);
    }
  }

  createAccount(account) {
    const updatedStore = this.#store;
    updatedStore.accounts.push(account);
    this.#save(updatedStore);
  }

  /**
   *
   * @param {number} index
   * @param {Account} account
   */
  updateAccount(index, account) {
    const updatedStore = this.#store;
    updatedStore.accounts[index] = account;
    this.#save(updatedStore);
  }

  /**
   * @param {number} accountNumber
   */
  deleteAccount(index) {
    const updatedStore = this.#store;
    updatedStore.accounts.splice(index, 1);
    this.#save(updatedStore);
  }

  #save(updatedStore) {
    writeFileSync(this.#dataFilePath, JSON.stringify(updatedStore));
  }
}
