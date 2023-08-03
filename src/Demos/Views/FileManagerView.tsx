import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Views, Neo } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import { Components, ModalUtils, Misc, Utils, NeoModel } from '@singularsystems/neo-core';
import FileModel from '../Models/FileModel';
import DemoApiClient from '../Models/DemoApiClient';

@NeoModel
class FileManagerVM extends Views.ViewModelBase {

    constructor() {
        super();

        this.onDocumentSelected = this.onDocumentSelected.bind(this);

        // This code is for demo purposes only.
        this.unSelectedFile = new FileModel();
        this.selectedFile = new FileModel();
        this.selectedFile.documentId = Utils.uuidv4();
        this.selectedFile.document = this.selectedFile.meta.document.propertyInfo.createValueInstance();
        this.selectedFile.document!.fileName = "Document.pdf";

        this.selectedFile2 = this.selectedFile.clone();
        this.selectedFile3 = this.selectedFile.clone();
        this.selectedFile4 = this.selectedFile.clone();
    }

    public apiClient = new DemoApiClient();

    // ----------------------- File Manager -------------------------

    // DemoCode: FileManagerBasic
    public imageFileManager = new Components.FileManager({ 
        multiple: true, 
        accept: "image/*", 
        allowedExtensions: [".jpg", ".jpeg", ".png", ".gif"], 
        onFilesSelected: this.onImagesSelected.bind(this) });

    public images: File[] | undefined;

    public onImagesSelected(fileList: File[] | FileList) {
        this.images = Array.from(fileList);

        // If you needed to upload these files, you would call uploadFiles, passing in fileList.
        // You can also keep a reference to fileList, and call uploadFiles at a later stage.
        // this.imageFileManager.uploadFiles(fileList);
    }
    // End DemoCode

    // ----------------------- File Context -------------------------

    // DemoCode: FileManagerContext
    public async onDocumentSelected(fileList: File[] | FileList, fileManager: Components.IFileManager) {

        if ((await ModalUtils.showYesNo("Upload", "Are you sure you want to upload this file?")) === Misc.ModalResult.Yes) {
            // Note, the fileManager instance is passed into this method, since the fileContext created it.
            this.taskRunner.run(async () => {
                await fileManager.uploadFiles(fileList);
            })
        }
    }
    // End DemoCode

    // ----------------------- File Input -------------------------

    // DemoCode: FileManagerInput
    public unSelectedFile: FileModel;
    public selectedFile: FileModel;
    public selectedFile2: FileModel;
    public selectedFile3: FileModel;
    public selectedFile4: FileModel;
    // End DemoCode
}

@observer
export default class FileManagerView extends Views.ViewBase<FileManagerVM> {

    constructor(props: unknown) {
        super("File Manager", FileManagerVM, props);
    }

