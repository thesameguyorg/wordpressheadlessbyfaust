import { useQuery, gql } from '@apollo/client';
import SEO from '../components/SEO/SEO';

const GET_MODEL = gql`
  query GetModel($id: ID!) {
    model(id: $id) {
      title
      description
      tags
      categories
    }
  }
`;

function Model({ id }) {
  const { loading, error, data } = useQuery(GET_MODEL, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { title, description, tags, categories } = data.model;

  return (
    <>
      <SEO title={title} description={description} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Tags: {tags.join(', ')}</p>
      <p>Categories: {categories.join(', ')}</p>
    </>
  );
}

export default Model;
