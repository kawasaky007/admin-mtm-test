import axios from "axios";

export default {

    uploadFile: async (formData: any) => {
        try {
            const { data } = await axios.post(
                'http://image-service.patitek.com/api/v1/images/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return data;
        } catch (err) {
            throw err;
        }
    }
}