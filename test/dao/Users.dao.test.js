import mongoose from 'mongoose'
import UserDao from '../../src/dao/Users.dao.js'
import Assert from 'assert'

mongoose.connect(`mongodb://localhost:27017/clase40-adoptme-test?retryWrites=true&w=majority`)

const assert = Assert.strict;


describe('Testing Users DAO', () => {

    before(function () {
        this.userDao = new UserDao()
    })

    beforeEach(function () {
        this.timeout(5000)// tiempo de espera ya que estamos consultando una DB

        //limpiamos la DB
        mongoose.connection.collections.users.drop()
    })

    it('El dao debe devolver los usuarios en formato de arreglo.', async function () {
        //01_ Given
        const isArray = true

        //02_ Then
        const result = await this.userDao.get()
        // console.log("result: ", result);


        //03_ Assert
        assert.strictEqual(Array.isArray(result), isArray)

    })



    it('El Dao debe agregar el usuario correctamente a la BD.', async function () {
        //01_ Given
        let mockUser = {
            first_name: "Usuario de prueba 1",
            last_name: "Apellido de prueba 1",
            email: "correodeprueba1@gmail.com",
            password: "123456"
        }

        //02_ Then
        const result = await this.userDao.save(mockUser)
        // console.log(result);


        //03_ Assert
        assert.ok(result._id)

    })



    afterEach(function () {
        //limpiamos la DB
        mongoose.connection.collections.users.drop()
    })
})