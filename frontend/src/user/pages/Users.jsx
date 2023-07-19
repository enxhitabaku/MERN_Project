import UsersList from '../components/UsersList'
import AvatarOne from '../../static/images/avatar/avatar-boy-1.png'
import AvatarTwo from '../../static/images/avatar/avatar-boy-2.png'

const DummyUsersList = [
    {
        id: '1',
        fullName: 'Remy John',
        imageSrc: AvatarOne,
        placeCount: 2,
    },
    {
        id: '2',
        fullName: 'John Sina',
        imageSrc: AvatarTwo,
        placeCount: 1,
    },
]

export default function Users() {
    return <UsersList users={DummyUsersList} />
}
