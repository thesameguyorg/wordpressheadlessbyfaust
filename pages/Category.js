import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ModelCard from '../components/ModelCard/ModelCard';
import SEO from '../components/SEO/SEO';

const GET_MODELS_BY_CATEGORY = gql`
  query GetModelsByCategory($category: String!) {
    models(where: { category: $category }) {
      nodes {
        image
        title
        category
        tags
      }
    }
  }
`;

function Category() {
  const [category, setCategory] = useState('');
  const { loading, error, data } = useQuery(GET_MODELS_BY_CATEGORY, {
    variables: { category },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <SEO title={`Models in ${category} category`} description={`Browse our professional models in ${category} category`} />
      {data.models.nodes.map(model => (
        <ModelCard
          key={model.title}
          image={model.image}
          title={model.title}
          category={model.category}
          tags={model.tags}
        />
      ))}
    </>
  );
}

export default Category;
