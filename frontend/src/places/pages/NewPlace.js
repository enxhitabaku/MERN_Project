import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, CardActions } from '@mui/material'

import ImageUploader from '../../shared/components/image-uploader/ImageUploader'

export default function AddPlace() {
    return (
        <section id="new-place-section">
            <Card>
                <CardContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        id="form-container"
                    >
                        <ImageUploader />
                        <TextField
                            required
                            id="title-field"
                            label="Title"
                            defaultValue=""
                        />
                        <TextField
                            id="description-field"
                            label="Description"
                            multiline
                            rows={8}
                            defaultValue=""
                            variant="filled"
                        />
                        <div id="coordinates-fields-container">
                            <TextField
                                required
                                id="latitude-field"
                                label="Latitude"
                                type="number"
                            ></TextField>
                            <TextField
                                required
                                id="longtitude-field"
                                label="Longtitude"
                                type="number"
                            ></TextField>
                        </div>
                    </Box>
                </CardContent>
                <CardActions>
                    <div
                        id="form-action-buttons-container"
                        className="important-action-buttons-container"
                    >
                        <Button size="small" variant="contained">
                            Save
                        </Button>
                        <Button size="small" variant="contained" color="error">
                            Discard
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </section>
    )
}
