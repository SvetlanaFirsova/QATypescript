/**
 * Simulates fetching data from a server with a generic type.
 * @param data - The data of type T to be returned upon success.
 * @returns A Promise that resolves with data of type T or rejects with an Error.
 */
export async function fetchData<T>(data: T): Promise<T> {
  console.log("Fetching data from server...");
  return new Promise((resolve, reject) => {
    //Simulate a delay of 1 second (1000ms)
    setTimeout(() => {
      const currentSeconds = new Date().getSeconds();
      console.log(`Current seconds: ${currentSeconds}`);
      //Check if the current seconds value is even
      if (currentSeconds % 2 === 0) {
        //Success: Return the provided data
        resolve(data);
      } else {
        //Failure: Throw a descriptive error
        reject(new Error(`Server Error: Request failed because the current second (${currentSeconds}) is odd.`));
      }
    }, 1000);
  });
}