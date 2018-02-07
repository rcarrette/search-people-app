**Simple project for personal technical training purposes.**

* Node
* TypeScript
* GraphQL
* MongoDB
* Mocha

**MongoDB setup**

Assuming MongoDB is installed on your machine, just create a new database named ``` search-people-db ``` and ```api\mongodb\data``` folder.

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
        firstName,
        lastName,
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

**API clients**
* [search-people-app-client-angular](https://github.com/rcarrette/search-people-app-client-angular)
* [search-people-app-client-react](https://github.com/rcarrette/search-people-app-client-react)
* [search-people-app-client-vue](https://github.com/rcarrette/search-people-app-client-vue)
* [search-people-app-client-android](https://github.com/rcarrette/search-people-app-client-android)