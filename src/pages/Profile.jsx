import React, { useState } from 'react';

function Profile(props) {
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const [imgUrl, setImgUrl] = useState();

    const handleImageUpload = async (e) => {
        let imageStr = await convertBase64(e.target.files[0]);
        setImgUrl(imageStr);
    }

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <img src={imgUrl} alt="" />
        </div>
    );
}

export default Profile;