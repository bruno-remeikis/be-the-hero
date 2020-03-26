const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; //Busca ?page='n' (caso não encontre, page = 1)

        //Contar quantidade de casos
        const [count] = await connection('incidents')
            .count()
    
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        //Retornar resposta via cabeçalho
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization

        /*
            const [id] = id do incident
            Recurso do js que permite pegar o valor do campo (id) do primeiro ítem do array ([0])

            É a mesma coisa que:
            const result = ...
            const id = result[0]
        */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if(incident.ong_id !== ong_id) {
            return response.status(401).json({ erros: 'Operation not permitted.' }); //HTTP STATUS CODE (401: não autorizado)
        }

        await connection('incidents')
            .where('id', id)
            .delete();

        return response.status(204).send(); //Não tem retorno (sem conteúdo)
    }
}