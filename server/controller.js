const houses = require('./db.json')
let globalId = 4


module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        const index = houses.findIndex((house) => {
            return house.id === +id
        })
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body

        const newHouse = {
            id: globalId,
            address: address,
            price: price,
            imageURL: imageURL
        }
        houses.push(newHouse)
        globalId++
        res.status(200).send(houses)

    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body

        const index = houses.findIndex((house) => {
            return house.id === +id
        })

        const currPrice = houses[index].price

        if(currPrice === 0 && type === 'minus') {
            res.status(400).send('House price cannot go below $0')
        } else if (type === 'plus') {
            houses[index].price = houses[index].price + 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price = houses[index].price - 10000
            res.status(200).send(houses)
        }
    }
}