var config = {
    expressPort: 3000,
    client: {
        mongodb: {
            defaultDatabase: "nodeAppointmentsAPI",
            defaultUri: "mongodb://localhost:27017"
        },
    }
};

module.exports = config;