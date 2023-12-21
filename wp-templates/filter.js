import { useQuery, gql } from '@apollo/client';
import ModelCard from '../components/ModelCard';
import * as MENUS from '../constants/menus';

const GET_MODELS = gql`
  query GetModels {
    models {
      nodes {
        id
        title
        picture
        category
        tags
      }
    }
  }
`;

export default function Filter() {
  const { loading, error, data } = useQuery(GET_MODELS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const models = data.models.nodes;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Professional Models</h1>
      <div className="grid grid-cols-3 gap-4">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            picture={model.picture}
            title={model.title}
            category={model.category}
            tags={model.tags}
          />
        ))}
      </div>
    </div>
  );
}
