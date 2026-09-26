import GalleryManager from "@/components/admin/GalleryManager";

export default function AdminInfrastructureGalleryPage() {
  return (
    <GalleryManager
      endpoint="certifications"
      uploadFolder="certifications"
      title="Certifications"
      description="Manage the certificates and compliance documents shown on the infrastructure page."
      formTitle="Certificate"
      emptyMessage="No certifications have been added yet."
      certificateMode
    />
  );
}