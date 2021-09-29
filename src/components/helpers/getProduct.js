export const getProduct = async (category) => {
    const URLBYCATEGORY = `http://localhost:8080/products/category/${category}`
    const URLALL = 'http://localhost:8080/products/all'
    const resp = category === "All" ? await fetch(URLALL) : await fetch(URLBYCATEGORY)
    const data = await resp.json()
    return data 
}