    public render() {
        const viewModel = this.viewModel;

        return (
            <div className="constrain-width">
                <Neo.Card title="File Management">
                    <p>
                        The neo core and react libraries contain the following components to help with selecting, reading, downloading and uploading
                        of files.
                    </p>
                    <ul className="my-4">
                        <li><code>FileManager</code> - Used by the UI components below to select and upload files.</li>
                        <li><code>FileContext</code> - Used to bind related ui components to the same file manager.</li>
                        <li><code>FileInput</code> - File input control for use in forms / grids.</li>
                        <li><code>FileDropArea</code> - File drag and drop support.</li>
                        <li><code>FileUploadButton</code> - Stand alone browse button.</li>
                    </ul>

                    <em>Note: The endpoints used in this demo are fake. You will receive errors when trying to upload files.</em>
                </Neo.Card>



                <Neo.Card title="API clients">
                    <p>
                        The API client generator will try determine if your method is accepting or returning binary data. If so, the method that is
                        generated on the API client will return the URL of the endpoint, instead of the binary type.
                    </p>
                    <p>
                        E.g. if your c# controller method is called <code>GetPicture([FromRoute] int pictureId)</code>, the generated API client method
                        will be <code>getPictureUrl(pictureId: number): string</code>. The string that is returned will be the url which you can use to
                        fetch the data. So to show this picture in an <code>img</code> tag, you would write the
                        following: <code>&lt;img alt="pic" src={'{this.pictureApi.getPictureUrl(this.model.pictureId)}'} /&gt;</code>
                    </p>
                    <p>
                        Upload methods work the same way. A c# method named <code>UploadPicture</code> will be generated as <code>getUploadPictureUrl(): string</code>.
                    </p>
                </Neo.Card>

                <Neo.Card title="File manager" data-code-key="FileManagerBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FileManagerBasic, "File manager")} />}>
                    <p>
                        The file manager is used internally by the file related UI components. You can also create an instance of file manager to use programatically.
                        File manager has the following options:
                    </p>
                    <ul>
                        <li><code>uploadEndpoint</code> - The URL of the api endpoint which will receive file data. This is not required if you are only reading the file on the client.</li>
                        <li><code>allowedExtensions</code> - Optional list of extensions that are allowed. You can also set the allowed and dissalowed extensions globally
                        using the <code>Misc.Settings.fileManager</code> settings section.</li>
                        <li><code>accept</code> - Media type to accept, e.g. <code>image/*</code>. This will only be used when showing a file select dialog, not in the file drop component.</li>
                        <li><code>multiple</code> - True if multiple files are allowed.</li>
                        <li><code>additionalData</code> - Additional data to send to the server. This can be a plain object of string values, or a callback which returns a plain object.
                            The callback will be executed after the user selects a file (if onFilesSelected is not handled).</li>
                        <li><code>onFilesSelected</code> - Callback method to run when the user selects a file. This method is passed the file collection, and a fileManager instance.
                            Handling this method will cause the file manager to stop it's processing, meaning you will have to manually call <code>fileManager.uploadFiles</code> if you want
                            to upload the file.</li>

                        <li><code>afterUpload</code> - Callback method which is called after the files have been uploaded, and the response has been received from the server. The response
                        object will be passed in.</li>
                        <li><code>taskRunner</code> - If specified, the file upload operation will use this task runner.</li>

                    </ul>
                    <h6>Methods</h6>
                    <ul>
                        <li><code>showFileDialog()</code> - Shows the browsers select file dialog using the accept / allowedExtensions / multiple options from above.</li>
                        <li><code>processFiles()</code> - Accepts a list of files. Checks that the extensions are allowed based on the options, then calls onFilesSelected or uploadFiles.</li>
                        <li><code>uploadFiles()</code> - Uploads a list of files to the specified upload endpoint.</li>
                    </ul>
                    <p>
                        The drop area and button below use the same file manager, and will both cause the same <code>onFilesSelected</code> callback to fire.
                        You can also use one of these without the other if you prefer.
                        You could also programatically open the file dialog by calling <code>imageFileManager.showFileDialog()</code>
                    </p>

                    <div data-code-content>
                        <Neo.FileDropArea fileManager={viewModel.imageFileManager}>
                            <Neo.FileUploadButton fileManager={viewModel.imageFileManager}>Select images</Neo.FileUploadButton> or drag some images in here.
                            <Neo.FileUploadProgress fileManager={viewModel.imageFileManager} />
                        </Neo.FileDropArea>

                        <div className="my-4">
                            {viewModel.images && viewModel.images.map(image => (
                                <img alt="" src={URL.createObjectURL(image)} style={{ maxHeight: "100px" }} />
                            ))}
                        </div>
                    </div>

                </Neo.Card>

                <Neo.Card title="File context" data-code-key="FileManagerContext" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FileManagerContext, "File context")} />}>

                    <p>
                        In the above example, we did not really need to create a file manager instance. We can achieve the same outcome purely using components.
                        The <code>Neo.FileContext</code> component accepts the same parameters as <code>FileManager</code> as props.
                    </p>
                    <p>
                        The components nested in the <code>FileContext</code> component don't need any props - they will use the parent context to get the
                        required options.
                    </p>

                    <Neo.FileContext uploadEndpoint={viewModel.apiClient.documentUploadURL} onFilesSelected={viewModel.onDocumentSelected} allowedExtensions={[".xlsx", ".docx", ".pdf"]}>
                        <Neo.FileDropArea>
                            <Neo.FileUploadButton>Select document</Neo.FileUploadButton> or drag one here from outlook. Also, try drag an image here.
                            <Neo.FileUploadProgress />
                        </Neo.FileDropArea>
                    </Neo.FileContext>

                </Neo.Card>

                <Neo.Card title="File input" data-code-key="FileManagerInput" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FileManagerInput, "File input")} />}>
                    <p>
                        The <code>Neo.FileInput</code> component manages binding files to models. It looks like a normal form group with a few additional features.
                    </p>
                    <div data-code-content>
                        <Neo.GridLayout alignItems="center">
                            <div>
                                <p>
                                    To make a form group render a <code>Neo.FileInput</code>, you need to specify the <code>fileProps</code> prop. You can also use <code>Neo.FileInput</code> as
                                    a stand-alone component.
                                </p>
                                <p>
                                    The minimum props you need to provide to <code>Neo.FileInput</code> are <code>bind</code> and <code>uploadEndpoint</code>. This will allow you to select
                                    and upload a file. The server will return a response with the fileDescriptorId (if you are using <code>IHttpFileUploadManager</code>) and automatically set the value
                                    of the bind prop.
                                </p>
                            </div>

                            <Neo.FormGroup bind={viewModel.unSelectedFile.meta.documentId} fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL }} />

                            <p className="mt-4">
                                In this example, a file has been selected. There are now options to either clear the file, or select a new file. Since we have not specified a download endpoint,
                                a fixed <em>File selected</em> message is displayed, with no ability for the user to view the file.
                            </p>
                            <Neo.FormGroup bind={viewModel.selectedFile.meta.documentId} fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL }} />

                            <p className="mt-4">
                                If you don't want to allow the user to change the file, set the <code>isReadOnly</code> prop. The user will still be able to select a file initially.
                            </p>
                            <Neo.FormGroup bind={viewModel.selectedFile2.meta.documentId} fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL }} isReadOnly />

                            <p className="mt-4">
                                When you set the <code>downloadEndpoint</code> property, the <em>File Selected</em> message will change to a <em>View file</em> link which will allow the user to
                                download the file. You can change this text using the <code>downloadLinkText</code> prop.
                            </p>
                            <Neo.FormGroup bind={viewModel.selectedFile3.meta.documentId}
                                fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL, downloadEndpoint: viewModel.apiClient.getDocumentDownloadURL }} />

                            <div className="mt-4">
                                <p>
                                    If you want to display the file name to the user, you need to specify the <code>fileDescriptorProperty</code>. This can either be an object of
                                    type <code>IFileDescriptor</code>, or a string value.
                                </p>
                                <p>
                                    This example also shows how to customise some of the other properties of the <code>Neo.FileInput</code> component. You can set global styles under
                                    the <code>Misc.Settings.fileManager</code> settings section.
                                </p>

                            </div>
                            <Neo.FormGroup bind={viewModel.selectedFile4.meta.documentId}
                                fileProps={{
                                    uploadEndpoint: viewModel.apiClient.documentUploadURL,
                                    downloadEndpoint: viewModel.apiClient.getDocumentDownloadURL,
                                    fileDescriptorProperty: viewModel.selectedFile.meta.document,
                                    downloadLinkText: "View {0}",
                                    changeFileText: "Choose another",
                                    browseButton: { variant: "light", menuItems: [{ isDivider: true }, { text: "Custom action" }] }
                                }} />
                            
                        </Neo.GridLayout>
                    </div>
                </Neo.Card>

                <Neo.Card title="Server side">
                    <p>
                        The file manager sends binary data to the server using <code>Content-Type: multipart/form-data</code>. There are two ways to read this data:
                    </p>
                    <h6>Normal sized files</h6>
                    <p>
                        If you are expecting smaller files (at most a few MB), or you need to access the file data in memory (e.g. read an excel file), then you can add a
                        parameter of type <code>IFormCollection</code> to your controller method. <br />
                        E.g.
                        <p>
                            <code>
                                [HttpPost("UploadPicture/{'{animalId}'}")] <br />
                                async Task&lt;IActionResult&gt; UploadPicture(int animalId, [FromForm] IFormCollection form)
                            </code>
                        </p>
                        The form parameter above will contain the file streams of the files you have uploaded, as well as any additional data dictionary values that were set. If you
                        need to save the files to the database, you can use the neo file upload manager by injecting <code>IHttpFileUploadManager</code> into your controller.
                        Pass the <code>form.Files</code> collection into the <code>SaveFilesAsync</code> method of <code>IFormCollection</code>.
                    </p>

                    <h6>Large files</h6>
                    <p>
                        The above method is convenient, because you can easily access the file data from the form parameter. However, in order to do this, MVC needs to read the
                        files into memory, or into a temporary file on disk which may be problematic for larger files.
                    </p>
                    <p>
                        The <code>IHttpFileUploadManager</code> can read the file data directly from the incoming HTTP request, and stream it to it's save location (disk / database etc).
                        In order to do this, your controller method must not contain any parameters (not even the route parameter). You must still call the <code>SaveFilesAsync</code> method
                        on <code>IHttpFileUploadManager</code> without passing any parameters.
                    </p>
                    <p>
                        If you need to pass parameters using the above method, you will need to use the <code>AdditionalData</code> dictionary of <code>FileManager</code>.
                        The <code>SaveFilesAsync</code> method will return a file upload result with an <code>AdditionalData</code> property where the values can be read.
                    </p>
                </Neo.Card>
            </div>
        );
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_FileManagerBasic = [{ language: "jsx", code: 
`<Neo.FileDropArea fileManager={viewModel.imageFileManager}>
    <Neo.FileUploadButton fileManager={viewModel.imageFileManager}>Select images</Neo.FileUploadButton> or drag some images in here.
    <Neo.FileUploadProgress fileManager={viewModel.imageFileManager} />
</Neo.FileDropArea>

<div className="my-4">
    {viewModel.images && viewModel.images.map(image => (
        <img alt="" src={URL.createObjectURL(image)} style={{ maxHeight: "100px" }} />
    ))}
</div>`}, { language: "javascript", code: `public imageFileManager = new Components.FileManager({ 
    multiple: true, 
    accept: "image/*", 
    allowedExtensions: [".jpg", ".jpeg", ".png", ".gif"], 
    onFilesSelected: this.onImagesSelected.bind(this) });

public images: File[] | undefined;

public onImagesSelected(fileList: File[] | FileList) {
    this.images = Array.from(fileList);

    // If you needed to upload these files, you would call uploadFiles, passing in fileList.
    // You can also keep a reference to fileList, and call uploadFiles at a later stage.
    // this.imageFileManager.uploadFiles(fileList);
}`}];

const demo_source_code_FileManagerContext = [{ language: "jsx", code: 
`<p>
    In the above example, we did not really need to create a file manager instance. We can achieve the same outcome purely using components.
    The <code>Neo.FileContext</code> component accepts the same parameters as <code>FileManager</code> as props.
</p>
<p>
    The components nested in the <code>FileContext</code> component don't need any props - they will use the parent context to get the
    required options.
</p>

<Neo.FileContext uploadEndpoint={viewModel.apiClient.documentUploadURL} onFilesSelected={viewModel.onDocumentSelected} allowedExtensions={[".xlsx", ".docx", ".pdf"]}>
    <Neo.FileDropArea>
        <Neo.FileUploadButton>Select document</Neo.FileUploadButton> or drag one here from outlook. Also, try drag an image here.
        <Neo.FileUploadProgress />
    </Neo.FileDropArea>
</Neo.FileContext>`}, { language: "javascript", code: `public async onDocumentSelected(fileList: File[] | FileList, fileManager: Components.IFileManager) {

    if ((await ModalUtils.showYesNo("Upload", "Are you sure you want to upload this file?")) === Misc.ModalResult.Yes) {
        // Note, the fileManager instance is passed into this method, since the fileContext created it.
        this.taskRunner.run(async () => {
            await fileManager.uploadFiles(fileList);
        })
    }
}`}];

const demo_source_code_FileManagerInput = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <p>
            To make a form group render a <code>Neo.FileInput</code>, you need to specify the <code>fileProps</code> prop. You can also use <code>Neo.FileInput</code> as
            a stand-alone component.
        </p>
        <p>
            The minimum props you need to provide to <code>Neo.FileInput</code> are <code>bind</code> and <code>uploadEndpoint</code>. This will allow you to select
            and upload a file. The server will return a response with the fileDescriptorId (if you are using <code>IHttpFileUploadManager</code>) and automatically set the value
            of the bind prop.
        </p>
    </div>

    <Neo.FormGroup bind={viewModel.unSelectedFile.meta.documentId} fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL }} />

    <p className="mt-4">
        In this example, a file has been selected. There are now options to either clear the file, or select a new file. Since we have not specified a download endpoint,
        a fixed <em>File selected</em> message is displayed, with no ability for the user to view the file.
    </p>
    <Neo.FormGroup bind={viewModel.selectedFile.meta.documentId} fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL }} />

    <p className="mt-4">
        If you don't want to allow the user to change the file, set the <code>isReadOnly</code> prop. The user will still be able to select a file initially.
    </p>
    <Neo.FormGroup bind={viewModel.selectedFile2.meta.documentId} fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL }} isReadOnly />

    <p className="mt-4">
        When you set the <code>downloadEndpoint</code> property, the <em>File Selected</em> message will change to a <em>View file</em> link which will allow the user to
        download the file. You can change this text using the <code>downloadLinkText</code> prop.
    </p>
    <Neo.FormGroup bind={viewModel.selectedFile3.meta.documentId}
        fileProps={{ uploadEndpoint: viewModel.apiClient.documentUploadURL, downloadEndpoint: viewModel.apiClient.getDocumentDownloadURL }} />

    <div className="mt-4">
        <p>
            If you want to display the file name to the user, you need to specify the <code>fileDescriptorProperty</code>. This can either be an object of
            type <code>IFileDescriptor</code>, or a string value.
        </p>
        <p>
            This example also shows how to customise some of the other properties of the <code>Neo.FileInput</code> component. You can set global styles under
            the <code>Misc.Settings.fileManager</code> settings section.
        </p>

    </div>
    <Neo.FormGroup bind={viewModel.selectedFile4.meta.documentId}
        fileProps={{
            uploadEndpoint: viewModel.apiClient.documentUploadURL,
            downloadEndpoint: viewModel.apiClient.getDocumentDownloadURL,
            fileDescriptorProperty: viewModel.selectedFile.meta.document,
            downloadLinkText: "View {0}",
            changeFileText: "Choose another",
            browseButton: { variant: "light", menuItems: [{ isDivider: true }, { text: "Custom action" }] }
        }} />
    
</Neo.GridLayout>`}, { language: "javascript", title: "Model", code: `@NeoModel
export default class FileModel extends ModelBase {

    public documentId: string = "";

    @Attributes.ChildObject(FileDescriptor)
    public document: FileDescriptor | null = null;

}`}, { language: "javascript", code: `public unSelectedFile: FileModel;
public selectedFile: FileModel;
public selectedFile2: FileModel;
public selectedFile3: FileModel;
public selectedFile4: FileModel;`}];
