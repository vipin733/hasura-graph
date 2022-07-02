class User {
    
    getUsers(values) {
        const query = {
            text: `SELECT * FROM  "default"."users" LIMIT $1 OFFSET $2`,
            values
        }
        return query
    }

    getUsersByIds(values) {
        const query = {
            text: `SELECT * FROM  "default"."users" WHERE id  IN ($1)`,
            values
        }
        return query
    }

    getUserByRadius(values = []) {
        let text = `SELECT * 
        FROM "default"."users_tracking"
        WHERE acos(
               sin(radians($1)) 
                 * sin(radians(lat)) 
               + cos(radians($1)) 
                 * cos(radians(lat)) 
                 * cos( radians($2)
                   - radians(lng))
               ) * 6371 <= $3;`
        
        return {
            text, 
            values
        }
     
    }

    getUsersCountQuery() {
        return {
            text: `SELECT COUNT(*) FROM "default"."users"`,
            values: []
        }
    }


    getUsersWithLocation(users = [], locations = []) {
        users = users.map(user => {
            let location = locations.find(location => location.user_id == user.id)
            let lat = ""
            let lng = ""
            if (location) {
                lat = location.lat
                lng = location.lng
            }
            user = {...user, location: {
                lat, lng
            }}

            return user
        })

        return users
    }
}

module.exports = User