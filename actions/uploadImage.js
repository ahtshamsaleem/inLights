// import { getFormData } from "@/lib/getFormData";
// import { put } from "@vercel/blob";
// //Upload Image
// export async function UploadImage(formData) {
// 	const { imgFile } = getFormData(formData, "imgFile");

// 	// console.log(imgFile, "THE IMAGE FILE");

// 	try {
// 		const blob = await put(imgFile.name, imgFile, {
// 			access: "public",
// 		});

// 		return {
// 			percent: 100,
// 			status: "done",
// 			...blob,
// 		};
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			status: "error",
// 		};
// 	}
// }
