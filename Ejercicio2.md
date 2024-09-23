# Ejercicio 2 - Estado

1.

```javascript
import { create } from 'zustand'

const BOOKS_API_URL = "https://api.org/books"
const USERS_API_URL = "https://api.org/users"

const useLibraryStore = create((set) => {
    return {
       books: [],
       authors: [],
       users: [],

	   fetchBooksData: async () => {
			const res = await fetch(BOOKS_API_URL)
			const json = await res.json()
			const newBooksData = json.response
			if (!response.ok) {
				throw new Error(`Error while fetching for books: ${response.status}`);
			  }

			set({ books: newBooksData})
	   },
	   fetchUsersData: async () => {
			const res = await fetch(USERS_API_URL)
			const json = await res.json()
			const newUsersData = json.response
			if (!response.ok) {
				throw new Error(`Error while fetching for users: ${response.status}`);
			  }

			const parsedUsers = newUsersData.map((user) => ({
				...user,
				favorite_books: newUsersData.map((book) => ({
					id: book.id,
					favorited_at: book.favorited_at,
				}))
			}))

			set({users: parsedUsers})
	   },
       fetchLibraryData: async () => {
			await Promise.all([
				fetchBooksData(),
				fetchUsersData(),
			])
       },
	   // Si se desea se pueden seguir agregando acciones que modifiquen el estado global.
    }
})

// Si algun componente desea consumir el estado global, solo basta con llamar al hook.
// por ejemplo:

const books = useLibraryStore(state => state.books)
```

2.

```json
{
	"books": [
		{
			"id": 1,
			"title": "Clean Code",
			"author": {
				"id": 1,
				"name": "Uncle Bob"
			}
		},
		{
			"id": 2,
			"title": "Clean Architecture",
			"author": {
				"id": 1,
				"name": "Uncle Bob"
			}
		}
	],
	"users": [
		{
			"id": 1,
			"email": "chano@amalgama.co",
			"nickname": "Chano",
			"favorite_books": [
				{
					"id": 1,
					"title": "Clean Code",
					"favorited_at": "2024-01-01",
					"author": {
						"id": 1,
						"name": "Uncle Bob"
					}
				}
			]
		},
		{
			"id": 2,
			"email": "sebastian@amalgama.co",
			"nickname": "Biche",
			"favorite_books": [
				{
					"id": 1,
					"title": "Clean Code",
					"favorited_at": "2024-06-30",
					"author": {
						"id": 1,
						"name": "Uncle Bob"
					}
				},
				{
					"id": 2,
					"title": "Clean Architecture",
					"favorited_at": "2024-12-31",
					"author": {
						"id": 1,
						"name": "Uncle Bob"
					}
				}
			]
		}
	]
}
```

3. Con esta solucion la informacion de los libros no queda duplicada. El estado seria accesible para toda la app. Si se necesitara cachear la data en el browser, es decir qeu perdure entre sesiones, por ejemplo cerrando la app y ovlviendola a abrir, se puede usar localStorage (solo cuando no es pesada la informacion a almcanear.)

Mejora: se puede hacer lo mismo en los autores para que los multiples libros con los mismo autores no dupliquen esa info. De ser asi, se podria agregar authors al global state.

Elegi usar zustand aunque tambien hay otras herramientas como Redux o el mismo context de React. Me termine quedando con zustand por su simplicidad (menos boilerplate y facilidad de uso) y tambien aporta menos peso en un supuesto proyecto.
