import { randomUUID } from 'crypto';
import ProjectModel from '../models/project.model';
import { Request, Response } from 'express';

const projectController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const projects = await ProjectModel.getAll();
      res.status(200).json({ projects });
    } catch (err) {
      console.log('getProject query error: ', err);
      res.status(500).json({ msg: 'Unable to get projects from database' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const project = await ProjectModel.findById(projectId);

      res.status(200).json({ project: project });
    } catch (err) {
      console.log('getProject query error: ', err);
      res.status(500).json({ msg: 'Unable to get projects from database' });
    }
  },

  createProject: async (req: Request, res: Response) => {

    try {
      const { title, description } = req.body;

      const project = ProjectModel.createProject(title, description);

      res.status(201).json({ status: 'Project Created!', project });
    } catch (err) {
      console.log('createProject query error: ', err);
      res.status(500).json({ msg: 'Unable to create project' });
    }
  },

  updateProject: async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const { title, description } = req.body;

      const project = await ProjectModel.updateProject(
        projectId,
        title,
        description
      );

      res.status(200).json({ status: `Project with ID: ${projectId} update!` });
    } catch (err) {
      console.log('updateProject query error: ', err);
      res.status(500).json({ msg: 'Unable to update project' });
    }
  }, deleteProject: async (req: Request, res: Response) => {
    try {
      let { projectId } = req.params;
      await ProjectModel.deleteProject(projectId);
      res
        .status(200)
        .json({ status: `Project with ID: ${projectId} deleted!` });
    } catch (err) {
      console.log('deleteProject query error: ', err);
      res.status(500).json({ msg: 'Unable to delete project' });
    }
  }
};

export default projectController;
