import { jsonError, logServerError } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { isR2Configured, uploadToR2 } from "@/lib/r2";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

function sanitizeFolder(value: string) {
  const folder = value
    .split("/")
    .map((part) => part.replace(/[^a-zA-Z0-9_-]/g, ""))
    .filter(Boolean)
    .join("/");

  return folder || "uploads";
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = sanitizeFolder((formData.get("folder") as string) || "uploads");

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const isCertificateUpload = folder === "certifications";
    const allowedTypes = isCertificateUpload
      ? [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ]
      : ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: isCertificateUpload ? "Upload a PDF, image, or Office document" : "Only JPEG, PNG, WebP, and GIF images are allowed" }, { status: 400 });
    }

    const maxSize = isCertificateUpload ? 15 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `File must be under ${isCertificateUpload ? 15 : 5}MB` }, { status: 400 });
    }

    if (isR2Configured()) {
      const url = await uploadToR2(file, folder, { allowedTypes, maxSize });
      return NextResponse.json({ url, storage: "r2" });
    }

    if (process.env.NODE_ENV === "production") {
      return jsonError("File storage is not configured.", 503);
    }

    // Fallback: local file storage (development only)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
    const timestamp = Date.now();
    const filename = `${timestamp}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public", "images", folder);
    await mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      url: `/images/${folder}/${filename}`,
      storage: "local",
    });
  } catch (error) {
    logServerError("api.upload.POST", error);
    return jsonError("Upload failed. Please try again.", 500);
  }
}
