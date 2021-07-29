import { axiosClient } from './axiosClient';

const NewApi = {
    getAll(){
        const url = `/news`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/news/${id}`;
        return axiosClient.get(url);
    },
    add(news){
        const url = `/news`;
        return axiosClient.post(url, news);
    },
    remove(id) {
        const url = `news/${id}`;
        return axiosClient.delete(url);

    },
    update(id, data) {
        const url = `news/${id}`;
        return axiosClient.put(url, data);
    }
}
export default NewApi;