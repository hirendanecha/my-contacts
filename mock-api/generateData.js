const faker = require('faker');
var database = { contacts: []};

for (var i = 1; i<= 100; i++) {
  database.contacts.push({
    id: i,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    employee: faker.name.jobType(),
    avatar: `${faker.image.people()}?random=${Math.round(Math.random() * 1000)}`,
    bio: faker.name.jobDescriptor(),
    emails: [faker.internet.email(), faker.internet.email()],
    dial: faker.image.cats(),
    meeting: faker.image.cats(),
    phoneNumbers: [faker.phone.phoneNumber(), faker.phone.phoneNumber()],
    isOnline: faker.datatype.boolean()
  });
}

console.log(JSON.stringify(database));
