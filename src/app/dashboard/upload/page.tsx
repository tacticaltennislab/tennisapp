import UploadDemo from "@/components/dashboard/UploadDemo";
import VideoUploadForm from "@/components/VideoUploadForm";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";

export default async function UploadPage({ searchParams }: { searchParams: DashboardSearchParams }) {
  const { demo } = await getDashboardContext(searchParams);
  if (demo) return <UploadDemo />;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <p className="text-sm text-muted">
        Send a clip for a coach to review. Each upload uses one analysis, shown before you send it, and it is returned
        if we cannot use the video.
      </p>
      <VideoUploadForm redirectTo="/dashboard/analyses" />
    </div>
  );
}
