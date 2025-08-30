"use client"
import React, { useState } from "react";
import supabase from "../supabase-client";

const page = () => {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [fileUrl, setFileUrl] = useState("")

    const handleFileChange = event => {
        setFile(event.target.files[0])
    }

    const handleUpload = async () => {
        try {
            setUploading(true)
            if (!file) {
                alert("File not provided")
                return
            }

            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { data, error } = await supabase.storage
                .from("images")
                .upload(filePath, file)

            if (error) throw error

            const { data: url } = await supabase.storage
                .from("images")
                .getPublicUrl(filePath)

            console.log(url.publicUrl)

            setFileUrl(url.publicUrl) // Fixed: was "ur.publicUrl"
            alert("File uploaded successfully")
            alert("File uploaded successfully")
        } catch (error) {
            alert("Error uploading files", error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {fileUrl && (
                <div>
                    <p>File Uploaded to: {fileUrl}</p>
                    <img
                        src={fileUrl}
                        alt="uploaded file"
                        style={{ width: "300px", height: "300px" }}
                    />
                </div>
            )}
        </div>
    )
};

export default page;