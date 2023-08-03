import { ModelBase, NeoModel, Attributes, Model } from '@singularsystems/neo-core';

class FileDescriptor extends Model.FileDescriptorBase {

}

// DemoCode: FileManagerInput,Model
@NeoModel
export default class FileModel extends ModelBase {

    public documentId: string = "";

    @Attributes.ChildObject(FileDescriptor)
    public document: FileDescriptor | null = null;

}
// End DemoCode