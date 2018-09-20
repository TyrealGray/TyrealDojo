import jimp from 'jimp';
import {Buffer} from 'buffer';

document.getElementById('uploadImage').addEventListener('change', () =>{

	const file = document.getElementById('uploadImage').files[0];
	const reader = new FileReader();

	reader.onload = async () => {
		const rawData = reader.result;
		try {
			const dataStr = rawData.slice(rawData.indexOf('base64') + 7);
			const buff = Buffer.from(dataStr, 'base64');
			const image = await new jimp.read(buff);

			const imageWidth = image.bitmap.width,
				imageHeight = image.bitmap.height;

			console.log(imageWidth , imageHeight);

			let edgeWidth = parseFloat(document.getElementById('edgeWidth').value);

			if(edgeWidth < 0){
				edgeWidth = 0;
			}

			new jimp(imageWidth + edgeWidth * 2, imageHeight + edgeWidth * 2, '#FFFFFF', async (err, frame) => {
				if(err){
					console.error(err);
					return;
				}

				frame.composite( image, edgeWidth, edgeWidth );

				const outputBase64Str = await frame.getBase64Async(Jimp.MIME_JPEG);

				document.getElementById('result').setAttribute('src',outputBase64Str);
			});
		}catch (e) {
			console.error(e);
		}

	};

	reader.readAsDataURL(file);
});