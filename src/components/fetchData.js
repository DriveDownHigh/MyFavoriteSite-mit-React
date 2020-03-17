export default function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then((data) => {
            data.json().then((result) => {
                resolve(result);
            });
        }).catch((ex) => {
            reject(ex);
        });
    });
}
