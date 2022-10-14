import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Apartamento,
  Persona,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoPersonaController {
  constructor(
    @repository(ApartamentoRepository) protected apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Apartamento has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.apartamentoRepository.personas(id).find(filter);
  }

  @post('/apartamentos/{id}/personas', {
    responses: {
      '200': {
        description: 'Apartamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInApartamento',
            exclude: ['id'],
            optional: ['apartamentoId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.apartamentoRepository.personas(id).create(persona);
  }

  @patch('/apartamentos/{id}/personas', {
    responses: {
      '200': {
        description: 'Apartamento.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.apartamentoRepository.personas(id).patch(persona, where);
  }

  @del('/apartamentos/{id}/personas', {
    responses: {
      '200': {
        description: 'Apartamento.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.apartamentoRepository.personas(id).delete(where);
  }
}
