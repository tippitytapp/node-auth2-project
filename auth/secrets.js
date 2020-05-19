require('dotenv').config();

module.exports={
    jwtSecret = process.env.JWT_SECRET || "ThIs1sM45up3r53cr3tP@$$w0rd",
    cooSecret = process.env.COOKIE_SECRET || "ThIs1sM45up3r53cr3tC00k13P@$$w0rd"
}