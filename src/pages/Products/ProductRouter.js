import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Manufacture from "./Manufacture";



export function ProductRouter(){
    return(
        <>
            <Routes>
                <Route path="/category" element={<Category />}/>
                <Route path="/subcategory" element={<SubCategory />}/>
                <Route path="/product" element={<Products />}/>
                <Route path="/manufacture" element={<Manufacture />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
                
                
            </Routes>

        </>
    )

}