import Router from 'next/router'
import useUser from '../lib/useUser'
import { getSessionSsr } from '../lib/wrapper'

export async function getServerSideProps({ req }){
    const user = await getSessionSsr(req)

    if(!user){
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            }
        }
    }

    return {
        props: { user }
    }
}

export default function Dashboard({ user }){
    const validate_user = useUser({
        redirectTo: "/signin",
    })

    return (
        <>
            <h1>This is the dashboard</h1>
            <h2>You should only see this if you are logged in</h2>
            <p>{JSON.stringify(user)}</p>
            <br>
            </br>
            <p>{JSON.stringify(validate_user)}</p>
            <button onClick={() => {
                fetch('/api/logout')
                .then(res => res.json())
                .then(data => {
                    if(data.success){
                        Router.push('/signin')
                    }
                })
                .catch(err => console.error(err))
            }}>LOG ME OUT</button>
        </>
    )
}