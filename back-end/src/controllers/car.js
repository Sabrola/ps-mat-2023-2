import prisma from '../databases/client.js'
import Car from '../models/car.js'
import { ZodError } from 'zod'

const controller = {}       //Objeto vazio

controller.create = async function(req, res) {
    try {
        
        Car.parse(req.body)

        await prisma.car.create({ data: req.body})

        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)

        //Erro de validação do Zod - HTTP 422: Unprocessable Entity
        if(error instanceof ZodError) res.status(422).send(error.issues)

        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function(req, res) {

    let include = []    //Por padrão não inclui nenhum relancionamento

    //Somente vai incluir entidades realacionads se a querrystring "related" for passada ba URL 
    if(req.query.related) include.customers - true

    try {
        const result = await prisma.car.findMany({
            include,
            orderBy: [
                { brand: 'asc' },
                { model:'asc' }
            ]
        })

        //HTTP 200: OK
        res.send(result)
    }
    catch(error) {
        console.error(error)

        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function(req, res) {
    try {
        const result = await prisma.car.findUnique({
            where: {id: Number(req.params.id)}
        })

        //Encontrou: retorna HTTP 200: OK
        if(result) res.send(result)
        //Não encontrou: retorna HTTP 404: Not Found
        else res.status(404).end()
    } 
    catch(error) {
        console.error(error)

        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update  = async function(req, res) {
    try {
        const result = await prisma.car.update({
            where: { id: Number(req.params.id) },
            data: req.body
        })

        //HTTP 204: No content
        if(result) res.status(204).end()
        //HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)

        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async function(req, res) {
    try {
        const result = await prisma.car.delete({
            where: { id: Number(req.params.id) }
        })

        //HTTP 204: No content
        if(result) res.status(204).end()
        //HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)

        //Erro do Zod - HTTP 422: Unprocessable Entity
        if(error instanceof ZodError) res.status(422).send(error.issues)

        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

export default controller