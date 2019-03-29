import { database } from '../data/dbConfig';
import { IProject } from "./IProject";


export const getProjects = () => {
    return database('projects');
};

export const getProjectById = (id: number) => {
    return database('projects')
        .where({id}).first();
};

export const addProject = (project: IProject) => {
  return database('projects').insert(project);
};

export const deleteProject = (projectId: number) => {
    return database('projects').where({id: projectId}).delete()
};

export const updateProject = (projectId: number, project: IProject) => {
  return database('projects').where({id: projectId}).update(project);
};