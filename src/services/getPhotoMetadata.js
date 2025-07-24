export async function getPhotoMetadata(photoURL) {
    try {
        const response = await fetch(photoURL, { method: 'HEAD' });

        const contentType = response.headers.get('Content-Type');
        const contentLength = response.headers.get('Content-Length');
        const fileName = photoURL.split('/').pop();

        return {
            name: fileName,
            urlId: fileName,
            size: parseInt(contentLength, 10),
            type: contentType,
        };
    } catch (error) {
        console.error('Error fetching photo metadata:', error);

        return {
            name: "",
            urlId: "",
            size: 100,
            type: "",
        };
    }
}