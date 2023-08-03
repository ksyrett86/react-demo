import { CodeViewerModalVM, ICodeBlock } from "./CodeViewerModal";

class CodeUtil {

    private _codeViewerModalVM?: CodeViewerModalVM;

    public get codeViewerModalVM() {
        if (!this._codeViewerModalVM) {
            this._codeViewerModalVM = new CodeViewerModalVM();
        }
        return this._codeViewerModalVM;
    }

    public showCode(code: ICodeBlock[], title: string) {
        this.codeViewerModalVM.modalInfo = { code: code, title: title };
    }
}

const codeUtil = new CodeUtil;

export default codeUtil;