let name = "Adeoye Adefemi";
let age = 34;
let gender = "male";

// introduce me
introduce_me(name, age, gender);

// update my age, and name
age = 45;
name = "Opeeolluwa";

//introduce me again using the new age and name
introduce_me(name,age,gender);

// introduce me again 
age = 60;
name = "Adeoye Adefemi Opeoluwa";
introduce_me(name, age, gender);


function introduce_me(name, age, gender) {
  console.log(`My name is ${name}, I am a ${age} years old ${gender}. `);
}


