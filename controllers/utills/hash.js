const bcrypt=require('bcrypt')

async function hash(pass){
    const saltRound=10
    try{
        const hashedText=await bcrypt.hash(pass,saltRound)
        return hashedText;

    }catch(e){
        console.log('[+] Unable to hash password')
    }
}

async function verifyHash(text,hashedText){
    try{
        const match=await bcrypt.compare(text,hashedText)
        return match
    }catch(e){
        console.log('[+]Unable to verifyHash')
        return false
    }
}

module.exports={hash,verifyHash}