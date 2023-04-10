import React from 'react';
import ProtectedLayout from '@/components/common/ProtectedLayout';
import ProjectsTable from '@/components/features/projects/ProjectsTable';
const Projects = () => {
  return (
    <ProtectedLayout>
      <ProjectsTable />
    </ProtectedLayout>
  );
};

export default Projects;
