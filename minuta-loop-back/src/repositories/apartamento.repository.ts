import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Apartamento, ApartamentoRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class ApartamentoRepository extends DefaultCrudRepository<
  Apartamento,
  typeof Apartamento.prototype.id,
  ApartamentoRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof Apartamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Apartamento, dataSource);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
