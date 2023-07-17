import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import PlaceItem from './PlaceItem'

/**
 * React functional component to render a list of places.
 * @component
 * @param {{places: Place[], {string} creatorId, {Location}coordinates}}
 * @returns {JSX.Element}
 */
export default function PlaceList({ places, creatorId, coordinates }) {
    if (places?.length === 0) {
        return (
            <section id="place-list-section">
                <Alert severity="info">
                    <AlertTitle>No Records Found</AlertTitle>
                    No place records have been entered at this time.
                </Alert>
            </section>
        )
    }

    return (
        <section id="place-list-section">
            <ul>
                {places.map((place) => {
                    return <PlaceItem key={place.id} place={place} />
                })}
            </ul>
        </section>
    )
}
