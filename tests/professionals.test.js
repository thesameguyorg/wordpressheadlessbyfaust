import { render, cleanup, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import Page from '../pages/[...wordpressNode]';
import { getServerSideProps } from '../pages/[...wordpressNode]';
import { getStaticProps } from '../pages/[...wordpressNode]';
import { login, logout } from '../server-actions/authentication';
import { createPost } from '../server-actions/posting';

jest.mock('../server-actions/authentication');
jest.mock('../server-actions/posting');

afterEach(cleanup);

const mockProfessional = {
  id: '1',
  title: 'Test Professional',
  content: 'Test Content',
};

const mocks = [
  {
    request: {
      query: gql`query GetProfessionals {
        professionals {
          nodes {
            id
            title
            content
          }
        }
      }`,
    },
    result: {
      data: {
        professionals: {
          nodes: [mockProfessional],
        },
      },
    },
  },
];

describe('Professionals Page', () => {
  it('fetches and displays professional data', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText(mockProfessional.title)).toBeInTheDocument();
      expect(getByText(mockProfessional.content)).toBeInTheDocument();
    });
  });

  it('performs server-side rendering', async () => {
    const context = {};
    const response = await getServerSideProps(context);

    expect(response).toEqual(expect.objectContaining({
      props: expect.any(Object),
    }));
  });

  it('performs login and logout', () => {
    login('test', 'test');
    expect(login).toHaveBeenCalledWith('test', 'test');

    logout();
    expect(logout).toHaveBeenCalled();
  });

  it('submits a post', () => {
    createPost('Test Title', 'Test Content');
    expect(createPost).toHaveBeenCalledWith('Test Title', 'Test Content');
  });

  it('performs incremental static regeneration', async () => {
    const context = {};
    const response = await getStaticProps(context);

    expect(response).toEqual(expect.objectContaining({
      props: expect.any(Object),
      revalidate: 60,
    }));
  });
});
