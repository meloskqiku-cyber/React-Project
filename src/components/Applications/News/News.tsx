import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@api/Api";

interface CommentResponse {
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchNews = async () => {
  const response = await apiRequest<{}, CommentResponse[]>({
    url: "comments",
    method: "GET",
    params: {
      _limit: 10,
    },
  });

  return response.data;
};

export const News = () => {
  const { data: news, isLoading, isError, refetch } = useQuery({
    queryKey: ["news-comments"],
    queryFn: fetchNews,
  });

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 pb-6 overflow-y-auto text-black dark:text-slate-100">
      <h1 className="w-full mb-4 text-4xl font-bold text-left">News</h1>

      {isLoading && (
        <div className="flex items-center justify-center flex-1 text-lg font-semibold">
          Loading news...
        </div>
      )}

      {isError && (
        <div className="p-4 border rounded-lg bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200">
          <p className="mb-3 font-semibold">Could not load news.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm font-bold bg-white rounded-md shadow dark:bg-slate-800"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4">
          {news?.map(item => (
            <article
              key={item.id}
              className="p-4 bg-white rounded-lg shadow dark:bg-slate-800"
            >
              <h2 className="text-lg font-bold capitalize">{item.name}</h2>
              <p className="mb-3 text-sm font-semibold text-blue-700 dark:text-blue-300">
                {item.email}
              </p>
              <p className="leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-200">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
