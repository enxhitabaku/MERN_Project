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
        creatorId: 'anonymous123',
    },
]

export default function UserPlaces() {
    return (
        <>
            <PlaceList places={DummyPlaceList} />
        </>
    )
}
