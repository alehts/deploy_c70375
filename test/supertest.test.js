import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080")


describe("Testing Adopme App", () => {

    // describe("Testing Pets Api", () => {

    // })

    describe("Testing login and session with Cookies:", () => {
        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: "Usuario de prueba 2",
                last_name: "Apellido de prueba 2",
                email: "correodeprueba2@gmail.com",
                password: "123456"
            };
        });


        it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
            // Given


            // Then
            const { statusCode,
                ok,
                _body } = await requester.post('/api/sessions/register').send(this.mockUser)
            console.log(statusCode);
            console.log(_body);


            // Assert

            expect(statusCode).is.equal(200)
        })


        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {
            // Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password,
            }



            // Then
            const result = await requester.post('/api/sessions/login').send(mockLogin)

            console.log(result);


            const cookieResult = result.headers['set-cookie'][0]
            // coderCookie="...JWT"
            const cookieData = cookieResult.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }


            // Assert
            expect(this.cookie.name).to.be.ok.and.equal('coderCookie')
            expect(this.cookie.value).to.be.ok

        })



        it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {
            // Given


            // Then
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

            console.log(_body);


            // Assert
            expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email);
        })
    })

})