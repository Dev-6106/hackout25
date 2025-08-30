import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import uploadToCloudinary from "../../cloudinary/page";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save to tmp local file
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = path.join("/tmp", file.name);
    fs.writeFileSync(tempFilePath, buffer);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(tempFilePath);

    if (!result || !result.url) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    // ✅ Return only JSON url
    console.log("Route.js done",result.url)
    return result.url;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}