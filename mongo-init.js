db.createUser(
    {
        user: "aplication",
        pwd: "123456",
        roles: [
            {
                role: "readWrite",
                db: "smartranking"
            }
        ]
    }
);