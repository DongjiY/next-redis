import { getSessionSsr } from "../../lib/wrapper";

export default async function handler(req, res){
    const user = await getSessionSsr(req)
    console.log(user)
    if(!user){
        res.json({
            isLoggedIn: false,
        })
    }else{
        res.json({
            isLoggedIn: true,
            userData: user,
        })
    }
}