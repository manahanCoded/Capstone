import db from "../../Database/DB_Connect.mjs"


const allMails = async(req,res)=>{
    const response = await db.query("SELECT * FROM mail")

    res.status(200).json(response.rows)
}

const sendMails = async(req,res)=>{
    const {admin, aplicant_name,  reply, type, date} = req.body

    const response = await db.query("INSERT INTO mail (admin , aplicant_name, reply, type, date) VALUES ($1, $2, $3, $4, $5)", 
        [admin, aplicant_name,  reply, type, date]
    )

    res.status(200).json(response.rows)
}

export {allMails , sendMails}