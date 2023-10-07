import { create } from "ipfs-http-client";

const ipfs = create({ host: "localhost", port: 5001, protocol: "http" });

export const UploadJsonToIPFS = async (jsonObject: any) => {
  const jsonBuffer = Buffer.from(JSON.stringify(jsonObject));
  const result = await ipfs.add(jsonBuffer);
  console.log("JSON object uploaded:", result);
  return result.path;
};

//NON FUNZIONA, USARE UPLOADFILETOIPFS
//export const UploadImageToIPFS = async (file: File) => {
//  const fileBuffer = await file.arrayBuffer();
//  const result = await ipfs.add(Buffer.from(fileBuffer));
//  console.log("File uploaded:", result);
//  return result.path;
//};

export const UploadFileToIpfs = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const result = await ipfs.add(Buffer.from(fileBuffer));

  console.log("File uploaded:", result.path);
  return result.path;
};

export const GetFileFromIpfs = async (cid: string) => {
  const chunks = [];

  for await (const chunk of ipfs.cat(cid)) {
    chunks.push(chunk);
  }
  console.log("chunks", chunks);
  const textData = new TextDecoder().decode(Buffer.concat(chunks));
  console.log("textData", textData);  
  const jsonData = JSON.parse(textData);
  return jsonData;
};


export async function checkENSName(provider, address: string) {
  try {
    const ensName = await provider.lookupAddress(address);
    if (ensName) {
      console.log(` Address: ${address} has ENS: ${ensName}`);
      return ensName;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(` Failed to lookup ENS for ${address}: ${error}`);
  }
}
