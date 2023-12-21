import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ModelCard from '../components/ModelCard/ModelCard';
import SEO from '../components/SEO/SEO';

const GET_MODELS = gql`
  query GetModels {
    models {
      nodes {
        image
        title
        category
        tags
      }
    }
  }
`;

function Models() {
  const { loading, error, data } = useQuery(GET_MODELS);
  const [filter, setFilter] = useState('');

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const filteredModels = data.models.nodes.filter(model => 
    model.category.includes(filter) || model.tags.includes(filter)
  );

  return (
    <>
      <SEO title="Professional Models" description="Browse our professional models" />
      {filteredModels.map(model => (
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

export default Models;
