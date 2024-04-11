import {
  createApiRef,
  DiscoveryApi,
  FetchApi,
} from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';

export type Release = {
  name: string;
  tag_name: string;
  description: string;
};

type ListReleasesResponse = {
  releases: Release[];
  totalPages: number;
};

export interface ReleaseNotesApi {
  listReleases: (
    projectSlug: string,
    page: number,
  ) => Promise<ListReleasesResponse>;
}

export const releaseNotesApiRef = createApiRef<ReleaseNotesApi>({
  id: 'plugin.release-notes.service',
});

export class ReleaseNotesClient implements ReleaseNotesApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
  }

  async listReleases(
    projectSlug: string,
    page: number,
  ): Promise<ListReleasesResponse> {
    const baseUrl = await this.discoveryApi.getBaseUrl('proxy');
    const response = await this.fetchApi.fetch(
      `${baseUrl}/gitlab/projects/${encodeURIComponent(
        projectSlug,
      )}/releases?per_page=10&page=${page}`,
    );

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return {
      releases: await response.json(),
      totalPages: Number(response.headers.get('x-total-pages')),
    };
  }
}
