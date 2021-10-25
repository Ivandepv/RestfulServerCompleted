import jwt from 'jsonwebtoken';

export const generarJWT = (uid:string)=>{
    return new Promise((resolve, reject) =>{
        
        const payload:{uid: string} = {uid};
        const secretKey: string | undefined = process.env.SECRETORPRIVATEKEY;

        jwt.sign(payload, secretKey as string, {
            expiresIn: '4h'
        }, (err: Error | null, token: string | undefined)=>{
            if(err){
                console.log(err);
                reject('no se pudo generar el token');
            }else{
                resolve(token);
            }
        });
 
    })
   
}