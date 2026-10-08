const path = 'https://allapi-tan.vercel.app/api'

async function getProducts() {
    return fetch(`${path}/products`)
            .then(data => data.json())
}

async function getContent() {
    return fetch(`${path}/content`)
            .then(data => data.json())
}

async function getCategories() {
    return fetch(`${path}/categories`)
            .then(data => data.json())
}

export {getProducts, getContent, getCategories}
