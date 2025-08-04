const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    first_name : {
        type : String,
        require : true
    },
    last_name : {
        type : String,
        require : true
        
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    phone : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        enum : ["Male", "Female", "Other"],
        require : true
    },
    profile_pic : {
        type : String,
        
    }
})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student

//When create email dublicate key error then find the detabase error and solve the first of all.
//you can use the some points in detabase.
//As first point of the.
//1st----- db.detabaseName.getIndexes()
//2nd------db.detabaseNmae.dropIndex("that drop data")
//3rd------db.detabaseName.createIndex({And new data create, and unique: true})