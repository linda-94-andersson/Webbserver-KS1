# Kunskapskontroll 1

### Frontend länk

https://main--linda-a-to-do-list.netlify.app/

# Docs

## Get all todos

```GET
fetch('http://localhost:5000/todos')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

```OUTPUT
[
    {
    "id": "b10958406143",
    "name": "Cod in Javascript",
    "completed": false
    },
    {
    "id": "61b616398a63",
    "name": "Cook dinner",
    "completed": false
    },
    {
    "id": "dda6807a9cd1",
    "name": "Take a walk",
    "completed": false
    },
    {
    "id": "318c81515cba",
    "name": "Watch Netflix",
    "completed": false
    }
]
```

## Get a singel todo

```GET:id
fetch('http://localhost:5000/todos/b10958406143')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

```OUTPUT
    {
    "id": "b10958406143",
    "name": "Cod in Javascript",
    "completed": false
    }
```

## Add new todo

```POST
fetch('http://localhost:5000/todos', {
            method:"POST",
            body:JSON.stringify(
                {
                    name: 'test product'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

```OUTPUT
    {
    "id": "b10958406143",
    "name": "test product",
    "completed": false
    }
```

## Update a todo

```PUT
fetch('http://localhost:5000/todos/b10958406143', {
            method:"PUT",
            body:JSON.stringify(
                {
                    name: 'new name',
                    completed: false
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

```OUTPUT
    {
    "id": "b10958406143",
    "name": "new name",
    "completed": false
    }
```

```PATCH
fetch('http://localhost:5000/todos/b10958406143', {
            method:"PATCH",
            body:JSON.stringify(
                {
                    name: 'test product'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

```OUTPUT
    {
    "id": "b10958406143",
    "name": "new name",
    "completed": false
    }
```

## Delete a todo

```DELETE
fetch('http://localhost:5000/todos/b10958406143', {
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```

```OUTPUT
    {
    "id": "b10958406143",
    "name": ".....",
    "completed": .....
    }
```

## Kunskapskontroll 1: Todo list API

### För att uppnå Godkänt är kraven att:

- Den ska vara byggd med Node.js och endast dess inbyggda moduler. (X)
- Utan NPM (inga node_modules, package.json, package-lock.json) (X)
- API:et ska ha följande endpoints:
- GET /todos - Hämta alla todos (X)
- GET /todos/:id - Hämta en todo (X)
- POST /todos - Lägg till en todo (X)
- PUT /todos/:id - Ändra en Todo (full) (X)
- PATCH /todos/:id - Ändra en todo (partial) (X)
- DELETE /todos/:id - Ta bort en todo (X)
- API:et ska endast ta emot och skicka data i JSON-format (X)
- API:et ska lagra och läsa data från en JSON-fil, så att applikationen bibehåller datan vid omstart eller krasch. (X)
- Det ska finnas en tillhörande frontend av valfritt slag (ex. Todo-listen från K1 eller K2) (X)

### För att uppnå Väl Godkänt behöver du implementera minst 4 av följande kriterier:

- API:et ska svara med lämpligt meddelande och statuskod om allt gått väl (X)
- API:et ska svara med lämpligt meddelande och statuskod om routen inte finns (X)
- API:et ska svara med lämpligt meddelande och statuskod om resursen inte finns (X)
- API:et ska svara med lämpligt meddelande och statuskod om requesten inte är korrekt (X)
- API:et ska innehålla en README-fil med tillhörande dokumentation med en lista på varje route och exempel på hur den anropas (X)
