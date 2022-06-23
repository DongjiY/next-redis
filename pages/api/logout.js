import { destroySession } from "../../lib/sessions";
import cookie from 'cookie'

export default async function handler(req, res){
    try{
        const status = await destroySession(req.cookies.webapptoken)
        if(!status.success) throw "Couldn't del from redis"
        
        res.setHeader("Set-Cookie", cookie.serialize("webapptoken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            sameSite: "strict",
            path: "/"
        }))
        res.statusCode = 200
        res.json({ success: true })
    }catch(err){
        res.status(500).json({ success: false, msg: "failed to del sess" })
    }
    
}