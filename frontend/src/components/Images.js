
import React from 'react';
const axios = require('axios');




const Images = () => {

    const onUpload = async (e) => {
        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const filereader = new FileReader();
                filereader.readAsDataURL(file);

                filereader.onload = () => {
                    resolve(filereader.result);
                }
                filereader.onerror = (error) => {
                    reject(error);
                }
            }

            )
        }
        function utf8_decode(strData) {
            const tmpArr = []
            let i = 0
            let c1 = 0
            let seqlen = 0
            strData += ''
            while (i < strData.length) {
                c1 = strData.charCodeAt(i) & 0xFF
                seqlen = 0
                if (c1 <= 0xBF) {
                    c1 = (c1 & 0x7F)
                    seqlen = 1
                } else if (c1 <= 0xDF) {
                    c1 = (c1 & 0x1F)
                    seqlen = 2
                } else if (c1 <= 0xEF) {
                    c1 = (c1 & 0x0F)
                    seqlen = 3
                } else {
                    c1 = (c1 & 0x07)
                    seqlen = 4
                }
                for (let ai = 1; ai < seqlen; ++ai) {
                    c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F))
                }
                if (seqlen === 4) {
                    c1 -= 0x10000
                    tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)))
                    tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
                } else {
                    tmpArr.push(String.fromCharCode(c1))
                }
                i += seqlen
            }
            return tmpArr.join('')
        }
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const base64utf = utf8_decode(base64);
        axios.post('http://127.0.0.1:5000/api/v1/users', {
            datos: base64utf
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);

            });
    }

    return (
        <><input type="file" onChange={(e) => {
            onUpload(e);
        }} >
        </input></>
    );
}


export default Images;