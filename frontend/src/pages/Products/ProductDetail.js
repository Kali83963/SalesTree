import React from 'react'
import { useParams } from 'react-router-dom'
const data = [{id:1,product_image:"https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.large.jpg",product_name:"Iphone 14",category_name:"Electronics",subcategory_name:"Microwave",barcode:"978123456",manufacture_name:"Pearl Industries",price:"2,205",unit:"PC",sku:"PT009",description:"lorepusm"}]

function makeStringReadable(inputString) {
   
    const cleanedString = inputString.replace(/[_0-9]/g, ' ');
  
    
    const readableString = cleanedString.replace(/\b\w/g, (char) => char.toUpperCase());
  
    return readableString;
  }
  
  // Example usage:
  const inputString = "example_string_123";
  const result = makeStringReadable(inputString);
  console.log(result);
  


function ProductDetail() {
  const { id } = useParams();
// Temp
  const product = data[0];
  const keys = Object.keys((product)).filter(key => key !== 'id' && key !== 'product_image');
  console.log(keys)
  return(
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between flex-wrap gap-4">

            <div className="text-start">
                <h2 className="text-lg text-primary font-semibold">Product Detail</h2>
                <span className="text-sm">Full Detail Of A Product</span>
            </div>
        </div>
        <div className='container md:flex md:items-center md:justify-center'>
            <div className="bg-white md:w-1/2 rounded-md mt-6 shadow-md">
                
                <div className='w-full h-44 md:h-64 min-h-full max-h-96  overflow-hidden rounded-xl mb-2'>
                    <img src={product.product_image} className='h-full w-full object-cover'/>
                </div>
                <div className='w-full'>
                    {keys.map(key =>
                        <> 
                            <p className='flex items-center justify-between w-full p-3 text-start'>
                                <span className='font-semibold'>{makeStringReadable(key)}</span>
                                <span className='w-1/4'>{product[key]}</span>
                            </p>    
                            <hr />
                        </>
                    ) }
                    
                </div>  
            </div>
            
        </div>

        
    </div>
    )
}

export default ProductDetail