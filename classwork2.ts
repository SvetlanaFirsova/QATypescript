//Literal types
type WorkloadCoef = "normal" | "increased" | "high" | "very_high";

//Union
type data = boolean | number | string | null | undefined;

//Typles
type StudentInfo = [string, number];
const student: StudentInfo = ["Name Surname", 25];

//Objects
type BookObj = {
  name: string;
  price: number;
  description: string;
};

//Functions
type sum = (a: number, b: number) => number;

/*You are creating an online shop to sell laptops.
Each laptop must have an operating system restricted to: 'Windows', 'macOS', or 'Linux'.
'Windows' should be used as the default value.

Create:
-- a type alias OperatingSystem
-- a type alias Laptop with brand, model and OperatingSystem fields
-- a function to set default value
-- create an object laptop using these types
*/

type OperatingSystem = "Windows" | "macOS" | "Linux";

type Laptop = {
  brand: string;
  model: string;
  os: OperatingSystem;
};

const createLaptop = (
    brand: string,
    model: string,
    os: OperatingSystem = "Windows"
): Laptop => {
    return{
        brand,
        model,
        os

    };
};

const laptop1 = createLaptop("ASUS", "Zenbook");
const laptop2 = createLaptop("Apple", "Pro 14", "Windows");

console.log(laptop1);
console.log(laptop2);


































class Book {
  name: string;
  price: number;
  author: string;

  constructor(name: string, price: number, author: string) {
    this.name = name;
    this.price = price;
    this.author = author;
  }

  printInfo(): void {
    console.log(`Book: ${this.name}, Author: ${this.author}, Price: $${this.price}`);
  }
}

const book1 = new Book('Clean Code', 30, 'Robert C. Martin');
book1.printInfo();

class EBook extends Book {
  fileSize: number;

  constructor(name: string, price: number, author: string, fileSize: number) {
    super(name, price, author); // call parent constructor
    this.fileSize = fileSize;
  }

  // overriding base method
  printInfo(): void {
    console.log(
      `E-Book: ${this.name}, Author: ${this.author}, Price: $${this.price}, Size: ${this.fileSize}MB`
    );
  }
}

const ebook = new EBook('Clean Code', 30, 'Robert C. Martin', 1.5);
ebook.printInfo();

// interface Book {
//   name: string;
//   price: number;
//   author: string;
// };

// const book: Book = {
//   name: "The Great Gatsby",
//   price: 19.99,
//   author: "F. Scott Fitzgerald"
// };

// console.log(book);

interface EnhancedBook {
  readonly isbn: string; //readonly means cannot be reassigned after creation
  name: string;
  price: number;
  author: string;
  descripion?: string; //? means optional
  
  printInfo(): void; //method
};

const book2: EnhancedBook = {
  isbn: "0-340-01381-8",
  name: "The Great Gatsby",
  price: 19.99,
  author: "F. Scott Fitzgerald",

  printInfo() {
    console.log(`${this.name} by ${this.author}, $${this.price}`);
  }
};

console.log(book2);

//book2.isbn = "0-340-01381-9"; //Cannot assign to 'isbn' because it is a read-only property.

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  role: string;
}

// class PaperBook implements EnhancedBook {
//   readonly isbn: string;
//   name: string;
//   price: number;
//   author: string

//   constructor(
//     isbn: string,
//     name: string,
//     price: number,
//     author: string,
//   ) {
//     this.isbn = isbn;
//     this.name = name;
//     this.price = price;
//     this.author = author;
//   }
// }

// function Book(name, price, author) {
//   this.name = name;
//   this.price = price;
//   this.author = author;
// }

Book.prototype.printInfo = function () {
  console.log(
    "Book: " + this.name + ", Author: " + this.author + ", Price: $" + this.price
  );
};

enum UserStatus {
  INACTIVE,
  ACTIVE,
  BANNED
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: UserStatus;
}

class UserDTO implements User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: UserStatus;

//   constructor(data: Partial<User>) {
//     Object.assign(this, data);
//   }
  
  constructor (
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    userStatus: UserStatus,
  ) {
    this.id= id;
    this.username= username;
    this.firstName= firstName;
    this.lastName= lastName;
    this.email= email;
    this.password= password;
    this.phone = phone;
    this.userStatus= userStatus;
  }
}

const myUser = new UserDTO(1, "username", "firstName", "lastName", "email", "password", "phone", UserStatus.INACTIVE);
console.log(myUser);
