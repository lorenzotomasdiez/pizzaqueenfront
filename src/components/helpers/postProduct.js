export const postProduct = async (product) => {
    const URL = 'http://localhost:8080/products/save'
    const options = {
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(product)
    }
    await fetch(URL, options)
        .then(res=>console.log('PRODUCTO GUARDADO', res))
        .catch(error=>console.log('ERROR AL INTENTAR GUARDAR PRODUCTO: ', error))
}