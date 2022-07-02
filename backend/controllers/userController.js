const { pool } = require("../database/config")
const User = require("../models/User")

const message = {
    serverError: "server error"
}

class UserController {

    constructor(req, res){
        this.req = req
        this.res = res
        this.pool = pool
        this.body = this.req.body.input
    }

    async getUsers() {
        let client = await this.pool.connect()
       
        try {
            //input
            let paginateInput = this.body.paginate
            let current_page_no = paginateInput.page_no ? paginateInput.page_no : 1
            let limit = paginateInput.limit ? paginateInput.limit : 10
            let total_page = 0

            //query model for user
            let userModel = new User()
            let countQuery = userModel.getUsersCountQuery()
            let responseC = await client.query(countQuery.text, countQuery.values)
            let users = []
            if (responseC.rowCount) {
                let total = responseC.rowCount
                total_page = Math.ceil(total/limit)
                let offset = (current_page_no - 1) * limit
                let usersQuery = userModel.getUsers([limit, offset])
                const response = await client.query(usersQuery.text, usersQuery.values)
                users = response.rows
            }

            client.release()
            return this.res.status(200).json({
                users,
                total_page,
                current_page_no
            })
        } catch (error) {
            client.release()
            return this.res.status(500).json({
                message: message.serverError
            })
        }
    }

    async getUsersByRadius() {
        let client = await this.pool.connect()
        try {
            let radius = this.body.radius
            let {LAT, LNG} = process.env

            //query model for user
            let userModel = new User()
            let query = userModel.getUserByRadius([LAT, LNG, radius])
            let response = await client.query(query.text, query.values)
            let users = []
            let rows = response.rows
            if (response.rowCount) {
                let userIds = []
                for (let index = 0; index < rows.length; index++) {
                    const element = rows[index];
                    userIds.push(element.user_id)
                }
                userIds = userIds.join(',')
                let userQuery = userModel.getUsersByIds([userIds])
                response = await client.query(userQuery.text, userQuery.values)
                users = userModel.getUsersWithLocation(response.rows, rows);
            }
            client.release()
            return this.res.status(200).json(users)
        } catch (error) {
            client.release()
            return this.res.status(500).json({
                message: message.serverError
            })
        }
    }
}

module.exports = UserController