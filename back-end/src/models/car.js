import { z } from 'zod'

const today = new Date() //Hoje-

const CarModel = z.object({
    // a)campo brand: string; comprimento mínimo: 1; comprimento máximo: 25;
    brand:
        z.string().min(1,
            { message: 'A marca do carro precisa ter no mínimo 1 caracter' }).max(25,
                { message: 'A marca do carro não pode exceder 25 caracteres.' }),

    // b)campo model: string; comprimento mínimo: 1; comprimento máximo: 25;
    model:
    z.string().min(1,
        { message: 'A modelo do carro precisa ter no mínimo 1 caracter' }).max(25,
            { message: 'A modelo do carro não pode exceder 25 caracteres.' }),

    //campo color: string; comprimento mínimo: 4; comprimento máximo: 20;
    color:
        z.string().min(4,
            { message: 'O nome da cor deve ter no mínimo 4 caracteres.' }).max(20,
                {message: 'O nome da cor não pode exceder 20 caracteres.' }),
        
    //campo year_manufacture: number (integer); mínimo: 1940; máximo: 2023;
    year_manufacture:
            z.number().int().min(1940,
                { message: 'O ano de fabricação não pode ser anterior ao de 1940.' }).max(2023,
                    { message: 'O ano de fabricação não pode ser após 2023 (A menos que você descobriu como fazer uma viagem no tempo.)' }),
    
    //campo imported: boolean;
    imported:
        z.boolean(),

    //campo plates: string; comprimento exato: 8 (descontando eventuais caracteres desublinhado);
    plates:
        z.string().length(8,
            { message:'O a placa deve ter apenas 8 caracteres.' }),
    
    //campo selling_date: date; não pode ser posterior à data de hoje; pode ser nulo;
    selling_date:
        z.date().max(new Date(),
            { message: 'A data não pode ser anterior a de hoje.' }).optional(),

    //campo selling_price: number; valor mínimo: 2000; pode ser nulo;
    selling_price:
            z.number().min(2000,
                { message: 'O valor de venda não pode ser menor que $2.000 reais.' }).optional(),

    //campo customer_id: number (integer); positivo; pode ser nulo.
    //WIP
    customer_id:
        z.number().int().refine().optional()
})

const Car = {}

Car.parse = function(fields) {
    // f) ...(descontando eventuais caracteres desublinhado);

    fields.plates = fields?.plates.replace('_', '')
}

export default Car