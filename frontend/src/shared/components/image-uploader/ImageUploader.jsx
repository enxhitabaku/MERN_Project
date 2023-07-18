import { useEffect, useState } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const fileWhiteList = ['image/jpg', 'image/jpeg', 'image/png']
const fileMaxSize = 256000 //256KB

export default function ImageUploader() {
    const [fileList, setFileList] = useState([])

    function shouldAllowFile(file) {
        return (
            fileWhiteList.includes(file.file.type) &&
            fileMaxSize >= file.file.size
        )
    }

    return (
        <div className="App">
            <FilePond
                required={true}
                storeAsFile={true}
                files={fileList}
                allowMultiple={false}
                maxFiles={1}
                beforeDropFile={shouldAllowFile}
                beforeAddFile={shouldAllowFile}
                onupdatefiles={setFileList}
                name="image-uploader"
                labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
            />
            <FormHelperText>
                Allowed image format: {fileWhiteList.join('; ')} <br />
                Max. image size: {fileMaxSize}KB
            </FormHelperText>
        </div>
    )
}
