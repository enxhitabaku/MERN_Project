import {useState} from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import {FilePond, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {FILE_MAX_SIZE, FILE_WHITE_LIST} from "../../constants/form-fields-constants";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginFileValidateType)

export default function ImageUploader({id, onChange, error}) {
    const [fileList, setFileList] = useState([])

    function shouldAllowFile(file) {
        return (
            FILE_WHITE_LIST.includes(file.file.type) &&
            FILE_MAX_SIZE >= file.file.size
        )
    }

    function onUpdateFiles(files) {
        onChange(files[0]?.file)
        setFileList(files)
    }

    return (
        <div className="App">
            <FilePond
                id={id}
                storeAsFile={true}
                files={fileList}
                allowMultiple={false}
                maxFiles={1}
                acceptedFileTypes={FILE_WHITE_LIST}
                checkValidity={true}
                allowFileTypeValidation={true}
                beforeDropFile={shouldAllowFile}
                beforeAddFile={shouldAllowFile}
                onerror={(err) => console.log(err)}
                onupdatefiles={onUpdateFiles}
                credits={false}
                name="image-uploader"
                labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
            />
            <FormHelperText>
                Allowed image format: {FILE_WHITE_LIST.join('; ')} <br/>
                Max. image size: {FILE_MAX_SIZE}KB
            </FormHelperText>
        </div>
    )
}
