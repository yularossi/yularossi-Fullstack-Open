# Part 4 - Bloglist backend

Backend for the Fullstack Open exercise 4.1-4.23.

## Uso

1. Crea una base de datos MongoDB local o usa Atlas.
2. Ajusta el archivo `.env` con tu URI de MongoDB.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev`.

## Endpoints

- `GET /api/blogs` - Obtener todos los blogs
- `POST /api/blogs` - Crear un nuevo blog (requiere token)
- `DELETE /api/blogs/:id` - Eliminar un blog (solo creador, requiere token)
- `GET /api/users` - Obtener todos los usuarios (sin password hash)
- `POST /api/users` - Crear un nuevo usuario con password hasheado
- `POST /api/login` - Iniciar sesión y obtener token JWT
