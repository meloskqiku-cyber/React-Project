import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@api/Api";

interface PhotoResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const fetchPhotos = async () => {
  const response = await apiRequest<{}, PhotoResponse[]>({
    url: "photos",
    method: "GET",
    params: {
      _limit: 12,
    },
  });

  return response.data;
};

export const Gallery = () => {
  const { data: photos, isLoading, isError, refetch } = useQuery({
    queryKey: ["gallery-photos"],
    queryFn: fetchPhotos,
  });

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 pb-6 overflow-y-auto text-black dark:text-slate-100">
      <h1 className="w-full mb-4 text-4xl font-bold text-left">Gallery</h1>

      {isLoading && (
        <div className="flex items-center justify-center flex-1 text-lg font-semibold">
          Loading photos...
        </div>
      )}

      {isError && (
        <div className="p-4 border rounded-lg bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200">
          <p className="mb-3 font-semibold">Could not load gallery.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm font-bold bg-white rounded-md shadow dark:bg-slate-800"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos?.map(photo => (
            <figure
              key={photo.id}
              className="overflow-hidden bg-white rounded-lg shadow dark:bg-slate-800"
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="object-cover w-full h-40 bg-slate-200 dark:bg-slate-700"
                loading="lazy"
              />
              <figcaption className="p-3 text-sm font-semibold capitalize">
                {photo.title}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};
