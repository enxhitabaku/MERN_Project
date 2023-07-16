import UserItem from './UserItem'

/**
 * React functional component to render a list of users.
 * @component
 * @param {{users: User[]}} users
 * @returns {JSX.Element}
 */
export default function UsersList({ users }) {
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
