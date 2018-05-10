**Simple project for personal technical training purposes.**

* Node/Express
* TypeScript
* Mongoose (MongoDB)
* GraphQL
* Mocha/Chai/Sinon

**MongoDB setup**

Assuming MongoDB is installed on your machine, just create a new database named ``` search-people-db ``` and ``` api\mongodb\data ``` folder.
Then, run the MongoDB agent: ``` mongod --dbpath api\mongodb\data ```

**Dev environment setup**

```
npm install
npm run dev
```

**Run tests**

```
npm run tests
```

**GraphQL sample queries and mutations**

* Using GraphiQL
```
{
    people(lastName: "Carrette") {
        firstName
        age
    }
}
```
```
{
    people(age: 26) {
        lastName
        firstName
        age
    }
}
```
```
{
    people {
        lastName
    }
}
```
```
mutation {
    add(firstName: "John", lastName: "Doe", age: 37) {
        firstName
        lastName
        age
    }
}
```
```
mutation {
  update(_id: "5a79c5c21f2f242b3c7a7196", fieldsToUpdate: {lastName: "Doe", age: 33}) {
    firstName
    lastName
    age
  }
}
```
```
mutation {
    delete(age: 37) {
    lastName
  }
}
```

* Using HTTP request
```
http://localhost:3000/graphql?query={people(lastName:%20%22Carrette%22){firstName,%20age}}
```