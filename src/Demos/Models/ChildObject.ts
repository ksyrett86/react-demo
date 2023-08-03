import { Attributes, ModelBase, NeoModel } from '@singularsystems/neo-core';
import { SimpleModelWithRules } from './ModelWithRules';

@NeoModel
export class ChildObject extends ModelBase {

    public id: number = 0;

    @Attributes.ChildObject(SimpleModelWithRules)
    public parent: SimpleModelWithRules | null = null;
}