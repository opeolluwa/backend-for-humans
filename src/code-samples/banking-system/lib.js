import { INVALID_STRING_ARGUMENT } from "./errors.js";
import process from "node:process";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
/**
 * remove excesss space and convert to lower case
 * @param {string} str
 */
export function normalizeString(str) {
  if (typeof str != "string") {
    throw INVALID_STRING_ARGUMENT;
  }
  return str.toLowerCase().trim();
}

export function terminateProcess(message = "operation failed") {
  console.log(message);
  process.exit();
}

export async function confirmSelection(message = "do you want to proceed") {
  const prompt = readline.createInterface({ input, output });
  const resp = await prompt.question(normalizeString(message) + "y or n?: ");
  prompt.pause();
  if (resp.trim().toLowerCase() == "y") {
    return true;
  } else {
    return false;
  }
}
