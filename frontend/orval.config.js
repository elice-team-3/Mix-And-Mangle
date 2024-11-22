module.exports = {
  backend: {
    input: {
      target: 'https://qkewybjsseagatzq.tunnel-pt.elice.io/openapi.json',
    },
    output: {
      baseurl: 'https://qkewybjsseagatzq.tunnel-pt.elice.io',
      target: './src/services/api.ts',
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      schemes: './src/services/model',
      override: {
        mutator: {
          path: './src/utils/axios.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
  zod: {
    input: {
      target: 'https://qkewybjsseagatzq.tunnel-pt.elice.io/openapi.json',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/services/api.ts',
      fileExtension: '.zod.ts',
    },
  },
}
