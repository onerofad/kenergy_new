import axios from "axios"

     export const getUsers = () => {
        return(
            axios.create({
                baseURL: 'https://kenergydb-eight.vercel.app/api/registerusers/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

     export const getItems = () => {
        return(
            axios.create({
                baseURL: 'https://kenergydb-eight.vercel.app/api/items/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getSuppliers = () => {
        return(
            axios.create({
                baseURL: 'https://kenergydb-eight.vercel.app/api/suppliers/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getInventory = () => {
        return(
            axios.create({
                baseURL: "https://kenergydb-eight.vercel.app/api/inventories/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getSales = () => {
        return(
            axios.create({
                baseURL: "https://kenergydb-eight.vercel.app/api/sales/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getSalesToday = () => {
        return(
            axios.create({
                baseURL: "https://kenergydb-eight.vercel.app/api/sales_today/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getExpense = () => {
        return(
            axios.create({
                baseURL: "https://kenergydb-eight.vercel.app/api/expenses/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getExpensesToday = () => {
        return(
            axios.create({
                baseURL: "https://kenergydb-eight.vercel.app/api/expenses_today/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

     export const getPrices = () => {
        return(
            axios.create({
                baseURL: "https://kenergydb-eight.vercel.app/api/prices/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }
   


