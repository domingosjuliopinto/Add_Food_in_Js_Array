const bcrypt = require('bcrypt')

const registeredNames = []
const registeredEmails = []

const controller = {
    register : async(req,res)=>{
        try{
            const {id, name, email, password} = req.body

            if(!name || !email || !password || !id)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid email id."})

            if(!validateName(name))
                return res.status(400).json({msg: "Invalid name."})

            if(!validatePassword(password))
                return res.status(400).json({msg: "Password condition not fulfilled"})

            const passwordHash = await bcrypt.hash(password, 12)
             const nameTrim = name.trim()

            const newStudent = {
                id:id, name:nameTrim, email:email, password: passwordHash
            }

            registeredNames.push(newStudent)
            registeredEmails.push(email)

            return res.status(200).json({msg : "Registered Successfully"})

        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await registeredEmails.includes(email)
            if(!user) return res.status(400).json({msg: "This email or password is incorrect."})

            for(i=0;i<registeredNames.length;i++){
                if(registeredNames[i].email===email){
                    //return res.status(200).json({msg: "Reached here"})
                    const isMatch = await bcrypt.compare(password, registeredNames[i].password)
                    if(!isMatch){
                        return res.status(400).json({msg: "This email or password is incorrect."})
                    }else{
                        return res.status(200).json({msg: "Login success!"})
                    }
                }
            }

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateName(name) {
    const re = /^[a-zA-Z]+[a-zA-Z ]*$/;
    return re.test(name);
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}
module.exports = controller