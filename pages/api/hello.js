import { getSessionSsr } from "../../lib/wrapper"

export default async function handler(req, res){
    try{
        const user = await getSessionSsr(req)
        if(!user) throw "No valid user"
        res.status(200).json({ hello:"world" })
    }catch(err){
        res.status(403).json({ msg: "you are not logged in!"})
    }
    
}