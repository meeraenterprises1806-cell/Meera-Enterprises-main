import GalleryManager from "@/components/admin/GalleryManager";

export default function AdminProjectsPage() {
  return (
    <GalleryManager
      endpoint="project-images"
      uploadFolder="projects"
      title="Trending"
      description="Manage images shown in the homepage Trending carousel. Lower order numbers appear first."
      formTitle="Trending Image"
      emptyMessage="No trending images yet."
    />
  );
}