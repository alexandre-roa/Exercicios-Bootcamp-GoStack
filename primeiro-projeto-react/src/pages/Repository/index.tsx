import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import logo from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <div>
      <h1>Repository: {params.repository}</h1>
    </div>
  );
};

export default Repository;
