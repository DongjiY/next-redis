//all of our session connection logic
var crypto = require('crypto')
import client from './redis'

export function generateToken(length=16){
    return crypto.randomBytes(length).toString('base64')
}

export async function setSession(obj, exp=60){
    const insertVal = JSON.stringify(obj)

    try{
        let insertRes
        do{
            var sessionID = generateToken()
            insertRes = await client.set(`session:${sessionID}`, insertVal, 'EX', exp, 'NX')
        }while(insertRes !== 'OK')

        return {
            success: true,
            session: sessionID
        }
    }catch(err){
        console.log('ERR:',err)
        return { success: false }
    }
}

export async function getSession(sessionID=null){
    if(!sessionID) return { success: false }

    try{
        let val = await client.get(`session:${sessionID}`)
        if(!val){
            throw "No session found!"
        }else{
            return {
                success: true,
                sessionActive: true,
                sessionData: val,
            }
        }
    }catch(err){
        console.log("ERR:", err)
        return { success: false }
    }
}

export async function destroySession(sessionID){
    try{
        let status = await client.del(`session:${sessionID}`)

        return {
            success: true,
        }
    }catch(err){
        console.log("ERR:", err)
        return { success: false }
    }
}