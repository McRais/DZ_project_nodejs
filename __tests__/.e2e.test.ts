import request from 'supertest';

/*describe('/users', () => {
    beforeAll(async () => {
        await client.connect();

        await usersCollection.deleteMany({});
        await usersCollection.insertOne({
            name: 'User',
            login: '123456',
            passwordHash: 'some hash',
        } as UserType);
    });

    afterAll(async () => {
        await client.close();
    });

    describe('GET', () => {
        it('GET users', async () => {
            const res = await request(app).get('/users').expect(200);
            expect(res.body[0].name).toBe('User'); //
        });
    });

    describe('POST', () => {
        it('+ POST create the user with correct data', async function () {
            const res = await request(app)
                .post('/users')
                .send({
                    name: 'Egor', //
                    login: 'company', //
                    password: 'qwerty',
                })
                .expect(201);
            expect(res.body.name).toBe('Egor');
            expect(res.body.login).toBe('company');
        });
    });
});*/