import { Avatar, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import '../styles/user-style.css'

/**
 * React functional component to render a user entity within a Card.
 * @component
 * @param {{user: User}} user
 * @returns {JSX.Element}
 * */
export default function UserItem({ user }) {
    function generatePlaceCountLabel() {
        return user.placeCount === 1 ? 'Place' : 'Places'
    }

    return (
        <li className="user-list-item">
            <Card>
                <Link to={`/${user.id}/places`}>
                    <CardContent className="card-content">
                        <Avatar
                            alt={user.fullName}
                            src={user.imageSrc}
                            size="lg"
                        />
                        <div>
                            <h1 className="full-name-container">
                                {user.fullName}
                            </h1>
                            <h2 className="place-count-container">
                                <strong>{user.placeCount}</strong>
                                &nbsp;
                                {generatePlaceCountLabel()}
                            </h2>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </li>
    )
}
