module.exports = {
    port:4400,
    session:{
        secret:'Appliance',
        key:'Appliance',
        maxAge:259200000
    },
    mongodb:'mongodb://localhost:27017/Appliance'
}