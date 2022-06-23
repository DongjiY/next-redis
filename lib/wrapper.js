import { getSession } from "./sessions";

export async function getSessionSsr(req){
    var token = req?.cookies?.webapptoken || null
    if(!token){
        token = req?.headers?.authorization || null
    }
    if(!token) return null

    var res = await getSession(token)
    if(!res.success || !res.sessionActive) return null
    res = JSON.parse(res.sessionData)

    return res
}