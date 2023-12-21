import { gql } from '@apollo/client';
import { ServerAction } from '@faustjs/core';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(input: { title: $title, content: $content }) {
      post {
        id
        title
        content
      }
    }
  }
`;

const EDIT_POST = gql`
  mutation EditPost($id: ID!, $title: String, $content: String) {
    updatePost(input: { id: $id, title: $title, content: $content }) {
      post {
        id
        title
        content
      }
    }
  }
`;

class Posting extends ServerAction {
  async createPost(title, content) {
    const { data } = await this.client.mutate({
      mutation: CREATE_POST,
      variables: { title, content },
    });

    return data.createPost.post;
  }

  async editPost(id, title, content) {
    const { data } = await this.client.mutate({
      mutation: EDIT_POST,
      variables: { id, title, content },
    });

    return data.updatePost.post;
  }
}

export default Posting;
