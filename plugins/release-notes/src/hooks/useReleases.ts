import { releaseNotesApiRef, Release } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/esm/useAsync';

export function useReleases(
  projectSlug: string,
  page: number,
): {
  releases: Release[];
  totalPages: number;
  loading: boolean;
  error?: Error;
} {
  const releaseNotesApi = useApi(releaseNotesApiRef);

  const { value, error, loading } = useAsync(async () => {
    return releaseNotesApi.listReleases(projectSlug, page);
  }, [releaseNotesApi, page]);

  return {
    releases: value?.releases ?? [],
    totalPages: value?.totalPages ?? 0,
    loading,
    error,
  };
}
