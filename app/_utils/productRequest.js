export const getLatestProducts_ =()=>{
        ProductApis.getLatestProducts().then(res=>{
         
            setProductList(res.data.data)
            console.log('res',res);
            
        })

    }