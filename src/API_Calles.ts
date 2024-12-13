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