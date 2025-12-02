<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Proyecto backend construido con NestJS (Node.js + TypeScript). Este repo es una plantilla/aplicación de ejemplo para registrar tiempos en un servidor Nest — contiene scripts para desarrollo, pruebas y despliegue con Docker + MongoDB.

## Requisitos previos

Antes de ejecutar el proyecto localmente, asegúrate de tener instaladas las siguientes herramientas:

- Node.js (recomendado: 18.x o superior)
- npm (v9+) o yarn
- Docker y Docker Compose (si quieres ejecutar en contenedores)


## Configuración rápida (local / desarrollo)

1. Instala dependencias:

```bash
npm ci
```

2. Crea un archivo `.env` (puedes copiar el `.env.example` incluido) y edita las variables según tu entorno.

3. Ejecuta en modo desarrollo (hot-reload):

```bash
npm run start:dev
```

Por defecto la app se sirve en http://localhost:3000 (o el `PORT` que definas en `.env`).

## Compilar y ejecutar (producción)

1. Construir el proyecto:

```bash
npm run build
```

2. Ejecutar la build (producción):

```bash
npm run start:prod
```

O, con Docker (recomendado para reproducción idéntica entre entornos):

```bash
# Construir y levantar (detached)
docker compose up -d --build

# Detener y eliminar
docker compose down
```

## Pruebas

Ejecutar pruebas unitarias:

```bash
npm run test
```

Pruebas e2e:

```bash
npm run test:e2e
```

Cobertura de tests:

```bash
npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

---

## Docker + MongoDB (instrucciones)

El repositorio incluye un `Dockerfile` y `docker-compose.yml` preparados para ejecutar la aplicación con MongoDB (imagen `mongo:6`).

Pasos para ejecutar con Docker:

```bash
# Desde la raíz del proyecto (con Docker/Docker Compose instalado)
docker compose up -d --build
```

La aplicación quedará expuesta en http://localhost:3001 (host -> container 3000) y MongoDB en el puerto 27017.

Credenciales por defecto incluidas en `docker-compose.yml` (para desarrollo/ejemplo):

- Usuario: `freelance_user`
- Contraseña: `freelance_pass`
- Base de datos: `freelance_db`

La variable recomendada dentro del contenedor `app` es `MONGO_URI`, por ejemplo:

```
mongodb://freelance_user:freelance_pass@db:27017/freelance_db?authSource=admin
```

Si prefieres expresar variables sensibles fuera del código fuente, copia `.env.example` a `.env` y actualiza los valores.

### Conectarse al shell de MongoDB

Puedes abrir una consola interactiva de MongoDB dentro del contenedor usando el siguiente comando (útil para inspeccionar bases de datos, collections y usuarios):

```bash
docker exec -it freelance_db mongosh -u freelance_user -p freelance_pass --authenticationDatabase admin
```

Alternativamente, si tienes `mongosh` instalado en tu máquina host, puedes conectarte directamente a la instancia que se expone en localhost:

```bash
mongosh "mongodb://localhost:27017/freelance_db" -u freelance_user -p freelance_pass --authenticationDatabase admin
```

Estas dos formas te permiten explorar las colecciones y comprobar que la base de datos `freelance_db` fue creada correctamente.

---

## Repositorio / API para registros de horas (Hours)

He añadido un módulo `hours` que contiene un `HourRepository` con la misma funcionalidad que tu implementación PHP: crear registros de horas, listar, buscar por id, actualizar y eliminar.

Rutas REST incluidas (`src/hours/hours.controller.ts`):

- POST /hours — crear un registro (body JSON con `cliente`, `proyecto`, `fecha`, `horas`, `tarifa`, `ingreso`)
- GET /hours — listar todos los registros (ordenados por fecha desc)
- GET /hours/:id — obtener un registro por id
- PUT /hours/:id — actualizar un registro
- DELETE /hours/:id — eliminar un registro

Ejemplo de payload para crear un registro:

```json
{
  "cliente": "Acme S.A.",
  "proyecto": "Desarrollo API",
  "fecha": "2025-12-01",
  "horas": 2.5,
  "tarifa": 50,
  "ingreso": 125
}
```

El repositorio usa Mongoose y queda registrado en `src/hours/hour.repository.ts`. La base de datos se conecta por la variable `MONGO_URI` (o al `mongodb://localhost:27017/freelance_db` por defecto).

## Entidad: timeloger (por capas)

También he añadido la entidad `timeloger` organizada por capas (models/schemas, repository, service, controller). La estructura del directorio es `src/timeloger` y los ficheros principales son:

- `src/timeloger/schemas/timeloger.schema.ts` — Mongoose schema para `timeloger`.
- `src/timeloger/timeloger.repository.ts` — capa de acceso a datos (métodos CRUD).
- `src/timeloger/timeloger.service.ts` — lógica de negocio que delega en el repository.
- `src/timeloger/timeloger.controller.ts` — endpoints REST para la entidad.

Endpoints expuestos para `timeloger`:

