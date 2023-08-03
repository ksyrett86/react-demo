import { NeoModel } from '@singularsystems/neo-core';
import { Views } from '@singularsystems/neo-react';

@NeoModel
export default class ViewBaseViewModel extends Views.ViewModelBase {

    public warnWhenLeaving = false;
}