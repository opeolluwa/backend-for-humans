import { BankSystem } from "./bank.js";

async function main() {
  const name = "Summit Fashion Micro-finance Bank";
  const address = "Block 54, Orange road, Jigawa, Dutse, Nigeria";
  const Bank = new BankSystem(name, address);

  const moreTransaction = await Bank.runBank();
  if (!moreTransaction) {
    console("thanks for banking with us ");
    process.exit();
  } else {
    return await Bank.runBank();
  }
}

await main();
