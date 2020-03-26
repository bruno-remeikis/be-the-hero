/*
    RECURSOS DO JAVASCRIPT:

    - Colchetes "[]" retornam o primeiro ítem do array
    Ex.:
        a = {10, 20, 30, 40, 50}
        [a] = 10
*/

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 *
 * GET: Buscar dados do back-end
 * POST: Criar dados no back-end
 * PUT: Alterar dados do back-end
 * DELETE: Deletar dados do back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params (request.query): ?param1=valor1&param2=valor2
 * Route Params (request.params): (Identificar recursos) /:param
 * Request Body (request.body): Criar ou alterar recursos
 */

app.listen(3333)