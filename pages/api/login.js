import { setSession } from "../../lib/sessions"
import cookie from 'cookie'

export default async function(req, res){
    if(req.method === "POST"){
        const { username, password } = await req.body
        console.log('this came to server',username,password)
        // this is where you do your database calls
        if(username === "dongji" && password === "dogsarecute"){
            const userDataFromDB = { // this data would come from the database
                email: 'dongjiSmallBrain@gmail.com',
                username: 'dongjiyang',
                uid: 1,
            }

            const tokenObj = await setSession(userDataFromDB)
            const token = tokenObj.session
            res.setHeader("Set-Cookie", cookie.serialize("webapptoken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60*60*24*5,
                sameSite: "strict",
                path: "/"
            }))
            res.statusCode = 200
            res.json({ success: true })
        }else{
            // send back an error message
            res.status(500).json({ msg: 'username or password incorrect'})
        }
    }else{
        res.status(401).json({msg: "we only take post requests!"})
    }
}