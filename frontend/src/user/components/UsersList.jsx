import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import UserItem from './UserItem'

/**
 * React functional component to render a list of users.
 * @component
 * @param {{users: User[]}} users
 * @returns {JSX.Element}
 */
export default function UsersList({ users }) {
    if (users?.length === 0) {
        return (
            <section id="users-list-section">
                <Alert severity="info">
                    <AlertTitle>No Records Found</AlertTitle>
                    No user records have been entered at this time.
                </Alert>
            </section>
        )
    }

    return (
        <section id="users-list-section">
            <ul>
                {users.map((user) => {
                    return <UserItem key={user.id} user={user} />
                })}
            </ul>
        </section>
    )
}
