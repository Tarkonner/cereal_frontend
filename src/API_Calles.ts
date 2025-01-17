const {VITE_BASE_URI} = import.meta.env
import axios, {AxiosResponse} from "axios";

export async function fetchAllCereals() {
    const res : AxiosResponse = await axios.get(VITE_BASE_URI + "cereal")
    return  res.data
}

export async function fetchAllPackageInfo() {
    const res : AxiosResponse = await axios.get(VITE_BASE_URI + "cereal/product_info")
    return res.data
}

export async function fetchNutritionLabel(id : number) {
    const URL = `${VITE_BASE_URI}cereal/NutritionLabel/${id}`
    console.log(URL)
    try {
        const res : AxiosResponse = await axios.get(URL)
        return res.data
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export async function fetchImage(id : number) {
    const URL = `${VITE_BASE_URI}images/${id}`;
    try
    {
        const  res : AxiosResponse = await axios.get(URL)
        return res.data
    }
    catch(err){
        console.log(err)
        throw err;
    }

}