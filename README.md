# Kunskapskontroll 1

## Kunskapskontroll 1: Todo list API

### För att uppnå Godkänt är kraven att:

- Den ska vara byggd med Node.js och endast dess inbyggda moduler.
- Utan NPM (inga node_modules, package.json, package-lock.json)
- API:et ska ha följande endpoints:
- GET /todos - Hämta alla todos
- GET /todos/:id - Hämta en todo
- POST /todos - Lägg till en todo
- PUT /todos/:id - Ändra en Todo (full)
- PATCH /todos/:id - Ändra en todo (partial)
- DELETE /todos/:id - Ta bort en todo
- API:et ska endast ta emot och skicka data i JSON-format
- API:et ska lagra och läsa data från en JSON-fil, så att applikationen bibehåller datan vid omstart eller krasch.
- Det ska finnas en tillhörande frontend av valfritt slag (ex. Todo-listen från K1 eller K2)

### För att uppnå Väl Godkänt behöver du implementera minst 4 av följande kriterier:

- API:et ska svara med lämpligt meddelande och statuskod om allt gått väl
- API:et ska svara med lämpligt meddelande och statuskod om routen inte finns
- API:et ska svara med lämpligt meddelande och statuskod om resursen inte finns
- API:et ska svara med lämpligt meddelande och statuskod om requesten inte är korrekt
- API:et ska innehålla en README-fil med tillhörande dokumentation med en lista på varje route och exempel på hur den anropas
