import Router from "next/router"

export default function Signin(){

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.currentTarget.username.value, e.currentTarget.password.value)
        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }
        fetch('/api/login', {
            headers: {
                "Content-Type": 'application/json',
            },
            method: "POST",
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(data => {
            if(data.success){
                Router.push("/dashboard")
            }
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <div>
                <h1>Login to your webapp!</h1>
                <form onSubmit={handleSubmit}>
                    <label>Username
                        <input name="username" type="text" placeholder="Your username here..."/>    
                    </label>
                    <label>Password
                        <input name="password" type="password" placeholder="Your password here..."/>
                    </label>
                    <button type="submit">Log In!</button>
                </form>
            </div>
            
        </>
    )
}