import { executeQuery as libExecuteQuery } from '@datocms/cda-client';
import type { TadaDocumentNode } from 'gql.tada';

export const cacheTag = 'datocms';

const isProd = process.env.NODE_ENV === 'production';

const cdaToken = isProd ? process.env.DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN! : process.env.DATOCMS_DRAFT_CONTENT_CDA_TOKEN!;

/**
 * Executes a GraphQL query using the DatoCMS Content Delivery API, and caches
 * the result in Next.js Data Cache using the `cache: 'force-cache'` option.
 */
export async function executeQuery<Result, Variables>(
  query: TadaDocumentNode<Result, Variables>,
  options?: ExecuteQueryOptions<Variables>
) {
  const result = await libExecuteQuery(query, {
    variables: options?.variables,
    excludeInvalid: true,
    includeDrafts: !isProd,
    token: cdaToken,
    requestInitOptions: {
      cache: 'force-cache',
      next: {
        tags: [cacheTag],
      },
    },
  });

  return result;
}

type ExecuteQueryOptions<Variables> = {
  variables?: Variables;
};
