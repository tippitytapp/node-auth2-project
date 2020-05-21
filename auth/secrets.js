require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET || "ThIs1sM45up3r53cr3tP@$$w0rd";
const cooSecret = process.env.COOKIE_SECRET || "ThIs1sM45up3r53cr3tC00k13P@$$w0rd"

module.exports={
    jwtSecret,
    cooSecret
}
