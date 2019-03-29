import { Request, Response } from "express";
import { IProject } from "./IProject";
import * as error from "../error/error";

import * as Projects from "./projects-model";
import * as Actions from '../actions/actions-model';

const projectsRouter = require( 'express' ).Router();

projectsRouter.get( '/', async ( req: Request, res: Response ) => {
    try {
        const projects: IProject[] = await Projects.getProjects();
        if ( projects ) {
            res.status( 200 ).json( projects );
            return;
        }
    } catch ( e ) {
        error.sendError( e, res );
    }
    
} );

projectsRouter.get( '/:id', async ( req: Request, res: Response ) => {
    try {
        let id = req.params.id;
        if ( !id ) {
            error.sendError(
                error.error( 400, "Please include a id with  your" +
                    " request." ), res );
            return;
        }
        let project = await Projects.getProjectById( id );
        
        if ( project ) {
            let actions = await Actions.getActionsForProjectById( id );
            if ( actions ) {
                project.actions = actions;
            }
            res.status( 200 ).json( project );
        }
        
        error.sendError( error.error( 404, "A Project with that id does" +
            " not exist." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

projectsRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        if ( !req.body.description || !req.body.name ) {
            error.sendError(
                error.error( 400, "Please include a description and a " +
                    " project name with your request." ), res );
            return;
        }
        
        const project: IProject = req.body;
        
        let ids = await Projects.addProject( project );
        if ( ids ) {
            let project = await Projects.getProjectById( ids[ 0 ] );
            if ( project ) {
                res.status( 200 ).json( project );
                return;
            }
        }
        error.sendError( error.error( 500, "Something went wrong creating the" +
            " project." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

projectsRouter.put( '/', async ( req: Request, res: Response ) => {
    try {
        if ( !req.body.id ) {
            error.sendError(
                error.error( 400, "Please include a project id with your" +
                    " request." ), res );
            return;
        }
        let id = req.body.id;
        const project: IProject = req.body;
        let result = await Projects.updateProject( id, project );
        if ( result ) {
            let project = await Projects.getProjectById( id );
            if ( project ) {
                res.status( 200 ).json( project );
                return;
            }
        }
        error.sendError( error.error( 500, "Something went wrong updating the" +
            " project." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

projectsRouter.delete( '/:id', async ( req: Request, res: Response ) => {
    try {
        let id = req.params.id;
        
        if ( !id ) {
            error.sendError( error.error( 400, "You must include a project id" +
                " in your request." ), res );
        }
        
        let result = await Projects.deleteProject( id );
        
        if ( result ) {
            res.status( 202 ).json(
                { message: `The project with the id of ${ id } has ben removed.` } );
            return;
        }
        
        error.sendError( error.error( 500, "Something went wrong while trying" +
            " to delete the project." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

module.exports = projectsRouter;