-- POST /timeloger — crear un registro (body: `cliente`, `proyecto`, `fecha`, `horas`, `tarifaHora`, `ingreso`, `uid`)
 - POST /timeloger — crear un registro (body: `cliente`, `proyecto`, `fecha`, `horas`, `tarifaHora`, `ingreso`, `uid`)
- GET /timeloger — listar todos los timeloggers
- GET /timeloger/:id — obtener por id
- PUT /timeloger/:id — actualizar
- DELETE /timeloger/:id — eliminar

Ejemplo de payload para `timeloger` (coincide con tu modelo frontend):

```json
{
  "cliente": "Acme S.A.",
  "proyecto": "Desarrollo UI",
  "fecha": "2025-12-01",
  "horas": 3.5,
  "tarifaHora": 40,
  "ingreso": 140,
  "uid": "user_abc_123"
}
```

Nota: el backend valida las entradas (class-validator). Si faltan campos obligatorios como `tarifaHora` o `uid` recibirás un 400 Bad Request con detalles del error, en lugar de un 500.

### Ejemplo de actualización (PUT)

Supongamos que creaste un registro y su id es `64...abc`.

Para actualizar solo algunos campos, usa PUT /timeloger/:id con el body conteniendo únicamente los campos a cambiar. Ejemplo:

```bash
curl -X PUT http://localhost:3001/timeloger/64...abc \
  -H "Content-Type: application/json" \
  -d '{"horas": 4.5, "ingreso": 180}'
```

La implementación del backend ahora busca el documento existente, aplica solo los campos permitidos y guarda la entidad — esto evita crear un nuevo documento por error.

Nota importante sobre ids: este backend usa MongoDB ObjectIds (por ejemplo: 64f7a3a5b7a1a6e66a0f1b23). Si envías un id inválido (p. ej. "1") Mongoose lanzará un error de casteo y recibirás un 400 Bad Request con el mensaje `Invalid id format`.

Ejemplo de prueba correcta (usar un _id devuelto por la creación):

```bash
# crear un registro y obtén el _id desde la respuesta
curl -s -X POST http://localhost:3001/timeloger \
  -H "Content-Type: application/json" \
  -d '{"cliente":"Acme","proyecto":"API","fecha":"2025-12-01","horas":4,"tarifaHora":30,"ingreso":120,"uid":"user1"}' | jq

# sustituye <ID> por el _id real
Nota sobre el campo `id` en las respuestas

Para facilitar la integración con frontends que esperan un `id` único, la API ahora devuelve en cada objeto de `timeloger` un campo `id` siempre como string y solo los campos esperados por el modelo frontend:

- Si el documento tiene `numericId`, `id` = String(numericId) (por ejemplo "1").
- Si no tiene `numericId`, `id` = String(_id) (por ejemplo "64f7a3...").

Esto permite que tu Angular use `registro.id` directamente y haga Number(registro.id) cuando necesite un número.
Esto significa que cada objeto de respuesta incluye exactamente los campos del frontend y `id` como string. Ejemplo de objeto de respuesta:

```json
{
  "id": "1",
  "cliente": "Acme S.A.",
  "proyecto": "Desarrollo UI",
  "fecha": "2025-12-01",
  "horas": 3.5,
  "tarifaHora": 40,
  "ingreso": 140,
  "uid": "user_abc_123"
}
```

Tu frontend puede usar `registro.id` como un string y, cuando sea necesario, convertirlo a un número con Number(registro.id).
curl -v -X PUT http://localhost:3001/timeloger/<ID> \
  -H "Content-Type: application/json" \
  -d '{"horas":5, "ingreso":150}'
```

DELETE /timeloger/:id — notas sobre id inválido

Si el front envía un id inválido (por ejemplo `NaN` o un número), el backend ahora responde 400 con `Invalid id format: <id>`. Asegúrate de que, en el front, el id que pasas a la llamada DELETE sea el `_id` real de Mongo (cadena), no un número ni undefined.

Ejemplo de DELETE correcto:

```bash
# suponiendo <ID> es algo como 64f7a3a5b7a1a6e66a0f1b23
curl -v -X DELETE http://localhost:3001/timeloger/<ID>
```

Todos los imports en `src/` usan rutas absolutas basadas en `@/` apuntando a `src/`.

---

## Importes absolutos (alias `@/`) y build

Este proyecto usa importes absolutos con el alias `@/` apuntando a `src/` para mantener la estructura por capas (p. ej. `@/timeloger/timeloger.service`).

Notas importantes:

- Durante el desarrollo (start:dev) cargamos las rutas con `tsconfig-paths` para que `@/` funcione con `ts-node`.
Para la compilación de producción el script `build` ejecuta `nest build` y la ejecución de producción (start:prod) precarga `tsconfig-paths/register` para resolver los alias `@/` en tiempo de ejecución.

Si prefieres no usar los alias en producción, puedes ajustar `package.json` para no precargar `tsconfig-paths` o usar rutas relativas en `src/`.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Recursos y ayuda

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
