import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'
import Berat from '../../static/images/places/berat.jpg'

/**@type {Place[]}*/
const DummyPlaceList = [
    {
        id: '1',
        title: 'Berat View',
        description: 'Nice view.',
        imageSrc: Berat,
        adddress: 'Berat',
        location: {
            latitude: 41,
            longtitude: 20,
        },
        creatorId: '1',
    },
]

export default function UserPlaces() {
    const userId = useParams().userId

    function loadedPlaces() {
        return DummyPlaceList.filter((place) => {
            return place.creatorId === userId
        })
    }

    return (
        <>
            <PlaceList places={loadedPlaces()} />
        </>
    )
}
