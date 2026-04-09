/**
 * Simulates fetching data from a server with a generic type.
 * @param data - The data of type T to be returned upon success.
 * @returns A Promise that resolves with data of type T or rejects with an Error.
 */
export async function fetchData<T>(data: T): Promise<T> {
  console.log("Fetching data from server...");

  // Wait for the promise to resolve inside the async function (delay)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const currentSeconds = new Date().getSeconds();
  console.log(`Current seconds: ${currentSeconds}`);

  // Check if the current second is even
  if (currentSeconds % 2 === 0) {
    // Success: simply return the data
    return data;
  } else {
    // Failure: throw an Error (the async function will automatically wrap this in a rejection)
    throw new Error(`Server Error: Request failed because the current second (${currentSeconds}) is odd.`);
  }
}