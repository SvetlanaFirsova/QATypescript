function addName(name: string): string {
    console.log(addName);
    return "Hello "+ name;
};

const addName1 = function(name1: string): string {
    return "Hello "+ name1;
};

const addName2 = (name2: string): string => "Hello " + name2;

//Verification
console.log(addName("Sveta"));
console.log(addName1("Tonya"));
console.log(addName2("Ihor"));


