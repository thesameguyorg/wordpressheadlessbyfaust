import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

import { initializeApollo } from 'path/to/apolloClient';

export async function getStaticProps(ctx) {
  const client = initializeApollo();

  const { data } = await client.query({
    query: gql`query GetProfessionals {
      professionals {
        nodes {
          id
          title
          content
          ...otherFields
        }
      }
    }`,
  });

  return {
    props: {
      professionals: data.professionals.nodes
    },
    revalidate: 60 // Specify the number of seconds to revalidate
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
