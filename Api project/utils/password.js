import bcrypt from 'bcryptjs'
export const plainToHash = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
export const hashToPlain = async(password, hash_pass) =>{
    return await bcrypt.compare(password,hash_pass)
}