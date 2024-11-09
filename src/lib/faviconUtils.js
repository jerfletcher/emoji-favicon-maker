import JSZip from 'jszip';

export const convertToFavicon = (emoji, name, fontClass) => {
    const sizes = [16, 32, 48, 180];
    const zip = new JSZip();

    sizes.forEach(size => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
        ctx.font = `${size * 0.75}px ${fontClass}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

        canvas.toBlob(blob => {
            const fileName = size === 180 ? `${name}_180.png` : `${name}_${size}.ico`;
            zip.file(fileName, blob);
            if (size === sizes[sizes.length - 1]) {
                createManifestAndDownload(zip, name);
            }
        }, size === 180 ? 'image/png' : 'image/x-icon');
    });
};

export const createManifestAndDownload = (zip, name) => {
    const manifest = {
        icons: [
            { src: `${name}_16.ico`, sizes: "16x16", type: "image/x-icon" },
            { src: `${name}_32.ico`, sizes: "32x32", type: "image/x-icon" },
            { src: `${name}_48.ico`, sizes: "48x48", type: "image/x-icon" },
            { src: `${name}_180.png`, sizes: "180x180", type: "image/png" }
        ]
    };
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));

    zip.generateAsync({ type: 'blob' }).then(content => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}_favicons.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
};