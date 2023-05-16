import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Ranking.module.css"

import Dropdown from 'react-bootstrap/Dropdown';


export const Ranking = () => {

    const [usersData, setUsersData] = useState([])
    const [myUserData, setMyUserData] = useState([])

    const [followers, setFollowers] = useState('')

    const [filterType, setFilterType] = useState('')
    const [filter, setFilter] = useState('')




    const [hasFollowed, setHasFollowed] = useState(false)
    const [hasUnfollowed, setHasUnfollowed] = useState(false)

    const { filterTypeUrl, filterUrl } = useParams()


    useEffect(() => {
        try {
            const token = localStorage.getItem('accessToken')
            console.log(token)
            fetch(`https://quizzer-react-node-js-app.vercel.app/api/users/getAll`, { //https://quizzer-react-node-js-app.vercel.app
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUsersData(data.users)
                    setMyUserData(data.myUser)
                    setHasFollowed(false)
                    setHasUnfollowed(false)

                    console.log(filterUrl)
                    console.log(filterTypeUrl)

                    if (filterTypeUrl === "rating" || filterTypeUrl === "Rating") {
                        if (filterUrl === "highest") {
                            data.users.sort((a, b) => b.rating - a.rating);
                            setUsersData(data.users)
                        } else if (filterUrl === "lowest") {
                            data.users.sort((a, b) => a.rating - b.rating);
                            setUsersData(data.users)

                        }

                    } else if (filterTypeUrl === "followers" || filterTypeUrl === "Followers") {
                        if (filterUrl === "highest") {
                            data.users.sort((a, b) => Number(b.followers.length) - Number(a.followers.length));
                            setUsersData(data.users)
                        } else if (filterUrl === "lowest") {
                            data.users.sort((a, b) => Number(a.followersNumber) - Number(b.followersNumber));
                            setUsersData(data.users)
                        }

                    } else if (filterTypeUrl === "quizesCreated" || filterTypeUrl === "quizesCreated") {
                        if (filterUrl === "highest") {
                            data.users.sort((a, b) => Number(b.quizesCreated.length) - Number(a.quizesCreated.length));
                            setUsersData(data.users)
                        } else if (filterUrl === "lowest") {
                            data.users.sort((a, b) => Number(a.quizesCreated.length) - Number(b.quizesCreated.length));
                            setUsersData(data.users)
                        }

                        else if (filterTypeUrl === "quizesSolved" || filterTypeUrl === "quizesSolved") {
                            if (filterUrl === "highest") {
                                data.users.sort((a, b) => Number(b.quizesSolved.length) - Number(a.quizesSolved.length));
                                setUsersData(data.users)
                            } else if (filterUrl === "lowest") {
                                data.users.sort((a, b) => Number(a.quizesSolved.length) - Number(b.quizesSolved.length));
                                setUsersData(data.users)
                            }
                        }

                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }
    }, [followers, usersData.followersNumber, hasFollowed, hasUnfollowed, filterType, filter])

    const followButtonThird = (email) => {

        const token = localStorage.getItem('accessToken')
        try {
            fetch(`https://quizzer-react-node-js-app.vercel.app/api/users/${email}/follow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }
                    for (let element of usersData) {
                        if (element.email === email) {
                            element.followersNumber++
                        }
                    }
                    setHasFollowed(true)
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err.message);

                });
        } catch (err) {
            console.log(err)
        }

        console.log(email)
    }



    const unfollowButtonThird = (email) => {

        const token = localStorage.getItem('accessToken')
        try {
            console.log(email)
            fetch(`https://quizzer-react-node-js-app.vercel.app/api/users/${email}/unfollow`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error !== '') {
                        alert(data.error)
                    }

                    for (let element of usersData) {
                        if (element.email === email) {
                            element.followersNumber--;
                        }
                    }

                    setHasUnfollowed(true)

                });


            console.log(email)
        } catch (err) {
            console.log(err)
        }

        console.log(email)
    }

    const onDropdownChange = (e) => {
        setFilterType(e.target.id)
        setFilter(e.target.name)

    }

    const resetButton = () => {
        setFilterType('')
        setFilter('')
    }



    return (



        <>

            <Dropdown className={styles.dropdown}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/rating/highest" onClick={(e) => (onDropdownChange(e))} id="Rating" name="highest">Rating Ascending</Dropdown.Item> {/*   */}
                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/rating/lowest" onClick={(e) => (onDropdownChange(e))} id="Rating" name="lowest">Rating Descending</Dropdown.Item>

                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/followers/highest" onClick={(e) => (onDropdownChange(e))} id="Followers" name="highest">Followers Number Ascending</Dropdown.Item> {/*   */}
                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/followers/lowest" onClick={(e) => (onDropdownChange(e))} id="Followers" name="lowest">Followers Number Descending</Dropdown.Item> {/*   */}

                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/quizesCreated/highest" onClick={(e) => (onDropdownChange(e))} id="quizesCreated" name="highest">Quizes created Ascending</Dropdown.Item> {/*   */}
                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/quizesCreated/lowest" onClick={(e) => (onDropdownChange(e))} id="quizesCreated" name="lowest">Quizes created Descending</Dropdown.Item> {/*   */}

                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/quizesSolved/highest" onClick={(e) => (onDropdownChange(e))} id="quizesSolved" name="highest">Quizes solved Ascending</Dropdown.Item> {/*   */}
                    <Dropdown.Item as={Link} to="http://localhost:3000/ranking/quizesSolved/lowest" onClick={(e) => (onDropdownChange(e))} id="quizesSolved" name="lowest">Quizes solved Descending</Dropdown.Item> {/*   */}

                </Dropdown.Menu>
            </Dropdown>

            <Link to="http://localhost:3000/ranking" onClick={resetButton}><button style={{ marginTop: '20px' }}>Reset Filters</button></Link>

            <div className={styles.tableDiv}>

                <table style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', color: 'black', marginTop: '30px' }}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Rating</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Quizes Created</th>
                        <th>Quizes Solved</th>

                    </tr>

                    {usersData ? usersData.map((user) =>

                        myUserData._id === user._id
                            ?
                            <tr key={user._id} style={{ background: 'lightGreen' }}>
                                <Link to={`http://localhost:3000/profile/${user.email}`}><td style={{ textDecoration: 'underline' }}>{user.firstName} {user.lastName}</td></Link>
                                <td>{user.email}</td>
                                <td>{user.rating}</td>
                                <td>{user.followersNumber}</td>
                                <td>{user.followingNumber}</td>
                                <td>{user.quizesCreated.length}</td>
                                <td>{user.quizesSolved.length}</td>
                                {myUserData._id === user._id ? <td>-</td>
                                    :
                                    user.followers.includes(myUserData._id) ?
                                        < td >* Following *</td> : <td>-</td>
                                }

                                {myUserData._id === user._id ? <td>-</td>
                                    :

                                    user.followers.includes(myUserData._id)
                                        ?
                                        <button onClick={(email) => unfollowButtonThird(user.email)}>Unfollow</button>
                                        :
                                        <button onClick={(email) => followButtonThird(user.email)}>Follow</button>

                                }
                            </tr>


                            :
                            <tr key={user._id} >
                                <Link to={`http://localhost:3000/profile/${user.email}`}><td style={{ textDecoration: 'underline' }}>{user.firstName} {user.lastName}</td></Link>
                                <td>{user.email}</td>
                                <td>{user.rating}</td>
                                <td>{user.followersNumber}</td>
                                <td>{user.followingNumber}</td>
                                <td>{user.quizesCreated.length}</td>
                                <td>{user.quizesSolved.length}</td>
                                {myUserData._id === user._id ? <td>-</td>
                                    :
                                    user.followers.includes(myUserData._id) ?
                                        < td >* Following *</td> : <td>-</td>
                                }

                                {myUserData._id === user._id ? <td>-</td>
                                    :

                                    user.followers.includes(myUserData._id)
                                        ?
                                        <button onClick={(email) => unfollowButtonThird(user.email)}>Unfollow</button>
                                        :
                                        <button onClick={(email) => followButtonThird(user.email)}>Follow</button>

                                }
                            </tr>
                    ) : ''}
                </table>

            </div >
        </>

    )
}